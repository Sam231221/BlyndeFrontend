import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import PageContainer from "../../components/PageContainer";
import ProductSlider from "./components/ProductSlider/ProductSlider";
import ProductPriceInput from "./components/ProductPriceInput";
import ProductColorSelect from "./components/ProductColorSelect";
import SizeVariant from "./components/SizeVariant";
import Rating from "../../components/reusables/Rating";
import { endpoint } from "../../lib/api";
import { listProductDetails } from "../../redux/actions/productActions";
import {
  PiGlobeThin,
  PiHeartStraightLight,
  PiShareNetworkLight,
} from "react-icons/pi";
import Reviews from "./components/Reviews";
import { addToCart } from "../../redux/actions/cartAction";

export default function ProductScreen() {
  const items = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
  ];
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
  const dispatch = useDispatch();
  const { id } = useParams();

  //select a particular state i.e productList state which is an obj
  const productDetail = useSelector((state) => state.productDetails);

  const { error, loading, product } = productDetail;
  console.log(product);
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = (id) => {
    const { quantity, size, color } = data;
    if (product._id === id && quantity && size && color) {
      dispatch(addToCart(product._id, quantity, size, color));
    } else {
      alert("Please select size and color");
    }
  };

  return (
    <PageContainer>
      <div className="container mx-auto mt-24">
        {/* Breadcrumbs */}
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
              {/* ProductSlider*/}
              <div className="md:flex-1 lg:flex-[3] ">
                {product.image_albums && (
                  <ProductSlider>
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

              {/* Rightbar */}
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

                  {/* {product.countInStock == 0} returns booleand value */}
                  <div className="flex my-2 justify-between items-center">
                    <a
                      href="#"
                      className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-sm my-2"
                    >
                      <PiGlobeThin size={20} />
                      <span>Size Guide</span>
                    </a>{" "}
                    <a
                      href="#"
                      className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-sm my-2"
                    >
                      <PiHeartStraightLight size={20} />
                      <span>Add to Wishlist</span>
                    </a>
                    <a
                      href="#"
                      className="text-zinc-800 flex items-center gap-2 font-medium tracking-wide text-sm my-2"
                    >
                      <PiShareNetworkLight size={20} />
                      <span>Share this Product</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Reviews />
          </>
        )}
      </div>
    </PageContainer>
  );
}
