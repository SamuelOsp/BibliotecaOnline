const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
  db.query('SELECT id_usuario, nombre, tipo_usuario FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const { nombre, contrasena, tipo_usuario } = req.body;
  db.query(
    'INSERT INTO usuarios (nombre, contrasena, tipo_usuario) VALUES (?, ?, ?)',
    [nombre, contrasena, tipo_usuario || 'lector'],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, nombre, tipo_usuario });
    }
  );
});


router.post('/login', (req, res) => {
  const { nombre, contrasena } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?',
    [nombre, contrasena],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!results[0]) return res.status(401).json({ message: 'Credenciales incorrectas' });
      res.json({ message: 'Login exitoso', usuario: results[0] });
    }
  );
});

module.exports = router;
