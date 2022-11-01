import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartAction'
import PageContainer from '../components/PageContainer'

export default function CartScreen() {
    const dispatch = useDispatch()
    const redirect = useNavigate()

    const params = new URLSearchParams(window.location.search);
    const qty = params.get("qty");
    const productId = params.get("code");
    console.log(productId,typeof(qty))

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log('cartItems:', cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    /*
    FOR CHECKOUT USER MUST BE LOGGED IN.
    -----------------------------
    First we check if user is logged in
    if yes then redirect to /shipping directly.
    if no , first redirect to /login page
    */

    const checkoutHandler = () => {
        redirect('/login?redirect=shipping')
    }

    return (
        <PageContainer>
            <Container>
                <Row>
                    <h4>Your Shopping Bag</h4>
                    <Col md={8}>

                        {cartItems.length === 0 ? (
                            <Message variant='info'>
                                Your cart is empty
                                <br />
                                <Link className="btn btn-sm btn-primary mt-3" to='/'>Go Back</Link>
                            </Message>
                        ) : (
                            <ListGroup className='m-3 p-3 shadow' variant='flush'>
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.thumbnail} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link className='nav-links link-dark' to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={2}>
                                                ${item.price}
                                            </Col>

                                            <Col md={3}>
                                                <Form.Control
                                                    as="select"
                                                    value={item.quantity}
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                >

                                                    {item.countInStock ===0 ? <option value="1">1</option>
                                                    :<>
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                    </>

                                                    }

                                                </Form.Control>
                                            </Col>

                                            <Col md={1}>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Col>

                    <Col md={4}>

                        <ListGroup className='m-3 p-3 shadow' variant='flush'>
                            {/* Calculate indiviual total price, cart total */}
                            <ListGroup.Item>
                                <h2>Subtotal {cartItems.reduce((acc, item) => (acc + item.quantity), 0)} items</h2>
                                ${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0).toFixed(2)}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block w-100'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>




                    </Col>
                </Row>
            </Container>
        </PageContainer>

    )
}
