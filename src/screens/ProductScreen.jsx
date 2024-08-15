import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import ProductSlider from "../components/ProductSlider/ProductSlider";

import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import { Message } from "../components/Message";
import PageContainer from "../components/PageContainer";
import { endpoint } from "../lib/api";
import {
  PiGlobeThin,
  PiHeartStraightLight,
  PiShareNetworkLight,
} from "react-icons/pi";

export default function ProductScreen() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  //select a particular state i.e productList state which is an obj
  const productDetail = useSelector((state) => state.productDetails);

  const { error, loading, product } = productDetail;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  //pass thequantity and id, we 'll then navigate to CartScreen Component.
  const addToCartHandler = () => {
    navigate(`/cart/?code=${id}&qty=${quantity}`);
  };

  return (
    <PageContainer>
      <div className="container-lg mx-auto  mt-14">
        <Link
          to="/"
          className="bg-sky-500 inline font-medium hover:bg-sky-600 text-white py-2 px-4"
        >
          Go Back
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="flex my-8 flex-col md:flex-row md:h-screen gap-3">
            <div className="md:flex-1 lg:flex-[3] ">
              {/* */}
              {product.image_albums && (
                <ProductSlider>
                  {/* <img
                    src={`${endpoint}${product.thumbnail}`}
                    alt={product.name}
                  /> */}
                  {product.image_albums?.map((album, index) => (
                    <img
                      key={index}
                      src={`${endpoint}${album.image}`}
                      alt={album.image}
                    />
                  ))}
                </ProductSlider>
              )}
            </div>

            {/* Name */}
            <div className="md:flex-1 lg:flex-[2] ">
              <div>
                <h2 className="text-zinc-800 font-semibold text-2xl">
                  {product.name}
                </h2>
                <div className="flex gap-2 items-center">
                  <Rating
                    fontSize={12}
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#fc8c04"}
                  />{" "}
                  <span className="text-zinc-800 text-[12px] font-semibold">
                    {" "}
                    12 Reviews
                  </span>
                </div>
                <p className="text-slate-800 font-medium tracking-wide text-lg my-2 ">
                  ${product.price}
                </p>
                {product.description && (
                  <p className="text-zinc-800 font-medium tracking-wide text-[12px] my-2 ">
                    {product.description}
                  </p>
                )}

                <span className="bg-slate-100 my-2  px-3 text-xs font-semibold text-green-600 rounded-lg p-2">
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <div className="flex gap-2 items-center">
                  {product.countInStock > 0 && (
                    <div className="flex items-center gap-3 ">
                      <label
                        htmlFor="select"
                        className="text-slate-800 font-medium tracking-wide text-xs my-2 "
                      >
                        Qty:
                      </label>
                      <div className="relative">
                        <select
                          id="select"
                          name="select"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          {
                            //create ana arrya from obj.countInStock.
                            //[0,1,2]
                            [...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={addToCartHandler}
                    className="bg-sky-500 w-full font-medium hover:bg-sky-600 text-white py-2 px-4"
                    disabled={product.countInStock <= 0}
                    type="button"
                  >
                    {" "}
                    Add to Cart
                  </button>
                </div>
                {/* {product.countInStock == 0} returns booleand value */}
                <div className="flex my-2 justify-between items-center">
                  <a
                    href="#"
                    className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-[13px] my-2"
                  >
                    <PiGlobeThin size={20} />
                    <span>Size Guide</span>
                  </a>{" "}
                  <a
                    href="#"
                    className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-[13px] my-2"
                  >
                    <PiHeartStraightLight size={20} />
                    <span>Add to Wishlist</span>
                  </a>
                  <a
                    href="#"
                    className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-[13px] my-2"
                  >
                    <PiShareNetworkLight size={20} />
                    <span>Share this Product</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
