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
          className="bg-sky-500 inline font-medium hover:bg-sky-600 text-white py-1 px-4"
        >
          Go Back
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="flex my-8 flex-col md:flex-row md:h-screen gap-2">
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
            <div className="md:flex-1 lg:flex-[1.5] ">
              <div>
                <h2 className="text-zinc-800 font-semibold text-2xl">
                  {product.name}
                </h2>
                {product.description && (
                  <p className="text-slate-600 prose tracking-wide text-xs my-2 ">
                    {product.description}
                  </p>
                )}

                <p className="text-slate-600 prose tracking-wide text-xs my-2 ">
                  Ratings:{" "}
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#fc8c04"}
                  />
                </p>

                <p className="text-slate-600 prose tracking-wide text-xs my-2 ">
                  Price: ${product.price}
                </p>
              </div>
            </div>

            <div className="md:flex-1 lg:flex-[1]">
              <div className="flex flex-col">
                {product.countInStock > 0 && (
                  <div className="w-full flex items-center gap-3 max-w-xs">
                    <label
                      htmlFor="select"
                      className="text-slate-600 prose tracking-wide text-xs my-2 "
                    >
                      Qty:
                    </label>
                    <div className="relative">
                      <select
                        id="select"
                        name="select"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

                <div className="flex text-slate-600 prose tracking-wide text-xs my-2 ">
                  <div> Status: </div>
                  <div>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </div>
                </div>

                {/* {product.countInStock == 0} returns booleand value */}

                <button
                  onClick={addToCartHandler}
                  className="bg-sky-500 font-medium hover:bg-sky-600 text-white py-2 px-4"
                  disabled={product.countInStock <= 0}
                  type="button"
                >
                  {" "}
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
