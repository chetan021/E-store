import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const StoreOwnerProductUpload = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    category: '',
    brand: '',
    tags: '',
    price: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const owner = JSON.parse(localStorage.getItem('storeOwner'));
    if (!owner) return alert('You must be logged in');

    try {
      await axios.post('http://localhost:3000/storeowner/upload-product', {
        ...product,
        // ownerId: owner.userId,
        ownerId: owner.ownerId,
        tags: product.tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags to array
      });
      alert('Product uploaded successfully');
      setProduct({
        name: '',
        description: '',
        quantity: '',
        category: '',
        brand: '',
        tags: '',
        price: '',
        image: '',
      });
      navigate('/store-owner/products');
    } catch (err) {
      alert('Upload failed', err);
    }
  };

  const inputStyle =
    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Upload Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Product Name"
            className={inputStyle}
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Product Description"
            className={inputStyle}
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity Available"
            className={inputStyle}
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category (e.g., Electronics, Clothing)"
            className={inputStyle}
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Brand"
            className={inputStyle}
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className={inputStyle}
            value={product.tags}
            onChange={(e) => setProduct({ ...product, tags: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className={inputStyle}
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className={inputStyle}
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreOwnerProductUpload;
