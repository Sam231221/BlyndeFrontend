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
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Category
      </h2>
      <MultiLevelCheckbox categories={categories} />
    </div>
  );
}

export default Category;
