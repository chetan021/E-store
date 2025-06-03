import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
      const response = await axios.get(`http://localhost:3000/cart/${user.userId}`);
      setCartItems(response.data.cart);

      const totalPrice = response.data.cart.reduce((acc, item) => {
        const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        return acc + numericPrice * (item.quantity || 1);
      }, 0);

      setTotal(totalPrice.toFixed(2));
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
    {/* <div><Header/></div> */}
      <Header />
  <div className="max-w-4xl mx-auto p-4 block pt-20">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center bg-white shadow-md p-4 rounded-md">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Price: {item.price}</p>
                  <p className="text-gray-600">Qty: {item.quantity || 1}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right mt-6 text-xl font-bold">
            Total: ₹{total}
          </div>
        </>
      )}
    </div>
</div>
  );
};

export default CartPage;
