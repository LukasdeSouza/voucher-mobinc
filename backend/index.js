const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db");
const voucherRoutes = require("./src/routes/voucherRoutes");
const authRoutes = require("./src/routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/vouchers", voucherRoutes);
app.use("/api/auth", authRoutes);

app.use("/", (req, res) => {
  res.send("API MOBCASH IS RUNNING");
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
