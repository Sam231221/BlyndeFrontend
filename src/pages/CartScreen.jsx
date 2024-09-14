import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

import {
  addToCart,
  removeFromCart,
  updateCart,
} from "../redux/actions/cartAction";
import { AiOutlineDelete } from "react-icons/ai";
import PageContainer from "../components/PageContainer";
import { endpoint } from "../lib/api";
import ProductPriceInput from "./ProductScreen/components/ProductPriceInput";
export default function CartScreen() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const handleChange = (val, id) => {
    dispatch(updateCart(id, val));
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    redirect("/login?redirect=shipping");
  };

  return (
    <PageContainer>
      <div className="container mx-auto py-2 overflow-auto mt-10">
        <div className="flex flex-wrap gap-3">
          <table className="table flex-1 md:flex-[3_1_0%] border w-full mt-4 mb-2">
            <thead className="bg-secondaryBgColor ">
              <tr className="uppercase text-zinc-700">
                <th className="p-2 text-sm font-semibold tracking-wide text-left">
                  S.N
                </th>
                <th className="p-2 text-sm font-semibold tracking-wide text-left">
                  Product
                </th>
                <th className="p-2 text-sm font-semibold tracking-wide text-left">
                  Price
                </th>
                <th className="p-2 text-sm font-semibold tracking-wide text-left">
                  Quantity
                </th>
                <th className="p-2 text-sm font-semibold tracking-wide text-left">
                  Total
                </th>
                <th className="p-2 text-sm font-semibold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product, i) => (
                <tr className="border-b " key={i + 1}>
                  <td className="p-2 text-center text-sm text-gray-700">
                    <a
                      className="text-primaryTextColor hover:text-secondaryTextColor"
                      href="#"
                    >
                      {i + 1}
                    </a>
                  </td>
                  <td className="p-2 border-b-0 text-sm  text-gray-700">
                    <img
                      src={`${endpoint}${product.thumbnail}`}
                      className="w-12 inline h-12 object-contain"
                    />
                    <span>{product.name}</span>
                  </td>

                  <td className="p-2   text-sm text-gray-700">
                    ${product.price}
                  </td>
                  <td className="p-2 text-sm text-gray-700">
                    <ProductPriceInput
                      id={product.productId}
                      qty={product.quantity}
                      handleChange={handleChange}
                    />
                    {/* <div className="w-[164px]  h-[45px] flex border radius-sm overflow-hidden">
                      <button className="py-2 px-3 hover:bg-sky-500 hover:text-white ">
                        <CgMathPlus size={20} />
                      </button>
                      <input
                        type="text"
                        value={product.quantity}
                        className="outline-none px-2 text-center bg-gray-200 h-full w-[calc(100%-10px)] "
                      />
                      <button className="py-2 px-3 hover:bg-sky-500 hover:text-white ">
                        <CgMathMinus size={20} />
                      </button>
                    </div> */}
                  </td>
                  <td className="p-2 text-sm text-gray-700">
                    ${(product.quantity * product.price).toFixed(2)}
                  </td>
                  <td className="p-2 text-xs text-center">
                    <AiOutlineDelete
                      onClick={() => removeFromCartHandler(product.productId)}
                      className="text-red-500 cursor-pointer"
                      size={20}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex-1 md:flex-[1_1_0%] border mt-4 mb-2  px-5 py-3">
            <h1 className="font-bold text-xl uppercase">Cart Totals</h1>
            <div className="m-3  ">
              {/* Calculate indiviual total price, cart total */}
              <div>
                <h2 className="font-medium text-sm my-3">
                  Total Items:
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  items
                </h2>
                <div className="border-t-[1px] border-dotted border-gray-400"></div>
                <h4 className="font-medium text-sm my-3">
                  Subtotal:${" "}
                  {cartItems
                    .reduce(
                      (accumulator, item) =>
                        accumulator + item.quantity * item.price,
                      0
                    )
                    .toFixed(2)}
                </h4>
              </div>

              <div>
                <button
                  type="button"
                  className="rounded-full w-full uppercase bg-zinc-800 hover:bg-sky-600 text-white  font-medium text-xs px-5 py-2"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
