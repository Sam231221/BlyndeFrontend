import { Link } from "react-router-dom";
import { MdOutlineZoomOutMap } from "react-icons/md";
import ProductImageTransition from "./ProductImageTransition";
import Rating from "../Rating";
import ProductColorSelect from "../../../pages/ProductScreen/components/ProductColorSelect";
import SizeVariant from "../../../pages/ProductScreen/components/SizeVariant";
import {
  PiGlobeThin,
  PiHeartStraightLight,
  PiShareNetworkLight,
} from "react-icons/pi";
import ProductPriceInput from "../../../pages/ProductScreen/components/ProductPriceInput";
import { addToCart } from "../../../redux/actions/cartAction";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductGridShowCase({
  showtype = "grid",
  products,
  productheight,
  addToWishlistHandler,
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    quantity: 1,
    color: "",
    size: "",
  });
  const handleQuantityChange = (quantity) => {
    setData((prev) => ({ ...prev, quantity }));
  };
  const handleColorChange = (color) => {
    setData((prev) => ({ ...prev, color }));
  };
  const handleSizeChange = (size) => {
    setData((prev) => ({ ...prev, size }));
  };
  const addToCartHandler = (id) => {
    const { quantity, size, color } = data;
    if (id && quantity && size && color) {
      dispatch(addToCart(id, quantity, size, color));
    } else {
      alert("Please select size and color");
    }
  };

  return (
    <>
      {showtype === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <div
              key={i}
              className="group border border-gray-200 overflow-hidden transition-all duration-200 ease-in"
            >
              <div className="relative h-[400px]">
                <ProductImageTransition
                  name={product.name}
                  img_albums={product.image_albums}
                />
                {product.sale_price ? (
                  <p
                    className={`absolute font-medium z-[3]  rounded-sm  text-white text-[12px]  bg-black top-[8px] px-10 py-1 left-[-29px] captialize -rotate-45  ${
                      product.priceBadge === "blue" && "bg-blue-500 px-3 py-1"
                    }`}
                  >
                    <span className="mr-4">{`${Math.floor(
                      product.discount_percentage
                    )}% Off`}</span>
                  </p>
                ) : (
                  <>
                    {product.badge && (
                      <>
                        <p
                          className={`absolute top-[15px] font-medium left-[15px] z-[3]  rounded-sm py-1 text-white text-[12px]  ${
                            product.badge === "Featured" &&
                            "bg-blue-400 px-3 py-1"
                          } ${
                            product.badge === "Top Rated" &&
                            "bg-green-500 px-3 py-1"
                          }`}
                        >
                          {product.badge}
                        </p>
                      </>
                    )}
                  </>
                )}
                {/* Product Actions */}
                <div className="absolute flex flex-col top-3 right-3 text-lg  transition-all duration-200 ease-in-out z-[3] translate-x-14 group-hover:translate-x-0  ">
                  <div className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                    <ion-icon
                      name="heart-outline"
                      role="img"
                      className="md hydrated"
                      aria-label="heart outline"
                    ></ion-icon>
                  </div>
                  <div className="flex justify-center items-center w-10 h-10 bg-white mb-2 py-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                    <MdOutlineZoomOutMap size={15} />
                  </div>
                  <Link
                    to={`/product/${product._id}`}
                    className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
                  >
                    <ion-icon
                      name="eye-outline"
                      role="img"
                      className="md hydrated"
                      aria-label="eye outline"
                    ></ion-icon>
                  </Link>
                  <button className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                    <ion-icon name="repeat-outline"></ion-icon>
                  </button>
                </div>
              </div>

              <div className="px-3 py-1">
                <Link
                  to={`/product/${product._id}`}
                  className="uppercase font-medium"
                >
                  <h3 className="text-gray-800 text-sm capitalize duration-200 ease-in-out font-medium">
                    {product.name}
                  </h3>
                </Link>

                <Rating
                  color={"#fc8c04"}
                  fontSize="14px"
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                <div className="flex px-1 gap-3 text-gray-800 mb-2 text-sm">
                  <p className="font-bold">${product.price}</p>
                  {product.sale_price && (
                    <del className="text-gray-400">${product.sale_price}</del>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showtype === "list" && (
        <div className={`relative`}>
          {products.map((product, i) => (
            <div
              key={i}
              className="group flex flex-col sm:flex-row  gap-2 mb-3 border border-gray-200 overflow-hidden transition-all duration-200 ease-in"
            >
              <div className="container">
                <div className={`relative w-full h-full overflow-hidden  `}>
                  <ProductImageTransition
                    name={product.name}
                    img_albums={product.image_albums}
                  />
                  {product.sale_price ? (
                    <p
                      className={`absolute font-medium  z-[3]  rounded-sm  text-white text-[12px]  bg-black top-[8px] px-10 py-1 left-[-29px] captialize -rotate-45  ${
                        product.priceBadge === "blue" && "bg-blue-500 px-3 py-1"
                      }`}
                    >
                      <span className="mr-4">{`${Math.floor(
                        product.discount_percentage
                      )}% Off`}</span>
                    </p>
                  ) : (
                    <>
                      {product.badge && (
                        <>
                          <p
                            className={`absolute top-[15px] font-medium left-[15px] z-[3]  rounded-sm py-1 text-white text-[12px]  ${
                              product.badge === "Featured" &&
                              "bg-blue-400 px-3 py-1"
                            } ${
                              product.badge === "Top Rated" &&
                              "bg-green-500 px-3 py-1"
                            }`}
                          >
                            {product.badge}
                          </p>
                        </>
                      )}
                    </>
                  )}
                  {/* Product Actions */}
                  <div className="absolute flex flex-col top-3 right-3 text-lg  transition-all duration-200 ease-in-out z-[3] translate-x-14 group-hover:translate-x-0 ">
                    <div className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                      <ion-icon
                        name="heart-outline"
                        role="img"
                        className="md hydrated"
                        aria-label="heart outline"
                      ></ion-icon>
                    </div>
                    <div className="flex justify-center items-center w-10 h-10 bg-white mb-2 py-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                      <MdOutlineZoomOutMap size={15} />
                    </div>
                    <Link
                      to={`/product/${product._id}`}
                      className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800"
                    >
                      <ion-icon
                        name="eye-outline"
                        role="img"
                        className="md hydrated"
                        aria-label="eye outline"
                      ></ion-icon>
                    </Link>
                    <button className="flex justify-center items-center w-10 h-10 bg-white mb-2 text-gray-400 border border-zinc-200  transition-all duration-200 ease-in-out rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-800">
                      <ion-icon name="repeat-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>

              <div className="container px-10 py-10">
                <h2 className="text-zinc-800 font-semibold text-2xl">
                  {product.name}
                </h2>
                <div className="flex gap-2 items-center">
                  <Rating
                    fontSize={12}
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#fc8c04"}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  {product.sale_price ? (
                    <>
                      <del className="text-gray-300  tracking-wide text-lg my-2 ">
                        ${product.price}
                      </del>
                      <p className="text-slate-800 font-medium tracking-wide text-lg my-2 ">
                        ${product.sale_price}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-800 font-medium tracking-wide text-lg my-2 ">
                        ${product.price}
                      </p>
                    </>
                  )}
                </div>

                {product.description && (
                  <p className="text-zinc-800 font-medium tracking-wide text-[12px] my-2 ">
                    {product.description}
                  </p>
                )}
                {product.colors && (
                  <ProductColorSelect
                    handleColorChange={handleColorChange}
                    colors={product.colors}
                  />
                )}
                {product.size && (
                  <SizeVariant
                    handleSizeChange={handleSizeChange}
                    sizes={product.size}
                  />
                )}
                <span className="bg-slate-100 mt-4 inline-block px-3 text-xs font-semibold text-green-600 rounded-lg p-2">
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <div className="flex mt-3 gap-2 items-center">
                  {product.countInStock > 0 && (
                    <ProductPriceInput handleChange={handleQuantityChange} />
                  )}

                  <button
                    onClick={() => addToCartHandler(product._id)}
                    className="bg-sky-500 w-full font-medium hover:bg-sky-600 text-white py-2 px-4"
                    disabled={product.countInStock <= 0}
                    type="button"
                  >
                    {" "}
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
