import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
function SizeVariant({ sizes }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-medium  my-3 text-gray-800">
        Size: <span>{selectedSize}</span>
      </h1>
      <div className="flex">
        {sizes.map((size) => (
          <button
            key={size.size}
            className={`mr-3 border rounded px-6 py-1 hover:bg-blue-500 hover:text-white ${
              selectedSize === size.size ? "bg-blue-500 text-white" : ""
            } ${
              size.stock === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleSizeClick(size.size)}
            disabled={size.stock === 0}
          >
            <span>{size.size}</span>
            {size.stock === 0 && (
              <span className="text-xs ml-2">(Out of Stock)</span>
            )}
          </button>
        ))}
      </div>
      <div>
        {selectedSize && (
          <button
            className="flex items-center"
            onClick={() => setSelectedSize(null)}
          >
            <IoCloseOutline size={18} />
            <span className="ml-2 text-xs"> Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SizeVariant;
