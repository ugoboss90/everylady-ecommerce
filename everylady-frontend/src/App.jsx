import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Create Context for state management
export const AppContext = createContext();

// Product List Component
const ProductList = () => {
  const { products, addToCart } = useContext(AppContext);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="border p-4 mb-2 rounded">
            <h2 className="text-xl">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

// Cart Component
const Cart = () => {
  const { cart } = useContext(AppContext);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={index} className="border p-4 mb-2 rounded">
            <h2 className="text-xl">{item.name}</h2>
            <p className="text-gray-600">${item.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const { cart } = useContext(AppContext); // Example: Admin can view cart data
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Total Orders: {cart.length}</p>
      {/* Add more admin features here later */}
    </div>
  );
};

// Main App Component
// ... (keep existing imports and components)

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching products...");
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        console.log("Products fetched:", response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log("API Error:", error.message));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <AppContext.Provider value={{ products, cart, addToCart }}>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <a
              href="/"
              className="hover:text-blue-300"
              onClick={(e) => {
                e.preventDefault();
                navigate("/products");
              }}
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="/cart"
              className="hover:text-blue-300"
              onClick={(e) => {
                e.preventDefault();
                navigate("/cart");
              }}
            >
              Cart ({cart.length})
            </a>
          </li>
          <li>
            <a
              href="/admin"
              className="hover:text-blue-300"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin");
              }}
            >
              Admin
            </a>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
