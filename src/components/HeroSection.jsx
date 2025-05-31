import { useState, useEffect } from "react";
const HeroSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8">

        {/* Text Content */}
        <div className="text-center py-20 bg-blue-50">
          <h1 className="text-3xl font-bold">Welcome to ShopEase</h1>
          {user && <p className="mt-2 text-lg">Hello, {user.userName}</p>}

          <p className="text-lg text-gray-600 mb-6">
            Discover the best products at unbeatable prices. Style, quality, and convenience—all in one place.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
            Start Shopping
          </button>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.0f4sgX9Kh5Ht_SdhOXuBRQHaFN&pid=Api&P=0&h=220"
            alt="Shoes"
            className="rounded-xl shadow-lg object-cover"
          />
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.KMy5q68fUx6GByETPcvq6QHaHa&pid=Api&P=0&h=220"
            alt="Accessories"
            className="rounded-xl shadow-lg object-cover"
          />
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.59ctWMRhCErqiAHaxXU4KwHaEK&pid=Api&P=0&h=220"
            alt="Clothing"
            className="rounded-xl shadow-lg object-cover col-span-2"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
