const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

// Ruta para crear una nueva reserva

router.post('/', reservasController.crearReserva);

// ruta para obtener todas las reserevas con filtros

router.get('/', reservasController.obtenerReservas);

// Ruta para obtener una reserva por ID

router.get('/:id', reservasController.obtenerReservaPorId);

// Ruta para actualizar reserva por ID

router.put('/:id', reservasController.actualizarReserva);

// Ruta para eliminar reserva por ID

router.delete('/:id', reservasController.eliminarReserva);

// Exporta el enrutador

module.exports = router;


