import ProductBanner from "./components/ProductBanner";
import ProductGallery from "./components/ProductGallery";
export default function ProductRightbar({
  selectedCategories,
  setSelectedCategories,
}) {
  return (
    <div className="relative flex-1 mt-10">
      <ProductBanner />
      <ProductGallery
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
}
