import Category from "./components/Category";
import DoubleRangeSlider from "./components/DoubleRangeSlider";
import Colors from "./components/Colors";

const ProductSidebar = ({ handleChange }) => {
  return (
    <div className="w-full hidden md:block md:w-1/4 lg:w-1/5">
      <div className="fixed top-16 z-[999] ">
        <section className="w-full border-r-2 border-[#e5e5e5] mt-12 z-[3] flex flex-col items-center overflow-y-auto h-screen">
          <Category handleChange={handleChange} />
          {/* Range Slider */}
          <div className="w-full mt-4 pl-5">
            <DoubleRangeSlider min={0} max={500} handleChange={handleChange} />
          </div>
          {/* Colors */}
          <div className="w-full mt-4 pl-5">
            <Colors handleChange={handleChange} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductSidebar;
