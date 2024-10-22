const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000; // El puerto en el que se ejecutará tu servidor

app.use(cors());
app.use(express.json());

app.post('/api/generate-recipes', async (req, res) => {
  const ingredients = req.body.ingredients;
  const apiKey = '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'; // Reemplaza con tu API Key de OpenAI

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Genera tres recetas utilizando los siguientes ingredientes: ${ingredients.join(', ')}.`,
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener las recetas:', error);
    res.status(500).json({ error: 'Error al obtener las recetas' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
