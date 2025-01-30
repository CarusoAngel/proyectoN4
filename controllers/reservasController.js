// almacenar datos

let reservas = [];

// nueva reserva
exports.crearReserva = (req, res) => {
    const nuevaReserva = {
        id: reservas.length + 1,
        ...req.body
    }
    reservas.push(nuevaReserva);
    res.status(201).json(nuevaReserva);
};

// obtener reservas incluyendo filtro en la busqueda

exports.obtenerReservas = (req, res) => {
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
}

// Reserva por ID

exports.obtenerReservaPorId = (req, res) => {
    const reserva = reservas.find(r => r.id === parseInt(req.params.id));
    if (!reserva) return res.status(404).send('Reserva no encontrada');
    res.json(reserva);
}

// Actualizar reserva por ID

exports.actualizarReserva = (req, res) => {
    const reserva = reservas.find(r => r.id === parseInt(req.params.id));
    if (!reserva) return res.status(404).send('Reserva no encontrada');
    Object.assign(reserva, req.body);
    res.json(reserva);
}

// Eliminar reserva por ID

exports.eliminarReserva = (req, res) => {
    const index = reservas.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Reserva no econtrada');
    reservas.splice(index,1);
    res.status(204).send();
}