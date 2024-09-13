import { Link } from "react-router-dom";
import ProductImageTransition from "./ProductImageTransition";
import Rating from "../Rating";

export default function ProductGridShowCase({
  products,
  addToCartHandler,
  addToWishlistHandler,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, i) => (
        <>
          <div
            key={i}
            className="group border border-gray-200 overflow-hidden transition-all duration-200 ease-in"
          >
            <div className="relative h-[300px] ">
              <ProductImageTransition
                name={product.name}
                img_albums={product.image_albums}
              />
              {product.sale_price && (
                <p
                  className={`absolute top-[15px] font-medium left-[15px] z-[3]  rounded-sm py-1 text-white text-[12px]  ${
                    product.priceBadge === "angle" &&
                    "bg-black top-[8px] px-10 py-1 left-[-29px] uppercase -rotate-45 "
                  } ${
                    product.priceBadge === "blue" && "bg-blue-500 px-3 py-1"
                  }`}
                >
                  Sale
                </p>
              )}
              <div className="absolute flex flex-col top-3 right-3 text-lg  transition-all duration-200 ease-in-out z-[3] translate-x-12 group-hover:translate-x-0 ">
                <Link
                  to={"#"}
                  className="bg-white mb-2 text-gray-400 border border-zinc-200 px-2 py-1 transition-all duration-200 ease-in-out rounded-sm hover:bg-gray-800 hover:text-white hover:border-gray-800"
                >
                  <ion-icon
                    name="heart-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="heart outline"
                  ></ion-icon>
                </Link>

                <Link
                  to={`/product/${product._id}`}
                  className="bg-white mb-2 text-gray-400 border border-zinc-200 px-2 py-1 transition-all duration-200 ease-in-out rounded-sm hover:bg-black hover:text-white hover:border-gray-800"
                >
                  <ion-icon
                    name="eye-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="eye outline"
                  ></ion-icon>
                </Link>
                <button className=" bg-white mb-2 text-gray-400 border border-zinc-200 px-2 py-1 transition-all duration-200 ease-in-out rounded-sm hover:bg-black hover:text-white hover:border-gray-800">
                  <ion-icon name="repeat-outline"></ion-icon>
                </button>
                <button
                  onClick={() => addToCartHandler(product._id)}
                  className=" bg-white mb-2 text-gray-400 border border-zinc-200 px-2 py-1 transition-all duration-200 ease-in-out rounded-sm hover:bg-black hover:text-white hover:border-gray-800"
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
        </>
      ))}
    </div>
  );
}
