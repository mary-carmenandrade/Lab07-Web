const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pelis = require('./models/Pelis');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/peliculas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB está conectado correctamente!');
}).catch((error) => {
  console.error('MongoDB error en la conexión:', error);
});

app.get('/peliculas', async (req, res) => {
  try {
    const peliculas = await Pelis.find();
    res.render('lista', { peliculas });
  } catch (error) {
    console.error('Error al obtener películas:', error);
    res.status(500).send('Error al obtener películas');
  }
});

app.get('/', (req, res) => {
  res.render('formulario');
});

app.post('/guardar-pelicula', async (req, res) => {
  const { titulo, genero, año, director } = req.body;
  const nuevaPelicula = new Pelis({ titulo, genero, año, director });
  
  try {
    await nuevaPelicula.save();
    res.redirect('/peliculas');
  } catch (error) {
    console.error('Error al guardar película:', error);
    res.status(500).send('Error al guardar película');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
