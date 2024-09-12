import "./Category.css";
import axios from "../../../../../../lib/api";
import { useEffect, useState } from "react";
import MultiLevelCheckbox from "./MultiLevelCheckBox";

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
      <MultiLevelCheckbox categories={categories} />
    </div>
  );
}

export default Category;
