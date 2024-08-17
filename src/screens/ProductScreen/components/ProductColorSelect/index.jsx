import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
function ProductColorSelect({ colors }) {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-medium  my-2 text-gray-800">
        Color: <span>{selectedColor}</span>
      </h1>
      <div className="flex gap-3">
        {colors.map((color) => (
          <div
            type="button"
            key={color.hexcode}
            className={`relative w-8 h-8 rounded-full cursor-pointer  ${
              selectedColor === color.name
                ? "border-[2px] border-blue-500 "
                : ""
            } ${
              color.stock === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleColorClick(color.name)}
            disabled={color.stock === 0}
          >
            <div
              style={{ backgroundColor: color.hexcode }}
              className="absolute border-2 border-gray-300 inset-0 m-1 rounded-full"
            ></div>
          </div>
        ))}
      </div>
      <div>
        {selectedColor && (
          <button
            className="flex items-center"
            onClick={() => setSelectedColor(null)}
          >
            <IoCloseOutline color={15} />
            <span className="ml-2 text-xs"> Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductColorSelect;
