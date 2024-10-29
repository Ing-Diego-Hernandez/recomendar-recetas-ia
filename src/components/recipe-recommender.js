import React, { useState } from 'react';

// Función para obtener recomendaciones de recetas usando IA (OpenAI)
const getRecipeRecommendations = async (ingredients) => {
  try {
    const response = await fetch('http://localhost:5000/api/generate-recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener las recetas de la IA');
    }

    const data = await response.json();
    const textResponse = data.recipeText;
    
    const recipes = textResponse.split("\n\n").reduce((acc, line) => {
      if (line.startsWith("**")) {
        // Si el título de la receta empieza con "**", añadimos un nuevo objeto de receta
        acc.push({ name: line.replace("**", "").trim(), ingredients: [], preparation: [] });
      } else if (line.startsWith("*")) {
        // Si es una lista de ingredientes, la asignamos al último objeto receta
        acc[acc.length - 1].ingredients.push(line.replace("*", "").trim());
      } else if (line.startsWith("1.")) {
        // Si es una lista de pasos de preparación, la asignamos al último objeto receta
        acc[acc.length - 1].preparation.push(line.trim());
      }
      return acc;
    }, []);

    return recipes;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error al obtener las recetas');
  }
};


function RecipeRecommender() {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddIngredient = () => {
    if (currentIngredient && !ingredients.includes(currentIngredient)) {
      setIngredients([...ingredients, currentIngredient]);
      setCurrentIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      const recommendations = await getRecipeRecommendations(ingredients);
      setRecipes(recommendations);
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Recomendador de Recetas con IA</h2>
          <p className="text-gray-600 mb-4">Ingresa los ingredientes que tienes y obtén recomendaciones de recetas.</p>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa un ingrediente"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddIngredient()}
            />
            <button
              onClick={handleAddIngredient}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Agregar
            </button>
          </div>
          <div className="mb-4 h-20 overflow-y-auto border rounded-md p-2">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {ingredient}
                <button onClick={() => handleRemoveIngredient(ingredient)} className="ml-2 text-xs text-gray-500 hover:text-gray-700">×</button>
              </span>
            ))}
          </div>
          <button
            onClick={handleGetRecommendations}
            disabled={ingredients.length === 0 || isLoading}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Obteniendo recomendaciones..." : "Obtener Recomendaciones"}
          </button>
        </div>
        <div className="border-t p-6">
          <h3 className="text-lg font-semibold mb-2">Recetas Recomendadas:</h3>
          <div className="h-64 overflow-y-auto">
            {recipes.map((recipe, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md">
                <h4 className="font-semibold">{recipe.name}</h4>
                <p className="text-sm text-gray-600">{recipe.ingredients}</p>
                <p className="text-sm text-gray-600">{recipe.preparation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeRecommender;