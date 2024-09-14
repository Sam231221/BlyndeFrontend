import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Message } from "../components/Message";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import PageContainer from "../components/PageContainer";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const redirect = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userProfileUpdate);
  const { success } = userUpdateProfile;

  useEffect(() => {
    //if the user is not logged in

    if (!userInfo) {
      redirect("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        //calling http://127.0.0.1:8000/api/users/profile/ through the function.
        dispatch(getUserDetails("profile"));
      } else {
        //set the name and email to form field after getting user detail from /api/users/profile/.
        setName(user.name);
        setEmail(user.email);
      }
    }
    //only if user attribute of userDetails changes.
  }, [user, dispatch, redirect, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };
  return (
    <PageContainer>
      <div className="container-lg mx-auto mt-14 ">
        <div className="shadow my-4 mx-auto w-[500px] border py-3 px-4">
          <h2 className="text-2xl text-gray-800 font-semibold">User Profile</h2>

          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="mb-3 flex flex-col">
              <label className="text-sm mb-2 font-semibold  text-zinc-900">
                Name
              </label>
              <input
                required
                className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div className="mb-3 flex flex-col">
              <label className="text-sm mb-2 font-semibold  text-zinc-900">
                Email Address
              </label>
              <input
                className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div className="mb-3 flex flex-col">
              <label className="text-sm mb-2 font-semibold  text-zinc-900">
                Password
              </label>
              <input
                className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
                type="password"
                placeholder="Email address"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <div className="mb-3 flex flex-col">
              <label className="text-sm mb-2 font-semibold  text-zinc-900">
                Confirm Password
              </label>
              <input
                className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>

            <button
              type="submit"
              className="text-sm bg-sky-500 font-medium uppercase hover:bg-sky-600 text-white py-2 px-4"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

export default ProfileScreen;
