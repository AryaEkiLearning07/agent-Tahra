const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke MySQL XAMPP
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tahra_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database (tahra_db)');
  }
});

// Endpoint Ambil Semua Kampanye
app.get('/api/campaigns', (req, res) => {
  db.query('SELECT * FROM campaigns ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Endpoint Tambah Kampanye Baru
app.post('/api/campaigns', (req, res) => {
  const { product_name, platform, target_audience, budget } = req.body;
  const sql = 'INSERT INTO campaigns (product_name, platform, target_audience, budget, status, roas) VALUES (?, ?, ?, ?, "Completed", "210%")';

  db.query(sql, [product_name, platform, target_audience, budget], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body, status: 'Completed', roas: '210%' });
  });
});

app.listen(5000, () => {
  console.log('Server Express berjalan di http://localhost:5000');
});
