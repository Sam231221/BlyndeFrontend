import { useEffect, useState } from "react";
import ProductNavbar from "./ProductNavbar";
import axios, { endpoint } from "../../../../lib/api";
import Rating from "../../../ProductScreen/components/Rating";
import { Link, useNavigate } from "react-router-dom";
import ProductBanner from "./ProductBanner";
import { RxDashboard } from "react-icons/rx";
import { CiCircleList } from "react-icons/ci";
export default function ProductContainer({
  selectedCategories,
  setSelectedCategories,
}) {
  const [products, setProducts] = useState([]);
  const loadProducts = async () => {
    const { data } = await axios.get("/api/products/all/");
    setProducts(data);
  };

  const navigate = useNavigate();
  const addToCartHandler = (id, quantity = 1) => {
    navigate(`/cart/?code=${id}&qty=${quantity}`);
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const filteredItems = products.filter(
    (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleProductNavItemClick = (event) => {
    console.log(event.target.value);
    setSelectedCategories(event.target.value);
  };
  console.log(selectedCategories);
  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
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

  const result = filteredData(products, selectedCategories, query);

  return (
    <div className="relative flex-1 mt-10">
      <ProductBanner />
      <ProductNavbar query={query} handleInputChange={handleInputChange} />
      <section>
        {result.length > 0 ? (
          <>
            <div className="flex text-xs font-medium items-center justify-between my-4">
              <div className="flex gap-2 items-center">
                <RxDashboard />
                <CiCircleList />
                <p>Showing 1-16 of 23 results</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <span>Show:</span>
                  <select
                    className="focus:outline-none"
                    name="itemsCount"
                    id=""
                  >
                    <option value="16">16 Items</option>
                    <option value="32">32 Items</option>
                    <option value="64">64 Items</option>
                    <option value="128">128 Items</option>
                  </select>
                </div>
                <select
                  className="focus:outline-none"
                  name="sortProrducts"
                  id=""
                >
                  <option value="sortbypopularity">Sort By Popularity</option>
                  <option value="sortbylatest">Sort By Latest</option>
                  <option value="sortbyprice-lowtohigh">
                    Sort By Price: Low to High
                  </option>
                  <option value="sortbydate-hightolow">
                    Sort By Price: High to Low
                  </option>
                </select>
              </div>
            </div>
            <div className="product-container product-grid">{result}</div>
          </>
        ) : (
          <span>No products were found matching your selection.</span>
        )}
      </section>
    </div>
  );
}
