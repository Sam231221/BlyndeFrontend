const ProductNavbar = ({ handleInputChange, query }) => {
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
    </>
  );
};

export default ProductNavbar;
