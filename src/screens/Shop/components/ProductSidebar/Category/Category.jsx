import "./Category.css";
import Input from "../Input";
import axios from "../../../../../lib/api";
import { useEffect, useState } from "react";
function Category({ handleChange }) {
  const [categories, setCategories] = useState([]);
  const loadCategories = async () => {
    const { data } = await axios.get("/api/products/categories/");
    setCategories(data);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="w-full pl-5">
      <h2 className="sidebar-title">Category</h2>

      <div className="px-3">
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="Men"
          title="Men"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Women"
          title="Women"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Skirts"
          title="Skirts"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Jackets"
          title="Jackets"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Pants"
          title="Pants"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Shoes"
          title="Shoes"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Watches"
          title="Watches"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
