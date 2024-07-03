const axios = require('axios')
const csv = require('csv-parser')

const API_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const API_KEY = 'aSuperSecretKey'

async function fetchFileList () {
  try {
    const response = await axios.get(`${API_URL}/files`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    })
    return response.data.files
  } catch (error) {
    console.error('Error al obtener la lista de archivos:', error.message)
    throw error
  }
}

async function fetchValidFileData (fileName) {
  let filesToFetch = []

  if (fileName) {
    filesToFetch.push(fileName)
  } else {
    const filesResponse = await axios.get(`${API_URL}/files`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    })
    filesToFetch = filesResponse.data.files
  }

  const fileDataPromises = filesToFetch.map(async (file) => {
    try {
      const fileResponse = await axios.get(`${API_URL}/file/${file}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        responseType: 'stream'
      })

      return new Promise((resolve, reject) => {
        const fileData = []
        fileResponse.data
          .pipe(csv())
          .on('data', (row) => {
            if (row.file && row.text && row.number && row.hex) {
              let hexValue = row.hex

              // Verificar y unificar el hex si contiene el mensaje de conexión
              if (hexValue.includes('Connection #0 to host localhost left intact')) {
                hexValue = 'UnifiedConnectionErrorMessage'
              }

              fileData.push({
                text: row.text,
                number: parseInt(row.number),
                hex: hexValue
              })
            }
          })
          .on('end', () => {
            resolve({
              file,
              lines: fileData
            })
          })
          .on('error', reject)
      })
    } catch (error) {
      console.error(`Error al descargar el archivo ${file}:`, error.message)
      return {
        file,
        errors: true,
        lines: []
      }
    }
  })

  const fileData = await Promise.all(fileDataPromises)
  return fileData.filter((data) => data !== null)
}

module.exports = {
  fetchFileList,
  fetchValidFileData
}
