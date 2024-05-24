import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endpoint } from "../../lib/api";
import { logout } from "../../actions/userActions";
import { HiOutlineXMark } from "react-icons/hi2";

import { RiUserReceived2Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

import { FaRegHeart } from "react-icons/fa6";

import clsx from "clsx";
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const location = useLocation();
  const [sideCartNav, setSideCartNav] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const showSideCartNav = () => {
    setSideCartNav(!sideCartNav);
  };
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  const logoutHandler = () => {
    dispatch(logout());
  };
  const redirect = useNavigate();
  const checkoutHandler = () => {
    redirect("/login?redirect=shipping");
  };
  return (
    <>
      <div className="bg-black flex text-sm text-medium justify-between text-gray-300 items-center h-11 px-4">
        <p className=" ">Free shipping for standard order over $100</p>
        <ul className="flex gap-2  align-items-center">
          <li>Help&FAQs</li>
        </ul>
      </div>
      <header
        className={clsx(
          "z-[997] h-14 fixed transition-all duration-500 w-full flex items-center",
          navbar
            ? "justify-between top-0 right-0 left-0 bg-white drop-shadow-lg"
            : "bg-transparent top-11"
        )}
      >
        <div className="w-full px-5 flex items-center ">
          <Link to="/">
            <h2 className="text-4xl mb-2 font-bold tracking-wide text-zinc-800">
              Anon
            </h2>
          </Link>

          <nav className="ml-10">
            <ul className="me-lg-5 text-xs flex items-center font-semibold gap-3">
              <li>
                <Link
                  to="/"
                  className={
                    splitLocation[1] === ""
                      ? "nav-link text-blue scrollto "
                      : "nav-link scrollto"
                  }
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className={
                    splitLocation[1] === "shop"
                      ? "nav-link text-blue scrollto "
                      : "nav-link scrollto"
                  }
                  to="/shop"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  className={
                    splitLocation[1] === "about-us"
                      ? "nav-link active scrollto "
                      : "nav-link scrollto"
                  }
                  to="/about-us/"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className={
                    splitLocation[1] === "contact-us"
                      ? "nav-link active scrollto "
                      : "nav-link scrollto"
                  }
                  to="/contact-us/"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* lefmost navitems */}

        <div className="flex px-5 align-items-center gap-3">
          {userInfo ? (
            <div className="dropdown mt-4 text-end">
              <button
                className="d-block link-dark text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  className="rounded-full w-[62px] h-[33px] object-cover"
                />
              </button>
              <ul className="dropdown-menu text-small">
                <li>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link to="/admin/userlist" className="dropdown-item">
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/productlist"
                        className="dropdown-item"
                        href="#"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="dropdown-item"
                        href="#"
                      >
                        Orders
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="ms-3 cursor-pointer">
                  <ion-icon
                    onClick={logoutHandler}
                    name="log-out-outline"
                    style={{ fontSize: 30 }}
                  ></ion-icon>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <RiUserReceived2Line size={25} />
            </Link>
          )}

          <div
            onClick={() => showSideCartNav()}
            className="relative cursor-pointer"
          >
            <FaCartShopping size={25} />
            <div className="absolute  aspect-square -top-3 -right-3 w-4 h-4 flex items-center justify-center text-white text-[12px] font-medium bg-[#717FE0]">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
          </div>

          <div className="relative cursor-pointer">
            <FaRegHeart size={25} />
            <div className="absolute  aspect-square -top-3 -right-3 w-4 h-4 flex items-center justify-center text-white text-[12px] font-medium bg-[#717FE0]">
              0
            </div>
          </div>
        </div>
      </header>
      <div
        className={`w-full h-full  bg-[#0000008f] z-[1999] transition-all duration-500 ease-in-out ${
          sideCartNav ? "fixed" : "hidden"
        }  top-0 `}
      >
        <div
          className={`w-80 h-full px-5 py-2 bg-white fixed  top-0 right-0 transition-all duration-500 ease-in-out ${
            sideCartNav ? "visible" : "invisible"
          } `}
        >
          <div className="flex mb-3 items-center justify-between text-zinc-800">
            <h1 className="text-2xl font-bold uppercase">Your cart</h1>
            <HiOutlineXMark
              onClick={() => showSideCartNav()}
              className="cursor-pointer hover:text-sky-600"
              size={35}
            />
          </div>

          <div className="h-[55vh] max-h-[55vh] overflow-y-auto">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="flex mb-3 justify-center items-center gap-3"
              >
                <img
                  src={`${endpoint}${item.thumbnail}`}
                  className="w-16 h-16 object-cover"
                  alt={item.name}
                />
                <div className="flex flex-col">
                  <h1 className="text-sm text-zinc-800 font-medium">
                    {item.name}
                  </h1>
                  <p className="text-xs text-zinc-400">
                    {item.quantity} x ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col mt-5">
            <h1 className="text-sm mb-3 mt-5 text-zinc-800 font-medium">
              Total:$
              {cartItems
                .reduce(
                  (accumulator, item) =>
                    accumulator + item.quantity * item.price,
                  0
                )
                .toFixed(2)}
            </h1>
            <div className="flex gap-3">
              <Link
                to="/cart/"
                className="rounded-full uppercase bg-zinc-900 text-white  font-medium text-sm px-3 py-2"
              >
                View Cart
              </Link>
              <button
                onClick={checkoutHandler}
                className="rounded-full uppercase bg-zinc-900 text-white  font-medium text-sm px-3 py-2"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
