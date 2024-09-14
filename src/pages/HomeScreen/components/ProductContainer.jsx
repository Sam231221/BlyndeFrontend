import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../../lib/api";
import { addToWishList } from "../../../redux/actions/userActions";
import { addToCart } from "../../../redux/actions/cartAction";
import ProductGridShowCase from "../../../components/reusables/ProductGridShowCase";
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
    <div className="container mx-auto my-12">
      {/* New Products */}
      <h2 className="text-2xl md:text-3xl my-2 text-center  font-semibold text-zinc-900">
        New Products
      </h2>
      <p className="text-zinc-500 mb-5  text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
      <ProductGridShowCase
        addToCartHandler={addToCartHandler}
        addToWishlistHandler={addToWishlistHandler}
        products={recentProducts}
      />
    </div>
  );
}
