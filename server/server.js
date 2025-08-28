require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // public klasörü

// MySQL bağlantısı
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error("MySQL bağlantı hatası:", err);
    return;
  }
  console.log("MySQL bağlantısı başarılı!");
});

// Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Siparişleri listele
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Sipariş ekle
app.post("/orders", (req, res) => {
  const { firma, urun_kodu, telefon, fiyat, odeme } = req.body;
  const sql = "INSERT INTO orders (firma, urun_kodu, telefon, fiyat, odeme, tarih) VALUES (?, ?, ?, ?, ?, NOW())";
  db.query(sql, [firma, urun_kodu, telefon, fiyat, odeme], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, message: "Sipariş eklendi" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu çalışıyor: http://localhost:${PORT}`));
