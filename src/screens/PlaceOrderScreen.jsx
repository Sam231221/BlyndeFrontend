import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../components/Message";
import PageContainer from "../components/PageContainer";

import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../reducers/Order/OrderCreateSlice";
import { endpoint } from "../lib/api";

function PlaceOrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  //since cart is not exstensible, we will use spread operator.
  // console.log(Object.isExtensible(cart))

  //FINALIZING AMOUNTS
  let itemsPrice = Number(
    Number(
      cart.cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(3)
    )
  );
  //You could set shipping price in backend too.
  let shippingPrice = Number(Number(itemsPrice > 100 ? 10 : 0).toFixed(3));
  let taxPrice = Number(Number(0.082 * itemsPrice).toFixed(3));
  let totalPrice = itemsPrice + shippingPrice + taxPrice;

  let FinalCart = {
    ...cart,
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
  };

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  useEffect(() => {
    //In backend order_views.getOrderById
    //a success variable is used to redirect to /order/:id
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(ORDER_CREATE_RESET());
    }
  }, [success, navigate, dispatch, order._id]);

  //on clicking PlaceOrderButton dispatch createOrder() that will also create Order Instance in backend
  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <PageContainer>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <div className="container-lg mt-16 mx-auto flex flex-wrap gap-3">
        <div className="flex-1 md:flex-[1_1_0%]">
          <div className="m-3 p-3 border shadow">
            <div>
              <h1 className="text-2xl text-zinc-700 font-semibold mb-3">
                Order Summary
              </h1>
            </div>
            <p className="text-sm my-1">
              <label className=" font-medium mr-3" htmlFor="">
                Items:
              </label>
              <span>${FinalCart.itemsPrice}</span>
            </p>

            <p className="text-sm my-1">
              <label className=" font-medium mr-3" htmlFor="">
                Shipping:
              </label>
              <span>${FinalCart.shippingPrice}</span>
            </p>

            <p className="text-sm my-1">
              <label className=" font-medium mr-3" htmlFor="">
                Tax:
              </label>
              <span>${FinalCart.taxPrice}</span>
            </p>

            <p className="text-sm my-1">
              <label className=" font-medium mr-3" htmlFor="">
                Total:
              </label>
              <span>${FinalCart.totalPrice}</span>
            </p>

            <div>{error && <Message variant="danger">{error}</Message>}</div>

            <div>
              <button
                type="button"
                className="rounded-full uppercase bg-zinc-800 hover:bg-sky-600 my-4 text-white  font-medium text-sm px-3 py-2"
                disabled={cart.cartItems === 0}
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 md:flex-[3_1_0%]">
          <div className="m-3 p-3 border shadow">
            <div>
              <h1 className="text-2xl text-zinc-700 font-semibold mb-3">
                Shipping Details
              </h1>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Address:
                </label>
                <span>{cart.shippingAddress.address}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  City:
                </label>
                <span>{cart.shippingAddress.city}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Postal Code:
                </label>
                <span>{cart.shippingAddress.postalCode}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Country:
                </label>
                <span>{cart.shippingAddress.country}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Method:
                </label>
                <span>{cart.paymentMethod}</span>
              </p>
            </div>

            <div>
              <h1 className="text-lg font-medium">Order Items</h1>
              <hr />
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <>
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div>
                        <img
                          className="w-14 h-14"
                          src={`${endpoint}${item.thumbnail}`}
                          alt={item.name}
                        />
                      </div>

                      <div>
                        <Link
                          className="nav-links link-dark"
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </div>

                      <div>
                        {item.quantity} X ${item.price} = $
                        {(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default PlaceOrderScreen;
