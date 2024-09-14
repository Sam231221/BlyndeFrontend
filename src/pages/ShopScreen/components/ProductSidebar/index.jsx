import {
  Category,
  DoubleRangeSlider,
  Colors,
  FilterBySize,
} from "./components";

const ProductSidebar = ({
  handleCategoriesChange,
  handlePriceChange,
  handleSizeChange,
  handleColorChange,
}) => {
  return (
    <div className="w-full hidden md:block md:w-1/4 lg:w-1/5">
      <div className="relative">
        <section className="w-full border-r-2 border-[#e5e5e5] mt-12 z-[3] flex flex-col items-center overflow-y-auto">
          <Category handleCategoriesChange={handleCategoriesChange} />
          {/* Range Slider */}
          <div className="w-full mt-4 pl-5">
            <DoubleRangeSlider
              min={0}
              max={500}
              handlePriceChange={handlePriceChange}
            />
          </div>
          {/* FilterBySize */}
          <div className="w-full mt-4 pl-5">
            <FilterBySize handleSizeChange={handleSizeChange} />
          </div>
          {/* Colors */}
          <div className="w-full mt-4 pl-5">
            <Colors handleColorChange={handleColorChange} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductSidebar;
