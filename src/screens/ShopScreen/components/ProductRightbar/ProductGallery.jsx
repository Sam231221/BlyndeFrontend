import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios, { endpoint } from "../../../../lib/api";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../../../ProductScreen/components/Rating";
import { RxDashboard } from "react-icons/rx";
import { CiCircleList } from "react-icons/ci";
export default function ProductGallery({
  selectedCategories,
  setSelectedCategories,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("/api/products/all/");
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(
          `An error occurred while fetching products: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const addToCartHandler = (id, quantity = 1) => {
    navigate(`/cart/?code=${id}&qty=${quantity}`);
  };
  function filteredData(products, selected) {
    let filteredProducts = [];

    // Applying selected filter
    if (selected) {
      filteredProducts = products.filter(
        ({ categories, colors, company, price, title }) =>
          categories.some(
            (col) => col.name.toLowerCase() === selected.toLowerCase()
          ) ||
          colors.some(
            (col) => col.name.toLowerCase() === selected.toLowerCase()
          ) ||
          company === selected ||
          price <= Number(selected) ||
          title === selected
      );
    }

    return filteredProducts.map(
      (
        {
          _id,
          thumbnail,
          image_albums,
          name,
          rating,
          numReviews,
          price,
          sale_price,
        },
        i
      ) => (
        <div key={i} className="showcase">
          <div className="showcase-banner">
            <img
              src={`${endpoint}${thumbnail}`}
              alt={name}
              className="product-img default"
              width="300"
            />
            <img
              src={`${endpoint}${image_albums[1]?.image}`}
              alt={name}
              className="product-img hover"
              width="300"
            />
            {sale_price && <p className="showcase-badge angle black">sale</p>}
            <div className="showcase-actions">
              <button className="btn-action">
                <ion-icon
                  name="heart-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="heart outline"
                ></ion-icon>
              </button>

              <Link to={`/product/${_id}`} className="btn-action">
                <ion-icon
                  name="eye-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="eye outline"
                ></ion-icon>
              </Link>
              <button className="btn-action">
                <ion-icon name="repeat-outline"></ion-icon>
              </button>
              <button
                onClick={() => addToCartHandler(_id)}
                className="btn-action"
              >
                <ion-icon
                  name="bag-add-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="bag add outline"
                ></ion-icon>
              </button>
            </div>
          </div>

          <div className="showcase-content">
            <Link to={`/product/${_id}`} className="showcase-category">
              <h3 className="showcase-title">{name}</h3>
            </Link>

            <Rating
              value={rating}
              text={`${numReviews} reviews`}
              color={"#F6A355"}
            />

            <div className="price-box">
              <p className="price">${price}</p>
              {sale_price && <del>${sale_price}</del>}
            </div>
          </div>
        </div>
      )
    );
  }

  const result = filteredData(products, selectedCategories);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [sortOption, setSortOption] = useState("popularity");

  // Sort products based on selected sort option
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "latest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "popularity":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
  }, [products, sortOption]);

  //Calculate total number of pages
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Calculate products for the current page
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, productsPerPage, sortedProducts]);

  // Memoize event handlers to avoid unnecessary re-renders
  const handleImageError = useCallback((e) => {
    e.target.src = "https://via.placeholder.com/200x200?text=Image+Not+Found";
  }, []);

  const handleProductsPerPageChange = useCallback((event) => {
    setProductsPerPage(Number(event.target.value));
  }, []);

  const handleSortChange = useCallback((event) => {
    setSortOption(event.target.value);
  }, []);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto  px-4">
      {/* filters */}
      <div className="flex text-xs font-medium items-center justify-between my-4">
        <div className="flex gap-2 items-center">
          <RxDashboard />
          <CiCircleList />
          <p>
            Showing {currentPage * productsPerPage - productsPerPage + 1}-
            {Math.min(currentPage * productsPerPage, sortedProducts.length)} of{" "}
            {sortedProducts.length} results
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <span>Show:</span>
            <select
              value={productsPerPage}
              onChange={handleProductsPerPageChange}
              className="focus:outline-none"
              id="productsPerPage"
            >
              <option value="8">8 Items</option>
              <option value="16">16 Items</option>
              <option value="32">32 Items</option>
              <option value="64">64 Items</option>
              <option value="128">128 Items</option>
            </select>
          </div>
          <select
            id="sortOption"
            value={sortOption}
            onChange={handleSortChange}
            className="focus:outline-none"
            name="sortProrducts"
          >
            <option value="popularity">Sort By Popularity</option>
            <option value="latest">Sort By Latest</option>
            <option value="price-low-high">Sort By Price: Low to High</option>
            <option value="price-high-low">Sort By Price: High to Low</option>
          </select>
        </div>
      </div>
      {currentProducts.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="product-container product-grid">
          {currentProducts.map(
            (
              {
                _id,
                thumbnail,
                image_albums,
                name,
                rating,
                numReviews,
                price,
                sale_price,
              },
              i
            ) => (
              <div key={i} className="showcase">
                <div className="showcase-banner">
                  <img
                    src={`${endpoint}${thumbnail}`}
                    alt={name}
                    className="product-img default"
                    width="300"
                    onError={handleImageError}
                  />
                  <img
                    src={`${endpoint}${image_albums[1]?.image}`}
                    alt={name}
                    className="product-img hover"
                    width="300"
                  />
                  {sale_price && (
                    <p className="showcase-badge angle black">sale</p>
                  )}
                  <div className="showcase-actions">
                    <button className="btn-action">
                      <ion-icon
                        name="heart-outline"
                        role="img"
                        className="md hydrated"
                        aria-label="heart outline"
                      ></ion-icon>
                    </button>

                    <Link to={`/product/${_id}`} className="btn-action">
                      <ion-icon
                        name="eye-outline"
                        role="img"
                        className="md hydrated"
                        aria-label="eye outline"
                      ></ion-icon>
                    </Link>
                    <button className="btn-action">
                      <ion-icon name="repeat-outline"></ion-icon>
                    </button>
                    <button
                      onClick={() => addToCartHandler(_id)}
                      className="btn-action"
                    >
                      <ion-icon
                        name="bag-add-outline"
                        role="img"
                        className="md hydrated"
                        aria-label="bag add outline"
                      ></ion-icon>
                    </button>
                  </div>
                </div>

                <div className="showcase-content">
                  <Link to={`/product/${_id}`} className="showcase-category">
                    <h3 className="showcase-title">{name}</h3>
                  </Link>

                  <Rating
                    color={"#fc8c04"}
                    fontSize="14px"
                    value={rating}
                    text={`${numReviews} reviews`}
                  />

                  <div className="price-box">
                    <p className="price">${price}</p>
                    {sale_price && <del>${sale_price}</del>}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-2 border border-gray-300 text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-blue-50 text-blue-600"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
