import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ProductCard = ({ image, title, description, price, asin }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${asin}`);
  };

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Please login to add to cart");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/add-to-cart', {
        userId: user.userId,
        asin,
        title,
        image,
        price
      });
      console.log('Cart updated:', response.data);
      alert("Item added to cart");
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  return (
    <div
      
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 block cursor-pointer"
    >
      <img src={image} alt={title} className="w-full h-48 object-contain" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">{price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
