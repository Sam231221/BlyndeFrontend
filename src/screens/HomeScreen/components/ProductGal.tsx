import React, { useState, useEffect, useMemo } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  date: string;
  popularity: number;
}

// const products: Product[] = [
//   {
//     id: 1,
//     title: "Leather Backpack",
//     price: 79.99,
//     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     description: "Stylish and durable leather backpack for everyday use",
//     date: "2023-05-15",
//     popularity: 4.5,
//   },
//   {
//     id: 2,
//     title: "Wireless Earbuds",
//     price: 129.99,
//     image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
//     description: "High-quality wireless earbuds with noise cancellation",
//     date: "2023-06-20",
//     popularity: 4.8,
//   },
//   {
//     id: 3,
//     title: "Smart Watch",
//     price: 199.99,
//     image: "https://fakestoreapi.com/img/71Yp4bouoDL._AC_UY879_.jpg",
//     description: "Feature-packed smartwatch with health tracking capabilities",
//     date: "2023-04-10",
//     popularity: 4.2,
//   },
//   {
//     id: 4,
//     title: "Portable Charger",
//     price: 49.99,
//     image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
//     description: "High-capacity portable charger for all your devices",
//     date: "2023-07-05",
//     popularity: 4.6,
//   },
//   {
//     id: 5,
//     title: "Sunglasses",
//     price: 89.99,
//     image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
//     description: "Stylish sunglasses with UV protection",
//     date: "2023-05-30",
//     popularity: 4.3,
//   },
//   {
//     id: 6,
//     title: "Fitness Tracker",
//     price: 79.99,
//     image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
//     description: "Advanced fitness tracker with heart rate monitoring",
//     date: "2023-06-15",
//     popularity: 4.7,
//   },
//   {
//     id: 7,
//     title: "Wireless Mouse",
//     price: 29.99,
//     image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//     description: "Ergonomic wireless mouse for comfortable use",
//     date: "2023-07-10",
//     popularity: 4.4,
//   },
//   {
//     id: 8,
//     title: "Bluetooth Speaker",
//     price: 59.99,
//     image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//     description: "Portable Bluetooth speaker with excellent sound quality",
//     date: "2023-05-25",
//     popularity: 4.9,
//   },
//   {
//     id: 9,
//     title: "Laptop Stand",
//     price: 39.99,
//     image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
//     description: "Adjustable laptop stand for improved ergonomics",
//     date: "2023-06-30",
//     popularity: 4.1,
//   },
//   {
//     id: 10,
//     title: "Wireless Keyboard",
//     price: 49.99,
//     image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//     description: "Slim wireless keyboard with long battery life",
//     date: "2023-07-20",
//     popularity: 4.6,
//   },
// ];

type SortOption = "price-low-high" | "price-high-low" | "latest" | "popularity";

export default function ProductGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [sortOption, setSortOption] = useState<SortOption>("popularity");

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
  }, [sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [productsPerPage, sortOption]);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src =
      "https://via.placeholder.com/200x200?text=Image+Not+Found";
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleProductsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProductsPerPage(Number(event.target.value));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Gallery</h1>
      <div className="bg-gray-100 rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <p className="text-gray-700 mb-2 sm:mb-0">
            Showing {indexOfFirstProduct + 1}-
            {Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
            {sortedProducts.length} products
          </p>
          <p className="text-gray-600">
            {currentProducts.length} products on this page
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center">
          <div className="mb-2 sm:mb-0 sm:mr-4">
            <label htmlFor="productsPerPage" className="text-gray-700 mr-2">
              Products per page:
            </label>
            <select
              id="productsPerPage"
              value={productsPerPage}
              onChange={handleProductsPerPageChange}
              className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortOption" className="text-gray-700 mr-2">
              Sort by:
            </label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={handleSortChange}
              className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="latest">Latest</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      </div>
      {currentProducts.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4 rounded-md"
                  onError={handleImageError}
                />
                <h2 className="text-lg font-semibold mb-2 text-gray-800 truncate">
                  {product.title}
                </h2>
                <p className="text-gray-600 mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="px-4 pb-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
