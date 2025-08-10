import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: '' });

  useEffect(() => {
    console.log('Fetching products...');
    axios.get('https://everylady-ecommerce.onrender.com/api/products')
      .then(response => {
        console.log('Products fetched:', response.data);
        setProducts(response.data);
      })
      .catch(error => console.log('API Error:', error.message));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const addProduct = () => {
    if (newProduct.id && newProduct.name && newProduct.price) {
      axios.post('https://everylady-ecommerce.onrender.com/api/products', newProduct)
        .then(response => {
          setProducts([...products, response.data]);
          setNewProduct({ id: '', name: '', price: '' });
          console.log('Product added:', response.data);
        })
        .catch(error => console.log('Add Product Error:', error.message));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Everylady E-commerce</h1>
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500">Products</Link>
        <Link to="/cart" className="mr-4 text-blue-500">Cart ({cart.length})</Link>
        <Link to="/admin" className="text-blue-500">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="border p-4 rounded">
                <h2 className="text-xl">{product.name}</h2>
                <p>${product.price}</p>
                <button onClick={() => addToCart(product)} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        } />
        <Route path="/cart" element={
          <>
            <h2 className="text-xl font-bold mt-6">Cart</h2>
            {cart.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <ul>
                {cart.map(item => (
                  <li key={item.id} className="border p-2 mb-2 flex justify-between">
                    <span>{item.name} - ${item.price}</span>
                    <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        } />
        <Route path="/admin" element={
          <div>
            <h2 className="text-xl font-bold mt-6">Admin - Add Product</h2>
            <div className="mt-4">
              <input
                type="text"
                name="id"
                value={newProduct.id}
                onChange={handleInputChange}
                placeholder="Product ID"
                className="border p-2 mr-2"
              />
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="border p-2 mr-2"
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="border p-2 mr-2"
              />
              <button onClick={addProduct} className="bg-green-500 text-white px-2 py-1 rounded">
                Add Product
              </button>
            </div>
            <h3 className="text-lg font-bold mt-6">Current Products</h3>
            <ul>
              {products.map(product => (
                <li key={product.id} className="border p-2 mb-2">{product.name} - ${product.price}</li>
              ))}
            </ul>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;