import React, { useState, useEffect } from 'react'
import { Button,Container ,Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../components/Loader'
import { Message } from '../components/Message'

import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'

import { ORDER_PAY_REQUEST, ORDER_PAY_RESET } from '../reducers/Order/OrderPaySlice'
import { ORDER_DELIVERY_RESET } from '../reducers/Order/OrderDeliverySlice'

import PageContainer from '../components/PageContainer'



export default function OrderScreen() {
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()
    const redirect = useNavigate()


    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails
    console.log(order)

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let finalOrder = {}
    if (!loading && !error) {
        finalOrder = { ...order, itemsPrice: order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2) }
    }
    console.log(order)
    console.log(finalOrder)

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AUpg7Hgv4nw9CDxWQjKj8AJF4bUTShD8dYs1zXAdLI8HgtQNZ9RuHpOtWfhdfcBrcZVrngZzf9MiRvDG&disable-funding=credit'
        script.async = true

        setSdkReady(true)

        document.body.appendChild(script)
        console.log(document.body.appendChild(script))
    }

    useEffect(() => {
        if (!userInfo) {
            redirect('/login')
        }
        if (!order || successPay || order._id !== id || successDeliver) {

            dispatch(ORDER_PAY_RESET())
            // dispatch(ORDER_DELIVERY_RESET())
            dispatch(getOrderDetails(id))
        }//if order is not paid yet
        else if (!order.isPaid) {
            //if no paypal has been added yet
            addPayPalScript()

        }
    }, [dispatch, id])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult))
        alert('Payment Completed!')
        window.location.reload()
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
        alert('Order Delivery Completed!')
        window.location.reload()
    }

    return loading ? (

        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <PageContainer>
            <Container>
            <h3>Order No: {order._id}</h3>
            <Row>
                <Col md={8}>
                    <ListGroup className='shadow p-2 m-2' variant='flush'>
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong>{order.user.email}</p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address},  {order.shippingAddress.city}
                                {'  '}
                                {order.shippingAddress.postalCode},
                                {'  '}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                Order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.thumbnail} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link className='nav-links link-dark' to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
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
                        <ListGroup className='shadow p-2 m-2' variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${finalOrder.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            {!order.isPaid && (
                                <ListGroup.Item>
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item className="mb-3 ms-2">
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                </Col>
            </Row>
            </Container>
        </PageContainer>
    )
}


