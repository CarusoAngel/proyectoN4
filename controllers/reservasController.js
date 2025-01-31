// dependencias 

const fs = require('fs');
const path = require('path');
const { v4:uuidv4} = require('uuid');

// ubicacion archivo json

const dataPath = path.join(__dirname, '../data/reservas.json');

// lectura archivo json

const leerReservas = () => {
    try { 
        const data = fs.readFileSync(dataPath,'utf-8');
        return JSON.parse(data);
    } catch (error) { 
        return [];
    }
};

// datos del archivo JSON

const escribirReservas = (reservas) => { 
    fs.writeFileSync(dataPath, JSON.stringify(reservas, null, 2));
};

// nueva reserva

exports.crearReserva = (req, res) => {
    const reservas = leerReservas();
    const nuevaReserva = {
        id: uuidv4(),
        ...req.body
    };
    reservas.push(nuevaReserva);
    escribirReservas(reservas);
    res.status(201).json(nuevaReserva);
};

// obtener reservas incluyendo filtro en la busqueda

exports.obtenerReservas = (req, res) => {
    const reservas = leerReservas();
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, estado, num_huespedes } = req.query;
    let resultado = reservas;

    if (hotel) resultado = resultado.filter(r => r.hotel === hotel);
    if (fecha_inicio && fecha_fin) {
        resultado = resultado.filter(
            r => new Date(r.fecha) >= new Date(fecha_inicio) && new Date(r.fecha) <= new Date(fecha_fin)
        );
    }
    if (tipo_habitacion) resultado = resultado.filter(r => r.tipo_habitacion === tipo_habitacion);
    if (estado) resultado = resultado.filter(r => r.estado === estado);
    if (num_huespedes) resultado = resultado.filter(r => r.num_huespedes == num_huespedes);

    res.json(resultado);
};

// Reserva por ID

exports.obtenerReservaPorId = (req, res) => {
    const reservas = leerReservas();
    const reserva = reservas.find(r => r.id === req.params.id);
    if (!reserva) return res.status(404).send('Reserva no encontrada');
    res.json(reserva);
};

// Actualizar reserva por ID

exports.actualizarReserva = (req, res) => {
    const reservas = leerReservas();
    const index = reservas.findIndex(r => r.id === req.params.id);
    if (index === -1) return res.status(404).send('Reserva no encontrada');
    reservas[index] = {...reservas[index], ...req.body};
    escribirReservas(reservas);
    res.json(reservas[index]);
};

// Eliminar reserva por ID

exports.eliminarReserva = (req, res) => {
    const reservas = leerReservas();
    const index = reservas.findIndex(r=> r.id === req.params.id);
    if (index === -1) return res.status(404).send('Reserva no econtrada');
    const [eliminada] = reservas.splice(index,1);
    escribirReservas(reservas);
    res.status(200).json({ mensaje: 'Reserva eliminada', eliminada});
};