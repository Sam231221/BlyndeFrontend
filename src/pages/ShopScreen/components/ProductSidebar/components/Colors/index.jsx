import { useEffect, useState } from "react";
import axios from "../../../../../../lib/api";
import ColorCheckBox from "./ColorCheckBox";

export default function Colors({ handleChange }) {
  const [isChecked, setIsChecked] = useState(false);
  const [colors, setColors] = useState([]);
  const loadColors = async () => {
    const { data } = await axios.get("/api/products/colors/");
    setColors(data);
  };
  useEffect(() => {
    loadColors();
  }, []);
  return (
    <>
      <h2 className="text-lg tracking-wide font-medium text-gray-900">Colors</h2>
      <div className="px-3">
        <ColorCheckBox
          direction="vertical"
          colors={colors}
          handleColorChange={handleChange}
        />
      </div>
    </>
  );
}
