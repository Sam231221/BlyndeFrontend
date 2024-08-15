import { useEffect } from "react";

import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import Rating from "../../../components/Rating";
import axios, { endpoint } from "../../../lib/api";
import { addToWishList } from "../../../actions/userActions";
import { addToCart } from "../../../actions/cartAction";
export default function ProductContainer() {
  const [recentProducts, SetRecentProducts] = useState([]);
  const dispatch = useDispatch();

  const loadRecentProducts = async () => {
    const { data } = await axios.get(`/api/products/recents/`);
    SetRecentProducts(data);
  };

  const addToCartHandler = (id, quantity = 1) => {
    dispatch(addToCart(id, quantity));
  };

  const addToWishlistHandler = (id) => {
    dispatch(addToWishList(id));
  };

  useEffect(() => {
    loadRecentProducts();
  }, []);

  return (
    <div className="container-lg mx-auto my-12">
      {/* New Products */}
      <h2 className="text-3xl my-2 text-center  font-semibold text-zinc-900">
        New Products
      </h2>
      <p className="text-zinc-500 mb-5  text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>

      <div className="product-container product-grid">
        {recentProducts.map((product, i) => (
          <div key={i} className="showcase">
            <div className="showcase-banner">
              <img
                src={`${endpoint}${product.thumbnail}`}
                alt={product.name}
                className="product-img default"
                width="300"
              />
              <img
                src={`${endpoint}${product.thumbnail}`}
                alt={product.name}
                className="product-img hover"
                width="300"
              />
              {product.sale_price && (
                <p className="showcase-badge angle black">sale</p>
              )}
              <div className="showcase-actions">
                <button
                  onClick={() => addToWishlistHandler(product._id)}
                  className="btn-action"
                >
                  <ion-icon
                    name="heart-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="heart outline"
                  ></ion-icon>
                </button>

                <Link to={`/product/${product._id}`} className="btn-action">
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
                  onClick={() => addToCartHandler(product._id)}
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
              <Link
                to={`/product/${product._id}`}
                className="showcase-category"
              >
                <h3 className="showcase-title">{product.name}</h3>
              </Link>

              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#F6A355"}
              />

              <div className="price-box">
                {product.on_sale ? (
                  <>
                    <p className="price">${product.sale_price}</p>
                    <del>${product.price}</del>
                  </>
                ) : (
                  <>
                    <p className="price">${product.price}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
