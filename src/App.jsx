
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from './pages/ProductDetail';
import LoginPage from "./pages/LoginPage";
import CartPage from './pages/CartPage';
import StoreOwnerLandingPage from './pages/StoreOwnerLandingPage';
import StoreOwnerSignup from './pages/StoreOwnerSignup';
import StoreOwnerLogin from './pages/StoreOwnerLogin';
import StoreOwnerProductUpload from './pages/StoreOwnerProductUpload';
import StoreOwnerProductList from './pages/StoreOwnerProductList';
// let data = fetchData()
// console.log (data);

// const sampleProduct = {
//   image: "https://via.placeholder.com/300",
//   title: "Stylish Sneakers",
//   description: "Comfortable and trendy sneakers perfect for everyday wear.",
//   price: "59.99",
// };
function App() {
  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path="/store-owner" element={<StoreOwnerLandingPage />} />
        <Route path="/store-owner/login" element={<StoreOwnerLogin />} />
        <Route path="/store-owner/signup" element={<StoreOwnerSignup />} />
        <Route path="/store-owner/upload-product" element={<StoreOwnerProductUpload />} />
        <Route path="/store-owner/products" element={<StoreOwnerProductList />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
