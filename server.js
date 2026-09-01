const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Production Connection Pool with Keep-Alive & Error Recovery
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tahra_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Auto-initialize MySQL Table Schema on startup
async function initSchema() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        platform VARCHAR(100) DEFAULT 'TikTok',
        target_audience TEXT,
        budget INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'Completed',
        roas VARCHAR(50) DEFAULT '210%',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    connection.release();
    console.log('✅ Connected to MySQL Database (tahra_db) - Schema verified.');
  } catch (err) {
    console.warn('⚠️ MySQL connection warning (XAMPP may be offline):', err.message);
  }
}
initSchema();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TAHRA Express Gateway', port: PORT });
});

// GET: All campaigns
app.get('/api/campaigns', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM campaigns ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('MySQL query error:', err.message);
    res.status(500).json({ error: 'Database query failed', message: err.message });
  }
});

// POST: Add new campaign
app.post('/api/campaigns', async (req, res) => {
  const { product_name, platform, target_audience, budget } = req.body;
  if (!product_name) {
    return res.status(400).json({ error: 'product_name is required' });
  }

  const sql = `
    INSERT INTO campaigns (product_name, platform, target_audience, budget, status, roas)
    VALUES (?, ?, ?, ?, 'Completed', '210%')
  `;

  try {
    const [result] = await pool.query(sql, [
      product_name,
      platform || 'TikTok',
      target_audience || 'Target audiens UMKM',
      Number(budget) || 100000,
    ]);
    res.status(201).json({
      id: result.insertId,
      product_name,
      platform: platform || 'TikTok',
      target_audience: target_audience || 'Target audiens UMKM',
      budget: Number(budget) || 100000,
      status: 'Completed',
      roas: '210%',
    });
  } catch (err) {
    console.error('MySQL insert error:', err.message);
    res.status(500).json({ error: 'Database insert failed', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server Express running at http://localhost:${PORT}`);
});
