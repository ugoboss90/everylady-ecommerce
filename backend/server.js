const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins (for development; restrict in production)

let products = [
  { id: 1, name: "Dress", price: 29.99 },
  { id: 2, name: "Shirt", price: 19.99 },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1; // Simplified ID assignment
  products.push(newProduct);
  res.status(201).json(newProduct);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
