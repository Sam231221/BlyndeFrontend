import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import { useParams, useNavigate } from 'react-router-dom'

import Loader from '../components/Loader'
import { Message } from '../components/Message'
import PageContainer from '../components/PageContainer'
import { endpoint } from '../constants'

export default function ProductScreen() {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    //select a particular state i.e productList state which is an obj
    const productDetail = useSelector(state => state.productDetails)
    console.log(productDetail)

    const { error, loading, product } = productDetail
    console.log('p:', product)
    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    //pass thequantity and id, we 'll then navigate to CartScreen Component.
    const addToCartHandler = () => {
        navigate(`/cart/?code=${id}&qty=${quantity}`)
    }

    return (
        <PageContainer>
            <div className='container'>

                <Link to='/' className='btn btn-sm btn-primary my-3'>
                    Go Back
                </Link>
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : <Row>
                            <Col md={5}>
                                <Image src={`${endpoint}${product.thumbnail}`} alt={product.name} fluid></Image>
                            </Col>

                            <Col md={4}>
                                <ListGroup variant="flush">

                                    <ListGroup.Item>
                                        <h2>{product.name}</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Ratings:    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fc8c04'} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>

                                    {product.description &&
                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>
                                    }

                                </ListGroup>
                            </Col>

                            <Col md={3}>

                                <ListGroup variant="flush">




                                    <ListGroup.Item>
                                        <Row>
                                            <Col> Status: </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col> Qty: </Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Form.Control as="select"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}>
                                                        {
                                                            //create ana arrya from obj.countInStock.
                                                            //[0,1,2]
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>

                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}



                                    {/* {product.countInStock == 0} returns booleand value */}
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block w-100' disabled={product.countInStock <= 0} type='button'> Add to Cart</Button>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Col>
                        </Row>
                }
            </div>
        </PageContainer>

    )
}
