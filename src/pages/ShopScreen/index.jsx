import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import ProductSidebar from "./components/ProductSidebar";
import ProductRightbar from "./components/ProductRightbar";

export default function ShopScreen() {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    price: [0, 1000],
    sizes: [],
    color: "",
  });
  const handleCategoriesChange = (categories) => {
    setSelectedFilters((preb) => ({ ...preb, categories }));
  };
  const handlePriceChange = (price) => {
    setSelectedFilters((prev) => ({ ...prev, price }));
  };

  const handleSizeChange = (size) => {
    setSelectedFilters((prev) => ({ ...prev, sizes: size }));
  };

  const handleColorChange = (color) => {
    console.log("here color:", color);
    setSelectedFilters((prev) => ({
      ...prev,
      color,
    }));
  };
  console.log("selectedCategories:", selectedFilters);
  return (
    <PageContainer>
      <div className="mt-14  flex flex-col md:flex-row ">
        <ProductSidebar
          handleCategoriesChange={handleCategoriesChange}
          handlePriceChange={handlePriceChange}
          handleSizeChange={handleSizeChange}
          handleColorChange={handleColorChange}
        />
        <ProductRightbar
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
    </PageContainer>
  );
}
