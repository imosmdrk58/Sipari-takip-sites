```
CREATE DATABASE siparis_sistemi;

USE siparis_sistemi;

CREATE TABLE siparisler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    siparis_no VARCHAR(10),
    firma VARCHAR(255),
    urun_kodu VARCHAR(50),
    telefon VARCHAR(20),
    odeme_alindi DECIMAL(10,2) DEFAULT 0,
    odeme_alinmadi DECIMAL(10,2) DEFAULT 0,
    tarih DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
ex
