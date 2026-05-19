const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.post('/', (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const stmt = db.prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)');
    const result = stmt.run(name, email, phone || null, message);
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  });

  router.get('/', (req, res) => {
    const items = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.json(items);
  });

  return router;
};
