const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

//Creando una reserva

router.post('/', reservasController.crearReserva);

// Obtener todas las reserevas

router.get('/', reservasController.obtenerReservas);

// Obtener una reserva por ID

router.get('/:id', reservasController.obtenerReservaPorId);

// Actualizar reserva por ID

router.put('/:id', reservasController.actualizarReserva);

// Eliminar reserva

router.delete('/:id', reservasController.eliminarReserva);

// Exporta el enrutador

module.exports = router;


