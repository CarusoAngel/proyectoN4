const express = require('express');
const dotenv = require('dotenv');
const reservasRoutes = require('./routes/reservasRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta para la raíz del proyecto

app.get('/', (req, res) => {
  res.send('Bienvenido a mi API de Reserva de Hotel');
});

app.use('/api/reservas', reservasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
