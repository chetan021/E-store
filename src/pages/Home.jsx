import ProductCard from '../components/Card';
import HeroSection from '../components/HeroSection';
import Catagories from '../components/Catagories';
import CategorySection from '../components/CatagoriesSection';
import { useEffect, useState } from "react";
import { fetchData } from '../FetchApi'
import Header from '../components/Header'
export default function Home() {



    const [data, setData] = useState([]);
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await fetchData();
        
        let storeData = product.products.map((item) => ({
          asin: item.asin,
          product_price: item.product_original_price,
          image: item.product_photo,
          title : item.product_title,
        }));
        setData(storeData);
  console.log("Fetched products:", storeData);
  console.log(" products:", product)
} catch (err) {
  console.error("Failed to load products:", err);
}
    };

loadProduct();
  }, []);
return (
  <>
    <div className='w-screen h-screen'>
      <div className=' '>
        <Header />
        <HeroSection />
        <Catagories />
        <CategorySection />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 ">
        {data.map((data, index) => (
          <ProductCard
            key={index}
            image={data.image}
            title={data.title} 
            asin = {data.asin}
            // or use a dummy title
            // description={product.description}
            price={`₹ ${data.price}`}
          />
        ))}
      </div>
    </div>
  </>
    
  )
}
