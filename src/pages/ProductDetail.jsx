// src/pages/ProductDetails.jsx
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  const { productId } = useParams(); // ← This extracts the ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(`https://e-store-wg39.onrender.com/storeowner/product/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    if (productId) {
      loadProduct();
    } else {
      console.warn("productId is undefined");
    }
  }, [productId]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 pt-20">
        <img src={product.image} alt={product.name} className="w-full h-80 object-contain rounded-lg" />
        <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
        <p className="text-lg text-gray-600">{product.description}</p>
        <p className="mt-2 font-semibold text-xl">₹ {product.price}</p>
        <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        <p className="text-sm text-gray-500">Quantity Available: {product.quantity}</p>
        <div className="mt-3">
          <span className="font-medium">Tags:</span>{" "}
          {product.tags?.map((tag, index) => (
            <span key={index} className="inline-block bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>

  );
}
