const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/categories', (req, res) => {
    const cats = db.prepare('SELECT * FROM menu_categories ORDER BY sort_order').all();
    res.json(cats);
  });

  router.get('/', (req, res) => {
    const { category } = req.query;
    let items;
    if (category && category !== 'all') {
      items = db.prepare(`
        SELECT mi.*, mc.name as category_name, mc.name_vn as category_name_vn, mc.slug as category_slug
        FROM menu_items mi
        JOIN menu_categories mc ON mi.category_id = mc.id
        WHERE mc.slug = ? AND mi.is_available = 1
        ORDER BY mi.is_featured DESC, mi.id
      `).all(category);
    } else {
      items = db.prepare(`
        SELECT mi.*, mc.name as category_name, mc.name_vn as category_name_vn, mc.slug as category_slug
        FROM menu_items mi
        JOIN menu_categories mc ON mi.category_id = mc.id
        WHERE mi.is_available = 1
        ORDER BY mc.sort_order, mi.is_featured DESC, mi.id
      `).all();
    }
    res.json(items);
  });

  router.get('/featured', (req, res) => {
    const items = db.prepare(`
      SELECT mi.*, mc.name as category_name, mc.slug as category_slug
      FROM menu_items mi
      JOIN menu_categories mc ON mi.category_id = mc.id
      WHERE mi.is_featured = 1 AND mi.is_available = 1
      LIMIT 6
    `).all();
    res.json(items);
  });

  return router;
};
