const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Voucher = require("../models/Voucher");
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const router = express.Router();
const path = require('path');

// Rota para criar um voucher
router.post("/create", async (req, res) => {
  const generateVoucherInfo = (length = 12) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let voucher = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      voucher += charset[randomIndex];
    }
    return voucher
  };

  try {
    const { quantity, value } = req.body;
    const auth = new google.auth.GoogleAuth({
      keyFile: 'C:/Users/Lucas/VOUCHER-MOBINC/backend/mobinc-voucher-key.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  
    const client = await auth.getClient();
    const spreadsheetId = "1XscG2P5Va1Xm5ssz2MoydFenVVW-FQScPJJHpLeaxLE";
    const range = "Sheet1!A1"

    let createdVouchers = [];

    for (let i = 0; i < quantity; i++) {
      const voucherNumber = generateVoucherInfo();
      const voucherPassword = generateVoucherInfo(8);

      const voucher = new Voucher({
        number: voucherNumber,
        password: voucherPassword,
        value: value
      });

      await voucher.save();
      createdVouchers.push([voucherNumber, voucherPassword, value, "Não resgatado"]);
    }

    const response = await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId,
      range: range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: createdVouchers
      }
    })

    console.log('Google Sheets response:', response);

    res
      .status(201)
      .json({
        message: `Foram gerador ${quantity} vouchers com sucesso! Confira sua planilha`,
        vouchers: createdVouchers
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para resgatar um voucher
router.post("/redeem", async (req, res) => {
  try {
    const { number, password, nome, banco, chavePix, tipoChavePix } = req.body;
    
    const voucher = await Voucher.findOne({ number });
    if (!voucher)
      return res.status(404).json({ message: "Voucher não encontrado" });
    
    const isMatch = await voucher.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Senha inválida" });
    
    if (voucher.isRedeemed)
      return res.status(400).json({ message: "Voucher já resgatado" });

    if(!chavePix)
      return res.status(400).json({ message: "Chave Pix é obrigatória" });

    if(!banco)
      return res.status(400).json({ message: "Banco é obrigatório" });

    if(!tipoChavePix)
      return res.status(400).json({ message: "Tipo de Chave Pix é obrigatório" });
    
    
    const auth = new google.auth.GoogleAuth({
      keyFile: 'C:/Users/Lucas/VOUCHER-MOBINC/backend/mobinc-voucher-key.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  
    const client = await auth.getClient();
    const spreadsheetId = "1XscG2P5Va1Xm5ssz2MoydFenVVW-FQScPJJHpLeaxLE";
    const range = "Sheet1!A1"

    const sheetData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = readResponse.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Nenhum dado encontrado na planilha" });
    }

    // Encontra a linha correspondente ao voucher
    const voucherRowIndex = rows.findIndex(row => row[0] === number); // Assumindo que o número do voucher está na coluna A
    if (voucherRowIndex === -1) {
      return res.status(404).json({ message: "Voucher não encontrado na planilha" });
    }

    // Define o intervalo da linha a ser atualizada (exemplo: linha 5 -> 'Sheet1!A5:D5')
    const updateRange = `Sheet1!A${voucherRowIndex + 1}:G${voucherRowIndex + 1}`;
    
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: updateRange,
      valueInputOption: 'RAW',
      resource: {
        values: [
          [number, nome, banco, chavePix, tipoChavePix, 'RESGATADO'] // Adiciona os dados e marca como resgatado
        ],
      },
    });

    voucher.isRedeemed = true;
    await voucher.save();

    res.status(200).json({ message: "Suas informações foram salvas com Sucesso! Em breve o valor do Voucher cairá em sua conta informada" });
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
