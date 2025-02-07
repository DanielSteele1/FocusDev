const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// get QOTD
app.get('/api/qotd', async (req, res) => {
  try {
    const response = await fetch('https://favqs.com/api/qotd');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});
 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});