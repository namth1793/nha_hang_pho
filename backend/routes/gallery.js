const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const { category } = req.query;
    let items;
    if (category && category !== 'all') {
      items = db.prepare('SELECT * FROM gallery_items WHERE category = ? ORDER BY id').all(category);
    } else {
      items = db.prepare('SELECT * FROM gallery_items ORDER BY id').all();
    }
    res.json(items);
  });

  return router;
};
