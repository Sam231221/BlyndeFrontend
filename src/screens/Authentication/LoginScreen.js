import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { login } from "../../actions/userActions";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const params = new URLSearchParams(window.location.search);
  /*
       Login Screen is used for 2 purpose.
       1.Logged the user and then sent to HomeScreen.
       2.Check if the url has querystring(i.e?redirect). If yes, user have
       come to this screen from CartScreen on clicking checkout button.
       Since the user wanna checkout without being logged in.So
       After logged in send them back to /shipping.
    */

  const redirect = params.get("redirect") ? params.get("redirect") : "/";
  console.log("?redirect=", redirect);

  useEffect(() => {
    if (userInfo && redirect == "/") {
      navigate("/");
    }
    if (userInfo && redirect == "shipping") {
      navigate("/" + redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer style={{"height":100+'vh'}}>
      <div className="form-signin shadow w-100 m-auto">
        <h3 className="mb-2">Walmart Sign In</h3>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className="mt-3" variant="primary">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
}

export default LoginScreen;
