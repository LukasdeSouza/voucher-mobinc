const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db");
const Voucher = require("./src/models/Voucher");
const User = require("./src/models/User");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const sheets = google.sheets("v4");
// const voucherRoutes = require("./src/routes/voucherRoutes");
// const authRoutes = require("./src/routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());
connectDB();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// app.use("/vouchers", voucherRoutes);
// app.use("/auth", authRoutes);

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já está em uso" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ou senha incorretos" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email ou senha incorretos" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/create", async (req, res) => {
  const generateVoucherInfo = (length = 12) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let voucher = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      voucher += charset[randomIndex];
    }
    return voucher;
  };

  try {
    const { quantity, value } = req.body;
    const auth = new google.auth.GoogleAuth({
      keyFile: "mobinc-voucher-key.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1XscG2P5Va1Xm5ssz2MoydFenVVW-FQScPJJHpLeaxLE";
    const range = "Sheet1!A1";

    let createdVouchers = [];

    for (let i = 0; i < quantity; i++) {
      const voucherNumber = generateVoucherInfo();
      const voucherPassword = generateVoucherInfo(8);

      const voucher = new Voucher({
        number: voucherNumber,
        password: voucherPassword,
        value: value,
      });

      await voucher.save();
      createdVouchers.push([
        voucherNumber,
        voucherPassword,
        value,
        "NÃO RESGATADO",
      ]);
    }

    const response = await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId,
      range: range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: createdVouchers,
      },
    });

    console.log("Google Sheets response:", response);

    res.status(201).json({
      message: `Foram gerados ${quantity} vouchers com sucesso! Confira sua planilha`,
      vouchers: createdVouchers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para resgatar um voucher
app.post("/redeem", async (req, res) => {
  try {
    const { number, password, nome, banco, chavePix, tipoChavePix } = req.body;

    const voucher = await Voucher.findOne({ number });
    if (!voucher)
      return res.status(404).json({ message: "Voucher não encontrado" });

    const isMatch = await voucher.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Senha inválida" });

    if (voucher.isRedeemed)
      return res.status(400).json({ message: "Voucher já resgatado" });

    if (!chavePix)
      return res.status(400).json({ message: "Chave Pix é obrigatória" });

    if (!banco) return res.status(400).json({ message: "Banco é obrigatório" });

    if (!tipoChavePix)
      return res
        .status(400)
        .json({ message: "Tipo de Chave Pix é obrigatório" });

    const auth = new google.auth.GoogleAuth({
      keyFile: "mobinc-voucher-key.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const spreadsheetId = "1XscG2P5Va1Xm5ssz2MoydFenVVW-FQScPJJHpLeaxLE";
    const readRange = "Sheet1!A1:J";

    const readResponse = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range: readRange,
    });

    const rows = readResponse.data.values;
    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum dado encontrado na planilha" });
    }

    // Encontra a linha correspondente ao voucher
    const voucherRowIndex = rows.findIndex((row) => row[0] === number); // Assumindo que o número do voucher está na coluna A
    if (voucherRowIndex === -1) {
      return res
        .status(404)
        .json({ message: "Voucher não encontrado na planilha" });
    }

    const currentRowData = rows[voucherRowIndex];
    console.log(currentRowData);

    // Concatena os novos valores às colunas existentes
    const updatedRowData = [
      "RESGATADO", // Status de resgate
      nome, // Nova coluna
      banco, // Nova coluna
      chavePix, // Nova coluna
      tipoChavePix, // Nova coluna
    ];

    // Define o intervalo da linha a ser atualizada (exemplo: linha 5 -> 'Sheet1!A5:D5')
    const updateRange = `Sheet1!D${voucherRowIndex + 1}:J${
      voucherRowIndex + 1
    }`;

    await sheets.spreadsheets.values.update({
      auth: client,
      spreadsheetId,
      range: updateRange,
      valueInputOption: "RAW",
      resource: {
        values: [updatedRowData],
      },
    });

    voucher.isRedeemed = true;
    await voucher.save();

    res.status(200).json({
      message:
        "Suas informações foram salvas com Sucesso! Em breve o valor do Voucher cairá em sua conta informada",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/getAll", async (req, res) => {
  try {
    const vouchers = await Voucher.find();

    if (!vouchers || vouchers.length === 0) {
      return res.status(404).json({ message: "Nenhum voucher encontrado" });
    }

    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.use("/", (req, res) => {
//   res.send("API MOBCASH IS RUNNING");
// })

// const PORT = process.env.PORT || 5000;
// app.listen(() => console.log(`Server running on port ${process.env.PORT}`));
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
