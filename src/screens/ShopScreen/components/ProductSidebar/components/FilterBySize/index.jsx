import Checkbox from "../../../../../../components/reusables/Checkbox/CheckBox";
const sizes = [
  { id: 1, name: "XS" },
  { id: 2, name: "S" },
  { id: 3, name: "M" },
  { id: 4, name: "L" },
  { id: 5, name: "XL" },
  { id: 6, name: "XXL" },
];
export default function FilterBySize({ handleChange }) {
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
              <span className="text-gray-400">(11)</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
