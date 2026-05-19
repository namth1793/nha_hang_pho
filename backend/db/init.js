const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

function initDB() {
  const dataDir = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const db = new Database(path.join(dataDir, 'chefspho.db'));

  db.exec(`
    CREATE TABLE IF NOT EXISTS menu_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      name_vn TEXT,
      slug TEXT UNIQUE,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      name TEXT NOT NULL,
      name_vn TEXT,
      description TEXT,
      price REAL NOT NULL,
      image_url TEXT,
      is_featured INTEGER DEFAULT 0,
      is_available INTEGER DEFAULT 1,
      spicy_levels TEXT,
      FOREIGN KEY (category_id) REFERENCES menu_categories(id)
    );

    CREATE TABLE IF NOT EXISTS gallery_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      category TEXT,
      image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      rating INTEGER DEFAULT 5,
      review TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS careers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      type TEXT,
      description TEXT,
      requirements TEXT,
      is_open INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS career_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      career_id INTEGER,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (career_id) REFERENCES careers(id)
    );
  `);

  const catCount = db.prepare('SELECT COUNT(*) as c FROM menu_categories').get().c;
  if (catCount === 0) {
    const insCategory = db.prepare(
      'INSERT INTO menu_categories (name, name_vn, slug, sort_order) VALUES (?, ?, ?, ?)'
    );
    const categories = [
      ['Pho', 'Phở', 'pho', 1],
      ['Vermicelli', 'Bún', 'bun', 2],
      ['Rice', 'Cơm', 'com', 3],
      ['Sandwiches', 'Bánh Mì', 'banh-mi', 4],
      ['Appetizers', 'Khai Vị', 'khai-vi', 5],
      ['Noodles', 'Mì', 'mi', 6],
      ['Beverages', 'Đồ Uống', 'do-uong', 7],
    ];
    const insertMany = db.transaction(() => {
      categories.forEach(([name, name_vn, slug, sort_order]) =>
        insCategory.run(name, name_vn, slug, sort_order)
      );
    });
    insertMany();

    const insItem = db.prepare(`
      INSERT INTO menu_items (category_id, name, name_vn, description, price, image_url, is_featured, spicy_levels)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const menuItems = db.transaction(() => {
      // PHO (cat 1)
      insItem.run(1, 'Premium Beef Short Ribs Pho', 'Phở Sườn Bò Ngắn',
        'Our signature pho with tender slow-braised beef short ribs, silky broth simmered 12+ hours, fresh herbs, and hand-made noodles. One bowl. Two bones. Maximum flavor.',
        18.99, 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&fit=crop', 1, '0-10');
      insItem.run(1, "Chef's Special Combination Pho", 'Phở Đặc Biệt Nhà Hàng',
        'A generous bowl with rare steak, well-done brisket, tendon, and meatballs in our signature 12-hour golden broth.',
        16.99, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&fit=crop', 1, '0-10');
      insItem.run(1, 'Rare Beef Pho', 'Phở Tái',
        'Thin-sliced rare steak that gently cooks in hot, aromatic broth. Simple, classic, perfect.',
        14.99, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&fit=crop', 0, '0-10');
      insItem.run(1, 'Chicken Pho', 'Phở Gà',
        'Free-range chicken breast and thigh in a light, fragrant ginger-scented broth with fresh herbs and rice noodles.',
        14.99, 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?q=80&w=600&fit=crop', 0, null);
      insItem.run(1, 'Seafood Pho', 'Phở Hải Sản',
        'Shrimp, scallops, and crab meat in a delicate seafood broth. A fresh and flavorful twist on a classic.',
        17.99, 'https://images.unsplash.com/photo-1605197788044-9e8c7ee1c3cc?q=80&w=600&fit=crop', 0, null);
      insItem.run(1, 'Vegan Pho', 'Phở Chay',
        'Clear vegetable broth infused with star anise and cinnamon, with tofu, mushrooms, and seasonal vegetables.',
        13.99, 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&fit=crop', 0, null);
      insItem.run(1, "Spicy Chef's Choice Pho", 'Phở Cay Đặc Biệt',
        "Chef Duong's secret spicy broth with your choice of 10 heat levels. Dare to try level 10?",
        16.99, 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=600&fit=crop', 1, '1-10');

      // BUN (cat 2)
      insItem.run(2, 'Grilled Pork Vermicelli Bowl', 'Bún Thịt Nướng',
        'Rice vermicelli topped with grilled marinated pork, fresh lettuce, cucumber, bean sprouts, and sweet fish sauce.',
        14.99, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&fit=crop', 0, null);
      insItem.run(2, 'Vermicelli with Spring Rolls', 'Bún Chả Giò',
        'Cold rice vermicelli with crispy fried spring rolls, fresh herbs, pickled vegetables, and house fish sauce.',
        14.99, 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&fit=crop', 0, null);
      insItem.run(2, 'Charbroiled Combo Vermicelli', 'Bún Tôm Thịt Nướng',
        'Vermicelli bowl with charbroiled shrimp, pork, and egg. A fragrant, satisfying meal.',
        16.99, 'https://images.unsplash.com/photo-1559181567-c3190900e8d8?q=80&w=600&fit=crop', 0, null);
      insItem.run(2, 'Hue Spicy Beef Noodles', 'Bún Bò Huế',
        'Traditional Central Vietnamese noodle soup with lemongrass, shrimp paste, pork hocks, and thick round noodles.',
        16.99, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&fit=crop', 0, '3-5');

      // COM (cat 3)
      insItem.run(3, 'Charbroiled Pork Chop Rice', 'Cơm Sườn Nướng',
        'Juicy charbroiled pork chop marinated in lemongrass over steamed jasmine rice with pickled daikon, egg, and tomato.',
        14.99, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&fit=crop', 0, null);
      insItem.run(3, 'Shaken Beef Rice', 'Cơm Bò Lúc Lắc',
        "French-inspired wok-tossed cubed ribeye in garlic butter, served over rice with watercress salad. Chef Duong's signature.",
        16.99, 'https://images.unsplash.com/photo-1544025162-d76538920773?q=80&w=600&fit=crop', 1, null);
      insItem.run(3, 'Yang Chow Fried Rice', 'Cơm Chiên Dương Châu',
        'Classic Vietnamese-Chinese style fried rice with shrimp, pork, egg, and mixed vegetables. Light and fragrant.',
        13.99, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&fit=crop', 0, null);
      insItem.run(3, 'Shaken Tofu Rice', 'Cơm Đậu Hũ Lúc Lắc',
        'Crispy pan-fried tofu tossed in our signature garlic butter sauce over fragrant rice. A vegetarian delight.',
        13.99, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&fit=crop', 0, null);

      // BANH MI (cat 4)
      insItem.run(4, 'Grilled Pork Banh Mi', 'Bánh Mì Thịt Nướng',
        'Crusty Vietnamese baguette with grilled lemongrass pork, pâté, fresh herbs, jalapeños, and house aioli.',
        8.99, 'https://images.unsplash.com/photo-1562802378-063ec186a863?q=80&w=600&fit=crop', 0, null);
      insItem.run(4, 'Chicken Banh Mi', 'Bánh Mì Gà',
        'Tender grilled chicken with pickled daikon, carrots, cucumber, cilantro, and sriracha mayo in a fresh baguette.',
        8.99, 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600&fit=crop', 0, null);
      insItem.run(4, 'Shrimp Banh Mi', 'Bánh Mì Tôm',
        'Juicy grilled shrimp with fresh vegetables, herbs, and our signature house sauce in a toasted baguette.',
        9.99, 'https://images.unsplash.com/photo-1528736235302-52922df5c122?q=80&w=600&fit=crop', 0, null);

      // KHAI VI (cat 5)
      insItem.run(5, 'Crispy Spring Rolls', 'Chả Giò',
        'Golden fried spring rolls filled with pork, vermicelli, wood-ear mushroom, and vegetables. Served with sweet chili sauce.',
        7.99, 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&fit=crop', 0, null);
      insItem.run(5, 'Pork & Vegetable Dumplings', 'Hoành Thánh',
        'Steamed or pan-fried dumplings filled with seasoned pork and fresh vegetables. Served with ginger-soy dipping sauce.',
        8.99, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&fit=crop', 0, null);
      insItem.run(5, 'Garlic Butter Chicken Wings', 'Cánh Gà Bơ Tỏi',
        'Crispy wings tossed in our house garlic butter sauce with fresh scallions and fried shallots. Absolutely addictive.',
        12.99, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=600&fit=crop', 1, null);
      insItem.run(5, 'Rocket Shrimp', 'Tôm Rocket',
        "Crispy shrimp tossed in chef's signature spicy aioli with scallions and sesame seeds. A crowd favorite.",
        13.99, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&fit=crop', 0, '2-4');
      insItem.run(5, 'Fresh Spring Rolls', 'Gỏi Cuốn',
        'Light and fresh rice paper rolls with shrimp, pork, rice vermicelli, lettuce, and fresh herbs. Served with peanut sauce.',
        8.99, 'https://images.unsplash.com/photo-1559181567-c3190900e8d8?q=80&w=600&fit=crop', 0, null);

      // MI (cat 6)
      insItem.run(6, 'Garlic Noodle with Chicken Wings', 'Mì Xào Tỏi Gà',
        'Egg noodles wok-tossed in house garlic butter, topped with crispy chicken wings. Incredibly flavorful.',
        14.99, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&fit=crop', 0, null);
      insItem.run(6, 'Garlic Noodle with Ribeye Steak', 'Mì Xào Tỏi Bò Ribeye',
        'Premium egg noodles in garlic butter topped with sliced ribeye steak, scallions, and sesame seeds.',
        17.99, 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&fit=crop', 1, null);
      insItem.run(6, 'Pad Thai', 'Pad Thái',
        'Classic Thai stir-fried rice noodles with shrimp or chicken, egg, bean sprouts, and crushed peanuts. Topped with lime.',
        14.99, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=600&fit=crop', 0, null);
      insItem.run(6, 'Stir-Fried Mixed Veggies Noodle', 'Mì Xào Rau Thập Cẩm',
        'Tender egg noodles wok-fried with shrimp, beef, chicken, and seasonal vegetables in savory oyster sauce.',
        16.99, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&fit=crop', 0, null);

      // DO UONG (cat 7)
      insItem.run(7, 'Vietnamese Iced Coffee', 'Cà Phê Sữa Đá',
        'Slow-drip Vietnamese Robusta coffee over sweetened condensed milk and ice. Our signature drink.',
        4.99, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&fit=crop', 1, null);
      insItem.run(7, 'Organic Jasmine Milk Tea', 'Trà Sữa Hoa Nhài',
        'Delicate organic jasmine green tea with house milk blend, lightly sweetened. Served hot or iced.',
        5.99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&fit=crop', 0, null);
      insItem.run(7, 'Fresh Lemonade', 'Nước Chanh Tươi',
        'Freshly squeezed lemon juice with a hint of salt — a refreshing Vietnamese classic.',
        3.99, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=600&fit=crop', 0, null);
      insItem.run(7, 'Soft Drinks', 'Nước Ngọt',
        'Coke, Diet Coke, Sprite, or Dr. Pepper.',
        2.99, 'https://images.unsplash.com/photo-1545948992-77f26aff86d9?q=80&w=600&fit=crop', 0, null);
    });
    menuItems();
  }

  const galCount = db.prepare('SELECT COUNT(*) as c FROM gallery_items').get().c;
  if (galCount === 0) {
    const insGal = db.prepare('INSERT INTO gallery_items (title, category, image_url) VALUES (?, ?, ?)');
    const galItems = db.transaction(() => {
      insGal.run('Premium Beef Short Ribs Pho', 'pho', 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&fit=crop');
      insGal.run("Chef's Special Combination Pho", 'pho', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&fit=crop');
      insGal.run('Chicken Pho', 'pho', 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?q=80&w=800&fit=crop');
      insGal.run('Vegan Pho', 'pho', 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&fit=crop');
      insGal.run('Spicy Pho', 'pho', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&fit=crop');
      insGal.run('Crispy Spring Rolls', 'appetizers', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&fit=crop');
      insGal.run('Garlic Butter Chicken Wings', 'appetizers', 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800&fit=crop');
      insGal.run('Pork & Vegetable Dumplings', 'appetizers', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&fit=crop');
      insGal.run('Shaken Beef Rice', 'rice-noodles', 'https://images.unsplash.com/photo-1544025162-d76538920773?q=80&w=800&fit=crop');
      insGal.run('Yang Chow Fried Rice', 'rice-noodles', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&fit=crop');
      insGal.run('Charbroiled Pork Chop Rice', 'rice-noodles', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&fit=crop');
      insGal.run('Grilled Pork Vermicelli', 'rice-noodles', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&fit=crop');
      insGal.run('Grilled Pork Banh Mi', 'sandwiches', 'https://images.unsplash.com/photo-1562802378-063ec186a863?q=80&w=800&fit=crop');
      insGal.run('Garlic Noodle with Ribeye', 'rice-noodles', 'https://images.unsplash.com/photo-1559181567-c3190900e8d8?q=80&w=800&fit=crop');
      insGal.run('Pad Thai', 'rice-noodles', 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&fit=crop');
      insGal.run('Vietnamese Iced Coffee', 'beverages', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&fit=crop');
    });
    galItems();
  }

  const testCount = db.prepare('SELECT COUNT(*) as c FROM testimonials').get().c;
  if (testCount === 0) {
    const insTest = db.prepare('INSERT INTO testimonials (name, rating, review) VALUES (?, ?, ?)');
    const tests = db.transaction(() => {
      insTest.run('Kirstin Everton', 5, "Hands down the most authentic and flavorful pho I've ever had outside Vietnam. The broth is rich, the noodles are fresh, and Chef Duong's attention to detail is unmatched. I bring every out-of-town guest here!");
      insTest.run('Mike Lloyd', 5, "The attention to detail here is incredible. Every bowl is crafted with care. The spicy pho at level 7 was perfect — bold flavor without just heat. The staff are friendly and make you feel like family. Don't skip the garlic noodles!");
      insTest.run('Andy Guscott', 5, "A true gem of a pho restaurant. The short ribs pho is worth every penny — the bones fall apart and the broth is liquid gold. I've been coming every week for a year and it never disappoints. Best Vietnamese food in Ontario!");
      insTest.run('Sarah Nguyen', 5, "The rocket shrimp appetizer alone is worth the trip. But stay for the pho — 12 hours of broth-making love in every bowl. The jasmine milk tea is the perfect finish. This is my family's go-to spot.");
      insTest.run('David Chen', 5, "Beautifully authentic. You can taste the tradition in every spoonful. The chicken wings in garlic butter are dangerously good. Love that they use fresh herbs and the portion sizes are generous. Highly recommend!");
      insTest.run('Maria Santos', 5, "I tried the vegan pho and was amazed — rich, complex, deeply satisfying. So rare to find a pho place that does vegan broth this well. The fresh spring rolls were also excellent. Will definitely be back soon!");
    });
    tests();
  }

  const carCount = db.prepare('SELECT COUNT(*) as c FROM careers').get().c;
  if (carCount === 0) {
    const insCar = db.prepare('INSERT INTO careers (title, type, description, requirements) VALUES (?, ?, ?, ?)');
    const cars = db.transaction(() => {
      insCar.run('Front of House Server', 'Full-Time / Part-Time',
        'Join our warm, welcoming team as a server. You will take orders, serve guests, and ensure every dining experience is exceptional. We value hospitality, energy, and a genuine love for Vietnamese food culture.',
        JSON.stringify(['Prior restaurant experience preferred', 'Friendly and outgoing personality', 'Ability to work weekends', 'Food handler certification (or willingness to obtain)', 'Team player with strong communication skills']));
      insCar.run('Kitchen Cook', 'Full-Time',
        "Work alongside Chef Duong to prepare authentic Vietnamese dishes. You'll help with prep work, cooking pho broth, and keeping our kitchen running smoothly. Passion for Vietnamese cuisine is a must.",
        JSON.stringify(['1+ year kitchen experience', 'Familiarity with Vietnamese cuisine a plus', 'Ability to work in a fast-paced environment', 'Food handler certification required', 'Reliable and punctual']));
      insCar.run('Dishwasher / Kitchen Assistant', 'Part-Time',
        'Support our kitchen team by maintaining a clean and organized workspace. This is a great entry-level opportunity for someone who wants to learn the restaurant industry from the ground up.',
        JSON.stringify(['No prior experience required', 'Ability to stand for long periods', 'Flexible availability including weekends', 'Dependable and hardworking attitude']));
    });
    cars();
  }

  return db;
}

module.exports = { initDB };
