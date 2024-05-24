import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";

import ProductSidebar from "./components/ProductSidebar";

import Nav from "./components/ProductNavbar/Nav";
import axios, { endpoint } from "../../lib/api";
import Rating from "../../components/Rating";
import { Link, useNavigate } from "react-router-dom";
const MIN = 0;
const MAX = 500;
export default function ShopScreen() {
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
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    if (event.target) {
      setSelectedCategory(event.target.value);
    } else {
      setSelectedCategory((event[1] - event[0]).toString());
    }
  };

  // ------------ Button Filtering -----------
  const handleCategoryClick = (event) => {
    setSelectedCategory(event.target.value);
  };

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

  const result = filteredData(products, selectedCategory, query);

  return (
    <PageContainer>
      <div className="mt-10 flex flex-col md:flex-row">
        <ProductSidebar min={MIN} max={MAX} handleChange={handleChange} />
        <div className="flex-1 mt-10">
          <Nav
            query={query}
            handleCategoryClick={handleCategoryClick}
            handleInputChange={handleInputChange}
          />

          <section className="product-container product-grid p-4">
            {result}
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
