const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sipariş ekleme
app.post('/orders', (req, res) => {
  const { siparis_no, firma, urun_kodu, telefon, odeme_alindi, odeme_alinmadi } = req.body;
  const query = `INSERT INTO siparisler (siparis_no, firma, urun_kodu, telefon, odeme_alindi, odeme_alinmadi) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [siparis_no, firma, urun_kodu, telefon, odeme_alindi, odeme_alinmadi], (err, result) => {
    if(err) return res.status(500).send(err);
    res.send({success:true, id: result.insertId});
  });
});

// Siparişleri listeleme
app.get('/orders', (req, res) => {
  db.query('SELECT * FROM siparisler ORDER BY id DESC', (err, results) => {
    if(err) return res.status(500).send(err);
    res.send(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
