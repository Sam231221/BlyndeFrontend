import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

import PageContainer from "../components/PageContainer";
import FormContainer from "../components/FormContainer";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <PageContainer>
      <div className="container mt-10">
        <FormContainer>
          <div className="form-signin mb-4 shadow w-100 m-auto">
            <CheckoutSteps step1 step2 step3 />

            <form className="px-16" onSubmit={submitHandler}>
              <div>
                <h1 className=" text-lg font-medium">Select Method</h1>
                <div className="flex gap-2 items-center">
                  <label
                    className="text-sm p-2 font-semibold  text-zinc-700"
                    htmlFor=""
                  >
                    PayPal or Credit Card
                  </label>
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                </div>
              </div>

              <button
                className="rounded-full uppercase bg-zinc-800 hover:bg-sky-600 my-4 text-white  font-medium text-sm px-3 py-2"
                type="submit"
              >
                Continue
              </button>
            </form>
          </div>
        </FormContainer>
      </div>
    </PageContainer>
  );
}

export default PaymentScreen;
