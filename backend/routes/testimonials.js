const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const items = db.prepare('SELECT * FROM testimonials ORDER BY id').all();
    res.json(items);
  });

  return router;
};
