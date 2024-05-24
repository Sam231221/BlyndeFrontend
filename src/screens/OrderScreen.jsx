import React, { useState, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../components/Loader";
import { Message } from "../components/Message";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";

import {
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
} from "../reducers/Order/OrderPaySlice";
import Moment from "moment";

import PageContainer from "../components/PageContainer";
import { endpoint } from "../lib/api";

export default function OrderScreen() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const redirect = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let finalOrder = {};
  if (!loading && !error) {
    finalOrder = {
      ...order,
      itemsPrice: order.orderItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2),
    };
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUpg7Hgv4nw9CDxWQjKj8AJF4bUTShD8dYs1zXAdLI8HgtQNZ9RuHpOtWfhdfcBrcZVrngZzf9MiRvDG&disable-funding=credit";
    script.async = true;

    setSdkReady(true);

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      redirect("/login");
    }
    if (!order || successPay || order._id !== id || successDeliver) {
      dispatch(ORDER_PAY_RESET());
      // dispatch(ORDER_DELIVERY_RESET())
      dispatch(getOrderDetails(id));
    } //if order is not paid yet
    else if (!order.isPaid) {
      //if no paypal has been added yet
      addPayPalScript();
    }
  }, [dispatch, id]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
    alert("Payment Completed!");
    window.location.reload();
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    alert("Order Delivery Completed!");
    window.location.reload();
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <PageContainer>
      <div className="container-lg mx-auto mt-16">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 md:flex-[3_1_0%] shadow p-2 m-2">
            <h1 className="text-2xl ml-3 mt-4 text-zinc-800 font-bold">
              Order No: {order._id}
            </h1>

            <div className="mx-5">
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Name:
                </label>
                <span>{order.user.name}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Email:
                </label>
                <span>{order.user.email}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Address:
                </label>
                <span>{order.shippingAddress.address}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  City:
                </label>
                <span>{order.shippingAddress.city}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Postal Code:
                </label>
                <span>{order.shippingAddress.postalCode}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Country:
                </label>
                <span>{order.shippingAddress.country}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Method:
                </label>
                <span>{order.paymentMethod}</span>
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {Moment(order.paidAt).format("MMMM Do YYYY, h:mm a")}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
              <div className="my-2">
                <h1 className="text-lg font-medium">Order Items</h1>
                {order.orderItems.length === 0 ? (
                  <Message variant="info">Order is empty</Message>
                ) : (
                  <div>
                    {order.orderItems.map((item, index) => (
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
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 md:flex-[1_1_0%]">
            <div className="shadow p-2 m-2">
              <h1 className="text-2xl text-zinc-800 font-bold">
                Order Summary
              </h1>
              <div className="px-5">
                <p className="text-sm my-1">
                  <label className=" font-medium mr-3" htmlFor="">
                    Items:
                  </label>
                  <span>${finalOrder.itemsPrice}</span>
                </p>

                <p className="text-sm my-1">
                  <label className=" font-medium mr-3" htmlFor="">
                    Shipping:
                  </label>
                  <span>${order.shippingPrice}</span>
                </p>

                <p className="text-sm my-1">
                  <label className=" font-medium mr-3" htmlFor="">
                    Tax:
                  </label>
                  <span>${order.taxPrice}</span>
                </p>

                <p className="text-sm my-1">
                  <label className=" font-medium mr-3" htmlFor="">
                    Total:
                  </label>
                  <span>${order.totalPrice}</span>
                </p>

                {!order.isPaid && (
                  <div>
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  </div>
                )}
              </div>
            </div>
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div className="mb-3 ms-2">
                  <button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
