import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = () => {
  const { asin } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
        const options = {
            method: 'GET',
            url: 'https://real-time-amazon-data.p.rapidapi.com/product-details',
            params: {
              asin: asin,
              country: 'US'
            },
            headers: {
              'x-rapidapi-key': 'd5250d1e39mshe00821e9968d82cp191e6ajsn9aa64de8e85b',
              'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
            }
          };

      try {
        const response = await axios.request(options);
        setProduct(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchDetails();
  }, [asin]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.product_title}</h1>
      <img
        src={product.product_photo}
        alt={product.product_title}
        className="w-full max-h-96 object-contain mb-4"
      />
      <p className="text-gray-700 mb-2">Price: {product.product_price}</p>
      <p className="text-gray-600">{product.product_description}</p>
    </div>
  );
};

export default ProductDetail;
