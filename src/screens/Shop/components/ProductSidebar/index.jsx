import { useEffect, useState } from "react";
import axios from "../../../../lib/api";
import Input from "./Input";
import Category from "./Category/Category";

import DoubleRangeSlider from "../../../../components/DoubleRangeSlider";

import "./Sidebar.css";

const ProductSidebar = ({ handleChange, min, max }) => {
  const [colors, setColors] = useState([]);
  const loadColors = async () => {
    const { data } = await axios.get("/api/products/colors/");
    setColors(data);
  };
  useEffect(() => {
    loadColors();
  }, []);
  return (
    <div className="w-full md:w-1/4 lg:w-1/5">
      <div className="fixed top-14 z-[1999] ">
        <section className="sidebar overflow-y-auto h-screen">
          <Category handleChange={handleChange} />
          {/* Range Slider */}
          <div className="w-full mt-4 pl-5">
            <DoubleRangeSlider
              min={min}
              max={max}
              handleChange={handleChange}
            />
          </div>
          {/* Colors */}
          <div className="w-full mt-4 pl-5">
            <h2 className="sidebar-title color-title">Colors</h2>
            <div className="px-3">
              <label className="sidebar-label-container">
                <input
                  onChange={handleChange}
                  type="radio"
                  value=""
                  name="test1"
                />
                <span className="checkmark all"></span>
                All
              </label>
              {colors.map(({ name, hex_code }, i) => (
                <Input
                  key={i}
                  handleChange={handleChange}
                  value={name}
                  title={name}
                  name={name}
                  color={hex_code}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductSidebar;
