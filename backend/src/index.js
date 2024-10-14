const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const voucherRoutes = require("./routes/voucherRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(cors());

// Conectar ao banco de dados
connectDB();

// Middleware para analisar JSON
app.use(express.json());

app.use("/", (req, res) => {
  res.send("API is running...");
})

// Rotas
app.use("/api/vouchers", voucherRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
