const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { id_usuario, id_libro } = req.body;
  console.log("Datos recibidos en préstamo:", req.body);

  if (!id_usuario || !id_libro) {
    return res.status(400).json({ message: 'Faltan id_usuario o id_libro' });
  }

  db.query(
    'INSERT INTO prestamos (id_usuario, id_libro, fecha_prestamo, estado) VALUES (?, ?, CURDATE(), "activo")',
    [id_usuario, id_libro],
    (err, result) => {
      if (err) {
        console.error("Error en INSERT prestamos:", err);
        return res.status(500).json({ error: err.message });
      }

      db.query('UPDATE libros SET disponibilidad = "prestado" WHERE id_libro = ?', [id_libro]);

      res.status(201).json({ id: result.insertId, id_usuario, id_libro, estado: 'activo' });
    }
  );
});


router.put('/devolver/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT id_libro FROM prestamos WHERE id_prestamo = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ message: 'Préstamo no encontrado' });

    const id_libro = results[0].id_libro;

    db.query(
      'UPDATE prestamos SET estado = "devuelto", fecha_devolucion = CURDATE() WHERE id_prestamo = ?',
      [id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query('UPDATE libros SET disponibilidad = "disponible" WHERE id_libro = ?', [id_libro]);

        res.json({ message: 'Préstamo devuelto y libro liberado' });
      }
    );
  });
});

router.get('/usuario/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;
  db.query(
    `SELECT p.*, l.titulo 
     FROM prestamos p 
     JOIN libros l ON p.id_libro = l.id_libro 
     WHERE p.id_usuario = ?`,
    [id_usuario],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

module.exports = router;
