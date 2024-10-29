const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000; // El puerto en el que se ejecutará tu servidor

app.use(cors());
app.use(express.json());


app.post('/api/generate-recipes', async (req, res) => {
  const ingredients = req.body.ingredients;

  try {
    
    const genAI = new GoogleGenerativeAI("AIzaSyAEdkD6T4HWnfhJ71uxvDXO8vT8pmi3tEk");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Genera tres recetas utilizando los siguientes ingredientes: ${ingredients.join(', ')}.`;

    /*const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.json(result.response.text());*/
    const result = await model.generateContent(prompt);
    const textResponse = await result.response.text();
    console.log("Respuesta del modelo:", textResponse); // Debugging
    res.json({ recipeText: textResponse });


  } catch (error) {
    console.error('Error al obtener las recetas:', error);
    res.status(500).json({ error: 'Error al obtener las recetas' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
