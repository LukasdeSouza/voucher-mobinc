const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Voucher = require('../models/Voucher');
const router = express.Router();

// Rota para criar um voucher
router.post('/create', async (req, res) => {
  try {
    const number = uuidv4().replace(/-/g, '').slice(0, 12);
    const { password } = req.body;

    const voucher = new Voucher({ number, password });
    await voucher.save();

    res.status(201).json({ message: 'Voucher created', voucherNumber: voucher.number });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para resgatar um voucher
router.post('/redeem', async (req, res) => {
    try {
      const { number, password, personalData } = req.body;
  
      const voucher = await Voucher.findOne({ number });
      if (!voucher) return res.status(404).json({ message: 'Voucher not found' });
  
      const isMatch = await voucher.matchPassword(password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid password' });
  
      if (voucher.isRedeemed) return res.status(400).json({ message: 'Voucher already redeemed' });
  
      // Aqui você pode processar os dados pessoais (personalData) e realizar o pagamento
  
      voucher.isRedeemed = true;
      await voucher.save();
  
      res.status(200).json({ message: 'Voucher redeemed successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
