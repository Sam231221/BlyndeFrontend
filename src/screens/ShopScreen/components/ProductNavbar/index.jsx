import Button from "../../../../components/Button";

const ProductNavbar = ({ handleInputChange, handleCategoryClick, query }) => {
  return (
    <>
      <nav className="flex border-b-[2px] border-[#f3f3f3] p-3 ml-2">
        <div className="text-sm w-full font-medium flex gap-2 items-center">
          <label htmlFor="query">Search:</label>
          <input
            id="query"
            className="relative w-full px-3 py-2 rounded-sm outline-none"
            type="text"
            onChange={handleInputChange}
            value={query}
            placeholder="Search for products, categories or brands..."
          />
        </div>
      </nav>
      <div className="ml-4 my-3">
        <h2 className=" text-lg font-semibold text-zinc-800">Recommended</h2>
        <div className="flex gap-3">
          <Button
            onClickHandler={handleCategoryClick}
            value=""
            title="All Products"
          />
          <Button
            onClickHandler={handleCategoryClick}
            value="Nike"
            title="Nike"
          />
          <Button
            onClickHandler={handleCategoryClick}
            value="Adidas"
            title="Adidas"
          />
          <Button
            onClickHandler={handleCategoryClick}
            value="Puma"
            title="Puma"
          />
          <Button
            onClickHandler={handleCategoryClick}
            value="Vans"
            title="Vans"
          />
        </div>
      </div>
    </>
  );
};

export default ProductNavbar;
