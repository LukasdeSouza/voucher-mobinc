const express = require('express');
const connectDB = require('./src/db')
const voucherRoutes = require('./src/routes/voucherRoutes');
require('dotenv').config();

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware para analisar JSON
app.use(express.json());

// Rotas
app.use('/api/vouchers', voucherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
