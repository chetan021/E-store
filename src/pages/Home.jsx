import { useEffect, useState } from "react";
import ProductCard from '../components/Card';
import HeroSection from '../components/HeroSection';
// import Catagories from '../components/Catagories';
// import CategorySection from '../components/CatagoriesSection';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [user, setUser] = useState(null); 

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
  // Fetch all store owner uploaded products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get('https://e-store-wg39.onrender.com/storeowner/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
  const normalize = (str) => (str || '').toLowerCase();
  let filtered = [...products];

  if (categoryFilter !== 'All') {
    filtered = filtered.filter(p => normalize(p.category) === normalize(categoryFilter));
  }

  if (searchTerm.trim() !== '') {
    const search = normalize(searchTerm);
    filtered = filtered.filter(p =>
      normalize(p.name).includes(search) ||
      normalize(p.description).includes(search) ||
      normalize(p.brand).includes(search)
    );
  }

  setFilteredProducts(filtered);
}, [searchTerm, categoryFilter, products]);
  // Collect unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className=" w-screen min-h-screen bg-gray-100">
      <Header />
      <HeroSection />
      {/* <Catagories /> */}
      {/* <CategorySection /> */}

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
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <ProductCard
                  image={product.image}
                  title={product.name}
                  price={`₹ ${product.price}`}
                />
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
