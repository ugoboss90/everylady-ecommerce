const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const products = [
  { id: 1, name: 'Dress', price: 29.99 },
  { id: 2, name: 'Shirt', price: 19.99 },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));