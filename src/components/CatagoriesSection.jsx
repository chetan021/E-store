// components/CategorySection.jsx
import ProductCard from "./Card";

const productsByCategory = {
  Men: [
    {
      image: "https://via.placeholder.com/300x200?text=Men+Shirt",
      title: "Casual Shirt",
      description: "Comfortable and stylish",
      price: "29.99",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Men+Jeans",
      title: "Blue Jeans",
      description: "Slim fit denim",
      price: "39.99",
    },
  ],
  Women: [
    {
      image: "https://via.placeholder.com/300x200?text=Women+Dress",
      title: "Floral Dress",
      description: "Elegant summer wear",
      price: "49.99",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Women+Bag",
      title: "Leather Handbag",
      description: "Stylish and spacious",
      price: "69.99",
    },
  ],
  Electronics: [
    {
      image: "https://via.placeholder.com/300x200?text=Headphones",
      title: "Wireless Headphones",
      description: "Noise-cancelling",
      price: "89.99",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Smartphone",
      title: "Smartphone X",
      description: "Latest model",
      price: "599.99",
    },
  ],
};

const CategorySection = () => {
  return (
    <div className="p-6 space-y-12">
      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
