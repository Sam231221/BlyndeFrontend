import { useEffect, useState } from "react";
import Input from "../Input";
import axios from "../../../../../../lib/api";

export default function Colors({ handleChange }) {
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
      <h2 className="sidebar-title color-title">Colors</h2>
      <div className="px-3">
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test1" />
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
    </>
  );
}
