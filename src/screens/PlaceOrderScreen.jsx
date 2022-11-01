import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Message} from '../components/Message'
import PageContainer from '../components/PageContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../reducers/Order/OrderCreateSlice'

function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    console.log('cart:', cart)
    //since cart is not exstensible, we will use spread operator.
    // console.log(Object.isExtensible(cart))

    //FINALIZING AMOUNTS
    let itemsPrice = Number(Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(3)))
    //You could set shipping price in backend too.
    let shippingPrice = Number(Number(itemsPrice > 100 ? 10 : 0).toFixed(3))
    let taxPrice = Number( Number((0.082) * itemsPrice).toFixed(3))
    let totalPrice = itemsPrice + shippingPrice + taxPrice
    console.log(typeof(itemsPrice), typeof(shippingPrice) ,typeof(taxPrice), typeof(totalPrice), totalPrice)
    let FinalCart={...cart, itemsPrice:itemsPrice, shippingPrice:shippingPrice, taxPrice:taxPrice, totalPrice:totalPrice}

    console.log('final:', FinalCart)
    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        //In backend order_views.getOrderById
        //a success variable is used to redirect to /order/:id
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch(ORDER_CREATE_RESET())
        }
    }, [success,navigate, dispatch ,order._id])

    //on clicking PlaceOrderButton dispatch createOrder() that will also create Order Instance in backend
    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
        }))
    }

    return (
        <PageContainer>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup  className='m-3 p-3 shadow' variant='flush'>
                        <ListGroup.Item>
                            <h4>Shipping</h4>

                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address},  {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            <hr />
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.thumbnail} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link className='nav-links link-dark' to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.quantity} X ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>

                        <ListGroup  className='m-3 p-3 shadow' variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${FinalCart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${FinalCart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${FinalCart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${FinalCart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
            
                </Col>
            </Row>
        </PageContainer>
    )
}

export default PlaceOrderScreen
