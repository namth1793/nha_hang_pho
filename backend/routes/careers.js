const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const items = db.prepare('SELECT * FROM careers WHERE is_open = 1 ORDER BY id').all();
    const parsed = items.map(item => ({
      ...item,
      requirements: JSON.parse(item.requirements || '[]'),
    }));
    res.json(parsed);
  });

  router.post('/apply', (req, res) => {
    const { career_id, name, email, phone, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
    const stmt = db.prepare(
      'INSERT INTO career_applications (career_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(career_id || null, name, email, phone || null, message || null);
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  });

  return router;
};
