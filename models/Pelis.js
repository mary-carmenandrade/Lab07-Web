const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  genero: String,
  titulo: String,
  año: String,
  director: String
});

const Pelis = mongoose.model('Pelis', peliculaSchema);

module.exports = Pelis;
