



const mongoose = require('mongoose')

const objetoSchema = new mongoose.Schema({
  comisaria: String,
  tipo: String,
  numero_serie: String,
  marca: String,
  modelo: String,
  color: String,
  numero_motor: String,
  numero_cuadro: String,
  numero_dominio: String,
  caracteristicas: String,
  denunciante: String,
  dni_denunciante: String,
  fiscal: String,
  descripcion: String
})

module.exports = mongoose.model('Objeto', objetoSchema)
