import { useEffect, useState } from "react";
import ProductCard from '../components/Card';
import HeroSection from '../components/HeroSection';
import Catagories from '../components/Catagories';
import CategorySection from '../components/CatagoriesSection';
import Header from '../components/Header';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Fetch products from your backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/storeowner/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    loadProducts();
  }, []);

  // Search and category filtering logic
  useEffect(() => {
    let filtered = products;

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, products]);

  // Collect unique categories for filter dropdown
  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <>
      <div className="w-screen min-h-screen bg-gray-100">
        <Header />
        <HeroSection />
        <Catagories />
        <CategorySection />

        <div className="p-6 max-w-7xl mx-auto">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-md mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category filter */}
          <select
            className="mb-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  image={product.image}
                  title={product.name}
                  price={`₹ ${product.price}`}
                  asin={product._id}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
