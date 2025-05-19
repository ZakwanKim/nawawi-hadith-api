const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const hadiths = require(path.join(__dirname, 'data', 'hadiths.json'));

app.use(cors());

// Get all hadiths
app.get('/api/hadiths', (req, res) => {
  res.json(hadiths);
});

// Get single hadith by number
app.get('/api/hadiths/:number', (req, res) => {
  const hadith = hadiths.find(h => h.number == req.params.number);
  if (hadith) {
    res.json(hadith);
  } else {
    res.status(404).json({ message: 'Hadith not found' });
  }
});

// Search hadiths by text
app.get('/api/hadiths/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const results = hadiths.filter(h => 
    h.english.toLowerCase().includes(query) || 
    h.arabic.includes(query)
  );
  res.json(results);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
