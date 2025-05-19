const express = require('express');
const app = express();
const hadiths = require('./hadiths.json');

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to 40 Hadith of Nawawi API",
    endpoints: {
      allHadith: "/hadiths",
      singleHadith: "/hadiths/:id",
      randomHadith: "/hadiths/random"
    }
  });
});

app.get('/hadiths', (req, res) => {
  res.json(hadiths);
});

app.get('/hadiths/:id', (req, res) => {
  const hadith = hadiths.find(h => h.id === parseInt(req.params.id));
  if (!hadith) return res.status(404).json({ message: "Hadith not found" });
  res.json(hadith);
});

app.get('/hadiths/random', (req, res) => {
  const randomHadith = hadiths[Math.floor(Math.random() * hadiths.length)];
  res.json(randomHadith);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));
