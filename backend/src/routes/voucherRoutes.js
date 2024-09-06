const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Voucher = require("../models/Voucher");
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const router = express.Router();
const path = require('path');

// Rota para criar um voucher
router.post("/create", async (req, res) => {
  try {
    const { number, password, value } = req.body;

    const voucher = new Voucher({ number, password, value });
    await voucher.save();

    res
      .status(201)
      .json({
        message: `Voucher: "${voucher.number}" de valor: "R$${voucher.value}" gerado com sucesso`,
        voucherNumber: voucher.number,
        value: voucher.value,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para resgatar um voucher
router.post("/redeem", async (req, res) => {
  try {
    const { number, password, nome, banco, chavePix } = req.body;
    
    const voucher = await Voucher.findOne({ number });
    if (!voucher)
      return res.status(404).json({ message: "Voucher não encontrado" });
    
    const isMatch = await voucher.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Senha inválida" });
    
    if (voucher.isRedeemed)
      return res.status(400).json({ message: "Voucher já resgatado" });
    
    const auth = new google.auth.GoogleAuth({
      keyFile: 'C:/Users/Lucas/VOUCHER-MOBINC/backend/mobinc-voucher-key.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  
    const client = await auth.getClient();
    const spreadsheetId = "1XscG2P5Va1Xm5ssz2MoydFenVVW-FQScPJJHpLeaxLE";
    const range = "Sheet1!A1"

    const response = await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId,
      range: range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [
          [nome, voucher.number, voucher.value, banco, chavePix]
        ]
      }
    })

    console.log('response', response)

    voucher.isRedeemed = true;
    await voucher.save();

    res.status(200).json({ message: "Voucher resgatado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getAll", async (req, res) => {
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


module.exports = router;
