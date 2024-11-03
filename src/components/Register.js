import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from '../firebaseConfig'; // Asegúrate de que esto apunte a tu configuración de Firebase
import { signOut } from 'firebase/auth'; // Importa la función signOut
import './recipe-recommender.css'; // Importa el CSS mejorado

const getRecipeRecommendations = async (ingredients) => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyAEdkD6T4HWnfhJ71uxvDXO8vT8pmi3tEk");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Genera tres recetas utilizando los siguientes ingredientes: ${ingredients.join(', ')}.`;
    
    // Generar contenido usando el modelo
    const result = await model.generateContent(prompt);
    const textResponse = await result.response.text();

    console.log("Respuesta del modelo:", textResponse); // Debugging

    // Procesar la respuesta para obtener las recetas
    const recipes = textResponse.split("\n\n").reduce((acc, line) => {
      if (line.startsWith("**")) {
        acc.push({ name: line.replace(/\*\*/g, "").trim(), ingredients: [], preparation: [] });
      }else if (line.startsWith("*")) {
        acc[acc.length - 1].ingredients.push(line.replace("*", "").trim());
      } else if (line.startsWith("1.")) {
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

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra sesión
      // Puedes redirigir al usuario a la página de inicio de sesión aquí, si lo deseas
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      {/* Botón para cerrar sesión */}
  

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
                <span key={index} className="ingredient-tag">
                  {ingredient}
                  <button onClick={() => handleRemoveIngredient(ingredient)} className="remove-button">×</button>
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
          <div className="recipe-list">
            {recipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <h4>{recipe.name}</h4>
                  <p className="ingredients">{recipe.ingredients.join(", ")}</p>
                  <p className="preparation">{recipe.preparation.join(" ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
      onClick={handleLogout}
      className="mb-4 px-2 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      Cerrar sesión
    </button>
        </div>
  );
}

export default RecipeRecommender;
