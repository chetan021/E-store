import { useState } from 'react';
import axios from 'axios';

const StoreOwnerProductUpload = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
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
        ownerId: owner.userId,
      });
      alert('Product uploaded successfully');
      setProduct({ title: '', description: '', price: '', image: '' });
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Upload Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Product Title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
