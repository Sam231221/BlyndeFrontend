import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import { Message } from '../components/Message'


import Banner from '../components/Banner'
import Category from '../components/Category'
import ProductContainer from '../components/ProductContainer'
import PageContainer from '../components/PageContainer'

export const HomeScreen = () => {

  const dispatch = useDispatch()

  //select a particular state i.e productList state which is an obj
  const productList = useSelector(state => state.productList)


  //Destructure to access some attributes
  const { error, loading, page, pages, products } = productList
  console.log('p:', products)

  const keyword = window.location.search



  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])


  return (
    <PageContainer>
      <Banner />
      <Category />
      <ProductContainer />
    </PageContainer>
  )
}
