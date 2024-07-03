const express = require('express');
const dataService = require('./service/dataService');

const app = express();
const port = 3000;

// Rutas -> En este caso solamente tendremos una ruta por lo que no es necesario crear un archivo aparte de rutas
// Pero si el proyecto crece es recomendable tener un archivo de rutas para mayor organización
// Un esquema básico de backend seria: server.js (El main file), service/ y routes/
app.get('/files/data', async (req, res) => {
  try {
    const validFileData = await dataService.fetchValidFileData();
    res.status(200).json(validFileData);
  } catch (error) {
    console.error('Error al obtener los archivos:', error.message);
    // En caso de error, devuelve un 500 con un mensaje genérico
    if(error.message === 'Request failed with status code 404'){
      return res.status(404).json({ error: 'No se encontraron datos de archivos válidos' });
    }
    res.status(500).json({ error: 'Error al obtener los archivos' });
  }
});

app.listen(port, () => {
  console.log(`Server-Backend challengue Toolbox corriendo en http://localhost:${port}`);
});

module.exports = app;
