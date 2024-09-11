import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import PageContainer from "../../components/PageContainer";
import { endpoint } from "../../lib/api";
import { listProductDetails } from "../../actions/productActions";
import ProductSlider from "./components/ProductSlider/ProductSlider";
import ProductPriceInput from "./components/ProductPriceInput";
import ProductColorSelect from "./components/ProductColorSelect";
import SizeVariant from "./components/SizeVariant";
import Rating from "./components/Rating";

import {
  PiGlobeThin,
  PiHeartStraightLight,
  PiShareNetworkLight,
} from "react-icons/pi";
import Reviews from "./components/Reviews";

export default function ProductScreen() {
  const sizes = [
    { size: "XS", stock: 10 },
    { size: "M", stock: 5 },
    { size: "L", stock: 12 },
    { size: "XL", stock: 23 },
  ];
  const colors = [
    { hexcode: "#fff", name: "White", stock: 10 },
    { hexcode: "#000", name: "Black", stock: 5 },
    { hexcode: "#ff0000", name: "Red", stock: 12 },
    { hexcode: "#00ff22", name: "Green", stock: 23 },
  ];
  const items = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
  ];
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  //select a particular state i.e productList state which is an obj
  const productDetail = useSelector((state) => state.productDetails);

  const { error, loading, product } = productDetail;
  console.log(product);
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  //pass thequantity and id, we 'll then navigate to CartScreen Component.
  const addToCartHandler = () => {
    navigate(`/cart/?code=${id}&qty=${quantity}`);
  };

  return (
    <PageContainer>
      <div className="container mx-auto mt-24">
        <nav className="text-xs mt-3" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {items.map((item, index) => (
              <li className="flex items-center gap-2" key={index}>
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className="text-gray-300">/</span>
                )}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              <Link
                to={`/product/${product._id}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {product.name}
              </Link>
            </li>
          </ol>
        </nav>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
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
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    {product.on_sale ? (
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
                  <ProductColorSelect colors={colors} />
                  <SizeVariant sizes={sizes} />
                  <span className="bg-slate-100 my-3  px-3 text-xs font-semibold text-green-600 rounded-lg p-2">
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  <div className="flex gap-2 items-center">
                    {product.countInStock > 0 && <ProductPriceInput />}

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
            <div>
              <Reviews />
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
