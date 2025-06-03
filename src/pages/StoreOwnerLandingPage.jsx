import Header from "../components/Header";

import { useNavigate } from "react-router-dom";

const StoreOwnerLandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center pt-20">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome Store Owners</h1>
        <p className="text-gray-600 text-lg mb-6">
          Manage your store, upload products, and track your business with ease.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/store-owner/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/store-owner/signup")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Upload Products</h3>
          <p className="text-gray-600">Easily add product listings with images, descriptions, and prices.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Manage Inventory</h3>
          <p className="text-gray-600">Update or delete existing items in your online catalog.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Track Performance</h3>
          <p className="text-gray-600">Monitor views, sales, and performance analytics of your store.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default StoreOwnerLandingPage;
