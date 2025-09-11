const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { id_usuario, id_libro } = req.body;

  if (!id_usuario || !id_libro) {
    console.log('Error: faltan datos en la reserva', { id_usuario, id_libro });
    return res.status(400).json({ message: 'Faltan id_usuario o id_libro' });
  }

  db.query(
    'SELECT COUNT(*) as total FROM reservas WHERE id_usuario = ? AND estado = "activa"',
    [id_usuario],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results[0].total >= 5) {
        return res.status(400).json({ message: 'Máximo 5 reservas activas permitidas' });
      }

      db.query(
        'INSERT INTO reservas (id_usuario, id_libro, fecha_reserva, estado) VALUES (?, ?, CURDATE(), "activa")',
        [id_usuario, id_libro],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          
          db.query('UPDATE libros SET disponibilidad = "reservado" WHERE id_libro = ?', [id_libro]);

          res.status(201).json({ id: result.insertId, id_usuario, id_libro, estado: 'activa' });
        }
      );
    }
  );
});

router.put('/cancelar/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT id_libro FROM reservas WHERE id_reserva = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ message: 'Reserva no encontrada' });

    const id_libro = results[0].id_libro;

    db.query('UPDATE reservas SET estado = "cancelada" WHERE id_reserva = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query('UPDATE libros SET disponibilidad = "disponible" WHERE id_libro = ?', [id_libro]);

      res.json({ message: 'Reserva cancelada y libro liberado' });
    });
  });
});

router.get('/usuario/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;
  db.query(
    `SELECT r.*, l.titulo 
     FROM reservas r 
     JOIN libros l ON r.id_libro = l.id_libro 
     WHERE r.id_usuario = ?`,
    [id_usuario],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

module.exports = router;
