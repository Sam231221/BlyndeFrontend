import React, { useState, useEffect } from "react";

// interface Product {
//   id: number
//   title: string
//   price: number
//   image: string
// }

export default function ProductGallery() {
  const [products, setProducts] = useState([]);
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
  // React.SyntheticEvent<HTMLImageElement, Event>
  const handleImageError = (event) => {
    event.currentTarget.src =
      "https://via.placeholder.com/200x200?text=Image+Not+Found";
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Product Gallery
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Product Gallery
        </h1>
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Gallery</h1>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
                <p className="text-gray-600 mb-4">
                  ${product.price.toFixed(2)}
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
    </div>
  );
}
