const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const usuariosRoutes = require('./routes/usuarios');
const librosRoutes = require('./routes/libros');
const prestamosRoutes = require('./routes/prestamos');
const reservasRoutes = require('./routes/reservas');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/reservas', reservasRoutes);

app.listen(3000, () => {
  console.log('Servidor backend en http://localhost:3000');
});
