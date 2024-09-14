import ProductBanner from "./components/ProductBanner";
import ProductGallery from "./components/ProductGallery";
export default function ProductRightbar({
  selectedFilters,
  setSelectedFilters,
}) {
  return (
    <div className="relative p-2 flex-1 mt-10">
      <ProductBanner />
      <ProductGallery
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </div>
  );
}
