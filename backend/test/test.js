const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('GET /files/data', () => {
  it('[1] DATOS VALIDOS: Debe retornar una lista de archivos con data válida', (done) => {
    chai.request(server)
      .get('/files/data')
      .end((err, res) => {
        // Verifica que la respuesta tenga el estado 200 OK
        res.should.have.status(200)
        // Verifica que el cuerpo de la respuesta sea un array
        res.body.should.be.an('array')
        // Verifica cada objeto en el array
        res.body.forEach(file => {
          file.should.have.property('file')
          file.should.have.property('lines').which.is.an('array')
          file.lines.forEach(line => {
            line.should.have.property('text')
            line.should.have.property('number')
            line.should.have.property('hex')
          })
        })
        done()
      })
  })

  it('[2] CASOS DE ERROR: Debe manejar casos de errores correctamente', (done) => {
    chai.request(server)
      .get('/files/data')
      .end((err, res) => {
        res.should.have.status(200)
        // Verifica que haya al menos un archivo con errores
        const filesWithErrors = res.body.filter(file => file.errors)
        filesWithErrors.should.be.an('array')
        filesWithErrors.length.should.be.greaterThan(0)
        done()
      })
  })
})
