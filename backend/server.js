const express = require('express')
const dataService = require('./service/dataService')

const app = express()
const port = 3000

// Endpoint para obtener la lista de archivos
app.get('/files/list', async (req, res) => {
  try {
    const fileList = await dataService.fetchFileList()
    res.status(200).json(fileList)
  } catch (error) {
    console.error('Error al obtener la lista de archivos:', error.message)
    res.status(500).json({ error: 'Error al obtener la lista de archivos' })
  }
})

// Endpoint para obtener los datos de los archivos
app.get('/files/data', async (req, res) => {
  try {
    // Verificar si se proporciona el parámetro fileName en la consulta
    const fileName = req.query.fileName
    let validFileData

    if (fileName) {
      // Si fileName está presente, filtrar los datos del archivo específico
      validFileData = await dataService.fetchValidFileData(fileName)
    } else {
      // Si fileName no está presente, obtener todos los datos de los archivos
      validFileData = await dataService.fetchValidFileData()
    }

    res.status(200).json(validFileData)
  } catch (error) {
    console.error('Error al obtener los archivos:', error.message)
    // Manejo de errores
    res.status(500).json({ error: 'Error al obtener los archivos' })
  }
})

app.listen(port, () => {
  console.log(`Servidor Backend Toolbox corriendo en http://localhost:${port}`)
})

module.exports = app
