import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import ProductSidebar from "./components/ProductSidebar";
import ProductRightbar from "./components/ProductRightbar";
import { Link } from "react-router-dom";
const items = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
];

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
    setSelectedFilters((prev) => ({
      ...prev,
      color,
    }));
  };

  return (
    <PageContainer>
      <div className="container mx-auto mt-14 ">
        <nav className="text-xs mt-20" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {items.map((item, index) => (
              <li className="flex items-center gap-2" key={index}>
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className="text-gray-300">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-5 flex flex-col md:flex-row ">
          {/* Breadcrumbs */}

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
      </div>
    </PageContainer>
  );
}
