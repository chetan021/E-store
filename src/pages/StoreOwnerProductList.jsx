import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const StoreOwnerProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const owner = JSON.parse(localStorage.getItem('storeOwner'));
    if (!owner) return alert('You must be logged in');

    axios
      .get(`https://e-store-wg39.onrender.com/storeowner/products/${owner.ownerId}`)
      .then((res) => setProducts(res.data.products))
      .catch(() => alert('Failed to fetch products'));
  }, []);

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 px-4 py-8 pt-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Your Uploaded Products</h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
                <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-blue-500 font-bold mt-2">₹{product.price}</p>
                <p className="text-xs text-gray-400">Category: {product.category}</p>
                <p className="text-xs text-gray-400">Brand: {product.brand}</p>
                <p className="text-xs text-gray-400">Qty: {product.quantity}</p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/store-owner/upload-product')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload More Products
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default StoreOwnerProductList;
