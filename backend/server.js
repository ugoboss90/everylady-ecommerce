const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins (restrict in production)

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

app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = products.length;
  products = products.filter((p) => p.id !== id);
  if (products.length < initialLength) {
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
