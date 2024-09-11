import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import ProductSidebar from "./components/ProductSidebar";
import ProductContainer from "./components/ProductContainer";

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
      <div className="mt-14 min-h-[1000px] flex flex-col md:flex-row ">
        <ProductSidebar handleChange={handleChange} />
        <ProductContainer
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
    </PageContainer>
  );
}
