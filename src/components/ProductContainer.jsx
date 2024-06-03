import React from "react";
import { useEffect } from "react";
import bn1 from "../assets/images/banner-01.jpg";
import bn2 from "../assets/images/banner-02.jpg";
import bn3 from "../assets/images/banner-03.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

import { useDispatch } from "react-redux";
import Rating from "./Rating";
import axios, { endpoint } from "../lib/api";
export default function ProductContainer() {
  const [recentProducts, SetRecentProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadRecentProducts = async () => {
    const { data } = await axios.get(`/api/products/recents/`);
    SetRecentProducts(data);
  };

  const addToCartHandler = (id, quantity = 1) => {
    navigate(`/cart/?code=${id}&qty=${quantity}`);
  };

  useEffect(() => {
    loadRecentProducts();
  }, []);

  return (
    <div className="container-lg mx-auto my-8">
      {/* Banner */}

      <div className="flex flex-wrap gap-3 ">
        <div className="flex-1 group z-[10]   cursor-pointer relative border shadow-sm h-[250px]  rounded-lg">
          <img src={bn1} className="w-full h-full " alt="" />

          <div className="z-[5] group-hover:bg-[#4a21ff9c]  absolute w-full h-full left-0 top-0">
            <div className="pt-3 pl-8">
              <h1 className="text-2xl font-bold tracking-wider group-hover:text-white text-zinc-900">
                Women
              </h1>
              <p className="text-sm group-hover:text-white text-zinc-500 mt-2">
                Spring 2018
              </p>
            </div>
            <div className="pt-3 pl-8 absolute bottom-8 hidden group-hover:block text-white uppercase font-semibold text-sm">
              <p>Shop Now</p>
            </div>
          </div>
        </div>
        <div className="flex-1 group z-[10]   cursor-pointer relative border shadow-sm h-[250px]  rounded-lg">
          <img src={bn2} className="w-full h-full " alt="" />

          <div className="z-[5] group-hover:bg-[#4a21ff9c]  absolute w-full h-full left-0 top-0">
            <div className="pt-3 pl-8">
              <h1 className="text-2xl font-bold tracking-wider group-hover:text-white text-zinc-900">
                Men
              </h1>
              <p className="text-sm group-hover:text-white text-zinc-500 mt-2">
                Spring 2018
              </p>
            </div>
            <div className="pt-3 pl-8 absolute bottom-8 hidden group-hover:block text-white uppercase font-semibold text-sm">
              <p>Shop Now</p>
            </div>
          </div>
        </div>
        <div className="flex-1 group z-[10]   cursor-pointer relative border shadow-sm h-[250px]  rounded-lg">
          <img src={bn3} className="w-full h-full " alt="" />

          <div className="z-[5] group-hover:bg-[#4a21ff9c]  absolute w-full h-full left-0 top-0">
            <div className="pt-3 pl-8">
              <h1 className="text-2xl font-bold tracking-wider group-hover:text-white text-zinc-900">
                Accessories
              </h1>
              <p className="text-sm group-hover:text-white text-zinc-500 mt-2">
                New Trend
              </p>
            </div>
            <div className="pt-3 pl-8 absolute bottom-8 hidden group-hover:block text-white uppercase font-semibold text-sm">
              <p>Shop Now</p>
            </div>
          </div>
        </div>
      </div>
      {/* New Products */}
      <div className=" my-10">
        <h2 className="text-3xl my-4 uppercase font-bold text-zinc-800">
          New Products
        </h2>

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
                  <button className="btn-action">
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
                  <p className="price">${product.price}</p>
                  {product.sale_price && <del>${product.sale_price}</del>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
