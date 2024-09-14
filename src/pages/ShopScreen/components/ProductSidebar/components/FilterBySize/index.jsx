import { useEffect, useState } from "react";
import axios from "../../../../../../lib/api";
import Checkbox from "../../../../../../components/reusables/Checkbox";

export default function FilterBySize({ handleChange }) {
  const [sizes, setSizes] = useState([]);
  const loadSizes = async () => {
    const { data } = await axios.get("/api/products/sizes/");
    setSizes(data);
  };
  useEffect(() => {
    loadSizes();
  }, []);
  return (
    <>
      <h2 className="sidebar-title color-title">Filter By Size</h2>
      <div className="px-3">
        {sizes.map((size) => {
          return (
            <div className="flex items-center justify-between">
              <Checkbox
                key={size.id}
                label={size.name}
                checked={false}
                onChange={() => handleChange(size.id)}
              />
              <span className="text-gray-400">({size.product_count})</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
