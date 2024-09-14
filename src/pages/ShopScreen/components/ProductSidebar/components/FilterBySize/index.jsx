import { useEffect, useState } from "react";
import axios from "../../../../../../lib/api";
import Checkbox from "../../../../../../components/reusables/Checkbox";

export default function FilterBySize({ handleSizeChange }) {
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const loadSizes = async () => {
    const { data } = await axios.get("/api/products/sizes/");
    setSizes(data);
  };
  const handleChange = (size) => {
    const newSelected = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSelected);
    handleSizeChange(newSelected);
  };
  useEffect(() => {
    loadSizes();
  }, []);
  return (
    <>
      <h2 className="text-lg tracking-wide font-medium text-gray-900">
        Filter By Size
      </h2>
      <div className="px-3">
        {sizes.map((size, i) => {
          return (
            <div key={i} className="flex items-center justify-between">
              <Checkbox
                key={size.id}
                label={size.name}
                checked={selectedSizes.includes(size.name)}
                onChange={() => handleChange(size.name)}
              />
              <span className="text-gray-400">({size.product_count})</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
