const express = require('express');
const cors = require('cors');
const { initDB } = require('./db/init');

const app = express();
const PORT = process.env.PORT || 5029;

app.use(cors());
app.use(express.json());

const db = initDB();

app.use('/api/menu', require('./routes/menu')(db));
app.use('/api/gallery', require('./routes/gallery')(db));
app.use('/api/testimonials', require('./routes/testimonials')(db));
app.use('/api/contacts', require('./routes/contacts')(db));
app.use('/api/careers', require('./routes/careers')(db));

app.listen(PORT, () => {
  console.log(`ChefsPho backend running on http://localhost:${PORT}`);
});
