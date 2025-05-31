import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);


  return (
    <nav className="bg-white shadow-md fixed w-full z-50 block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            ShopEase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/store-owner" className="block text-gray-700 hover:text-blue-600">Shop Owner</Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>
            <Link to="#" className="text-gray-700 hover:text-blue-600">Contact</Link>
            {user ? (
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  setUser(null);
                }}
                className="text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/store-owner" className="block text-gray-700 hover:text-blue-600">Shop Owner</Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>
          <Link to="#" className="block text-gray-700 hover:text-blue-600">Contact</Link>
          {user ? (
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  setUser(null);
                }}
                className="text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
        </div>
      )}
    </nav>
  );
};

export default Header;
