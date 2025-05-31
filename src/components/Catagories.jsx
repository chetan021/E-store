// components/CategoryScroller.jsx

const categories = [
    "Men",
    "Women",
    "Electronics",
    "Shoes",
    "Accessories",
    "Beauty",
    "Home",
    "Kids",
    "Sports",
  ];
  
  const CategoryScroller = () => {
    return (
      <div className="bg-white py-4 px-4 items-center flex w-screen">
        <div className="flex space-x-4 overflow-x-auto no-scrollbar ">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition whitespace-nowrap"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CategoryScroller;
  