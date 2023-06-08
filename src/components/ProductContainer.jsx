import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import ctabanner from '../assets/images/cta-banner.jpg'
import { useDispatch } from 'react-redux'
import Rating from './Rating'

export default function ProductContainer() {
  const [topRatedProducts, SetTopRatedProducts] = useState([])
  const [isTrpLoading, SetTrpLoading] = useState(true)

  const [featuredProducts, SetFeaturedProducts] = useState([])
  const [isFpLoading, SetFpLoading] = useState(true)

  const [recentProducts, SetRecentProducts] = useState([])
  const [isRpLoading, SetRpLoading] = useState(true)

  const [dealProducts, SetDealProducts] = useState([])
  const [isDpLoading, SetDpLoading] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const endpoint = process.env.REACT_APP_API
  const loadTopRatedProducts = async () => {
    const { data } = await axios.get('api/products/top/')
    SetTopRatedProducts(data)
    SetTrpLoading(false)
  }

  const loadFeaturedProducts = async () => {
    const { data } = await axios.get('api/products/featured/')
    SetFeaturedProducts(data)
    SetFpLoading(false)
  }

  const loadRecentProducts = async () => {
    const { data } = await axios.get(`/api/products/recents/`)
    console.log(data)
    SetRecentProducts(data)
    console.log('data:', typeof (data.images))
    SetRpLoading(false)
  }

  const loadDealProducts = async () => {
    const { data } = await axios.get('api/products/deals/')
    SetDealProducts(data)
    SetDpLoading(false)
  }
  const addToCartHandler = (id, quantity = 1) => {
    navigate(`/cart/?code=${id}&qty=${quantity}`)
  }

  useEffect(() => {
    loadTopRatedProducts()
    loadFeaturedProducts()
    loadRecentProducts()
    loadDealProducts()
  }, [])

  return (
    <div className="product-container">

      <div className="container">

        <div className="product-box">


          {/* Products Recent */}
          <div className="product-main">

            <h2>Recent Products</h2>

            <div className="product-grid">

              {recentProducts.map((product, i) => (
                <div key={i} className="showcase">

                  <div className="showcase-banner">

                    <img src={`${endpoint}${product.thumbnail}`} alt={product.name} className="product-img default" width="300" />
                    <img src={`${endpoint}${product.thumbnail}`} alt={product.name} className="product-img hover" width="300" />

                    <div className="showcase-actions">
                      <button className="btn-action">
                        <ion-icon name="heart-outline" role="img" className="md hydrated" aria-label="heart outline"></ion-icon>
                      </button>

                      <Link to={`/product/${product._id}`} className="btn-action">
                        <ion-icon name="eye-outline" role="img" className="md hydrated" aria-label="eye outline"></ion-icon>
                      </Link>

                      <button onClick={() => addToCartHandler(product._id)} className="btn-action">
                        <ion-icon name="bag-add-outline" role="img" className="md hydrated" aria-label="bag add outline"></ion-icon>
                      </button>
                    </div>
                  </div>

                  <div className="showcase-content">
                    <Link to={`/product/${product._id}`} className="showcase-category">
                      <h3 className='showcase-title'>
                        {product.name}
                      </h3>
                    </Link>


                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fc8c04'} />


                    <div className="price-box">
                      <p className="price">${product.price}</p>
                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/*  PRODUCT Right */}

          <div className="product-minimal">

            <div className="product-showcase">

              <h2 className="title">New Arrivals</h2>

              <div className="showcase-wrapper has-scrollbar">

                <div className="showcase-container">
                  {isRpLoading ? <Loader /> :
                    <>
                      {recentProducts.slice(0, 4).map((product, i) => (
                        <div key={product.id} className="showcase">

                          <Link to="/" className="showcase-img-box">
                            <img src={`${endpoint}${product.thumbnail}`} alt={product.name} className="showcase-img"
                              width="70" />
                          </Link>

                          <div className="showcase-content">



                            <Link to={`/product/${product._id}`} className="showcase-category">
                              <h4 className='showcase-title'>
                                {product.name}
                              </h4>
                            </Link>

                            <div className="price-box">
                              <p className="price">${product.price}</p>
                              {/* <del>$15.00</del> */}
                            </div>

                          </div>

                        </div>
                      ))}
                    </>
                  }
                </div>

              </div>

            </div>

            {/* featured products */}
            <div className="product-showcase">

              <h2 className="title">Featured</h2>

              <div className="showcase-wrapper  has-scrollbar">

                <div className="showcase-container">
                  {isFpLoading ? <Loader /> :
                    <>
                      {featuredProducts.slice(0, 4).map((product, i) => (
                        <div key={product.id} className="showcase">

                          <Link to="#" className="showcase-img-box">
                            <img src={`${endpoint}${product.thumbnail}`} alt={product.name} className="showcase-img"
                              width="70" />
                          </Link>

                          <div className="showcase-content">

                            <Link to={`/product/${product._id}`} className="showcase-category">
                              <h4 className='showcase-title'>
                                {product.name}
                              </h4>
                            </Link>

                            <div className="price-box">
                              <p className="price">${product.price}</p>

                            </div>

                          </div>

                        </div>
                      ))}
                    </>
                  }


                </div>

              </div>

            </div>

            {/* top-rated products */}
            <div className="product-showcase">

              <h2 className="title">Top Rated</h2>

              <div className="showcase-wrapper  has-scrollbar">

                <div className="showcase-container">

                  {isTrpLoading ? <Loader /> :
                    <>
                      {topRatedProducts.slice(0, 4).map((product, i) => (
                        <div key={product.id} className="showcase">

                          <Link to="#" className="showcase-img-box">
                            <img src={`${endpoint}${product.thumbnail}`} alt={product.name} className="showcase-img"
                              width="70" />
                          </Link>

                          <div className="showcase-content">

                            <Link to={`/product/${product._id}`} className="showcase-category">
                              <h4 className='showcase-title'>
                                {product.name}
                              </h4>
                            </Link>

                            <div className="price-box">
                              <p className="price">${product.price}</p>

                            </div>

                          </div>

                        </div>
                      ))}
                    </>
                  }

                </div>

              </div>

            </div>

          </div>


          {/* deal of the day */}
          <div className="product-featured">

            <h2 className="title">Deal of the day</h2>

            <div className="showcase-wrapper has-scrollbar">

              {dealProducts.map((product, i) => (
                <div className="showcase-container">

                  <div className="showcase">

                    <div className="showcase-banner">
                      <img src={`${endpoint}${product.thumbnail}`} alt={product.name}
                        className="showcase-img" />
                    </div>

                    <div className="showcase-content">

                      <div className="showcase-rating">
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                      </div>

                      <Link to="/">
                        <h3 className="showcase-title">{product.name}</h3>
                      </Link>

                      {product.description && <p className="showcase-desc">
                        Lorem ipsum dolor sit amet consectetur Lorem ipsum
                        dolor dolor sit amet consectetur Lorem ipsum dolor
                      </p>}

                      <div className="price-box">
                        <p className="price">${product.price}</p>

                      </div>

                      <button className="add-cart-btn">add to cart</button>

                      <div className="showcase-status">
                        <div className="wrapper">
                          <p>
                            already sold: <b>20</b>
                          </p>

                          <p>
                            available: <b>40</b>
                          </p>
                        </div>

                        <div className="showcase-status-bar"></div>
                      </div>

                      <div className="countdown-box">

                        <p className="countdown-desc">
                          Hurry Up! Offer ends in:
                        </p>

                        <div className="countdown">

                          <div className="countdown-content">

                            <p className="display-number">360</p>

                            <p className="display-text">Days</p>

                          </div>

                          <div className="countdown-content">
                            <p className="display-number">24</p>
                            <p className="display-text">Hours</p>
                          </div>

                          <div className="countdown-content">
                            <p className="display-number">59</p>
                            <p className="display-text">Min</p>
                          </div>

                          <div className="countdown-content">
                            <p className="display-number">00</p>
                            <p className="display-text">Sec</p>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              ))}


            </div>

          </div>



          <div className="container">
            <div className="testimonials-box">

              <div className="cta-container">

                <img src={ctabanner} alt="summer collection" className="cta-banner" />

                <a href="#" className="cta-content">

                  <p className="discount">25% Discount</p>

                  <h2 className="cta-title">Summer collection</h2>

                  <p className="cta-text">Starting @ $10</p>

                  <button className="cta-btn">Shop now</button>

                </a>

              </div>

              <div className="service">

                <h2 className="title">Our Services</h2>

                <div className="service-container">

                  <a href="#" className="service-item">

                    <div className="service-icon">
                      <ion-icon name="boat-outline"></ion-icon>
                    </div>

                    <div className="service-content">

                      <h3 className="service-title">Worldwide Delivery</h3>
                      <p className="service-desc">For Order Over $100</p>

                    </div>

                  </a>

                  <a href="#" className="service-item">

                    <div className="service-icon">
                      <ion-icon name="rocket-outline"></ion-icon>
                    </div>

                    <div className="service-content">

                      <h3 className="service-title">Next Day delivery</h3>
                      <p className="service-desc">UK Orders Only</p>

                    </div>

                  </a>

                  <a href="#" className="service-item">

                    <div className="service-icon">
                      <ion-icon name="call-outline"></ion-icon>
                    </div>

                    <div className="service-content">

                      <h3 className="service-title">Best Online Support</h3>
                      <p className="service-desc">Hours: 8AM - 11PM</p>

                    </div>

                  </a>

                  <a href="#" className="service-item">

                    <div className="service-icon">
                      <ion-icon name="arrow-undo-outline"></ion-icon>
                    </div>

                    <div className="service-content">

                      <h3 className="service-title">Return Policy</h3>
                      <p className="service-desc">Easy & Free Return</p>

                    </div>

                  </a>

                  <a href="#" className="service-item">

                    <div className="service-icon">
                      <ion-icon name="ticket-outline"></ion-icon>
                    </div>

                    <div className="service-content">

                      <h3 className="service-title">30% money back</h3>
                      <p className="service-desc">For Order Over $100</p>

                    </div>

                  </a>

                </div>

              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}