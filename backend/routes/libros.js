const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
  db.query('SELECT * FROM libros ORDER BY id_libro DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


router.get('/buscar/:termino', (req, res) => {
  const termino = `%${req.params.termino}%`;
  db.query(
    'SELECT * FROM libros WHERE titulo LIKE ? OR autor LIKE ?',
    [termino, termino],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM libros WHERE id_libro = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results[0]) return res.status(404).json({ message: 'No encontrado' });
    res.json(results[0]);
  });
});


router.post('/', (req, res) => {
  const { titulo, autor, editorial, disponibilidad } = req.body;
  const d = disponibilidad || 'disponible';
  db.query(
    'INSERT INTO libros (titulo, autor, editorial, disponibilidad) VALUES (?, ?, ?, ?)',
    [titulo, autor, editorial, d],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, titulo, autor, editorial, disponibilidad: d });
    }
  );
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor, editorial, disponibilidad } = req.body;
  db.query(
    'UPDATE libros SET titulo = ?, autor = ?, editorial = ?, disponibilidad = ? WHERE id_libro = ?',
    [titulo, autor, editorial, disponibilidad, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Actualizado' });
    }
  );
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM libros WHERE id_libro = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Eliminado' });
  });
});

module.exports = router;
