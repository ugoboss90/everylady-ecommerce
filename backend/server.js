const express = require("express");
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

let products = [
  { id: 1, name: "Dress", price: 29.99 },
  { id: 2, name: "Shirt", price: 19.99 },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  // Validate and assign a unique ID (simplified)
  newProduct.id = products.length + 1; // Increment ID (for demo; use a better method in production)
  products.push(newProduct);
  res.status(201).json(newProduct); // 201 Created
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
