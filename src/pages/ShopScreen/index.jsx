import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import ProductSidebar from "./components/ProductSidebar";
import ProductRightbar from "./components/ProductRightbar";

export default function ShopScreen() {
  const [selectedCategories, setSelectedCategories] = useState(null);
  const handleChange = (event) => {
    if (event.target) {
      setSelectedCategories(event.target.value);
    } else {
      setSelectedCategories((event[1] - event[0]).toString());
    }
  };

  return (
    <PageContainer>
      <div className="mt-14  flex flex-col md:flex-row ">
        <ProductSidebar handleChange={handleChange} />
        <ProductRightbar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
    </PageContainer>
  );
}
