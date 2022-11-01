import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartAction'
import PageContainer from '../components/PageContainer'

function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <PageContainer>
            <div className="container">
   
                    <div className='form-signin mb-4 shadow m-4 w-100 m-auto'>
                        <CheckoutSteps step1 step2 step3 />

                        <Form onSubmit={submitHandler}>
                            <Form.Group>
                                <Form.Label as='legend'>Select Method</Form.Label>
                                <Col>
                                    <Form.Check
                                        type='radio'
                                        label='PayPal or Credit Card'
                                        id='paypal'
                                        name='paymentMethod'
                                        checked
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >

                                    </Form.Check>
                                </Col>
                            </Form.Group>

                            <Button type='submit' className="mt-4" variant='primary'>
                                Continue
                            </Button>
                        </Form>
                    </div>
            </div>
        </PageContainer >

    )
}

export default PaymentScreen
