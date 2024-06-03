import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "../actions/productActions";
import Testimonials from "../components/Testimonials";
import ProductContainer from "../components/ProductContainer";
import PageContainer from "../components/PageContainer";
import ImageSlider from "../components/ImageSlider";
import DiscountOffers from "../components/DiscountOffers";
export const HomeScreen = () => {
  const dispatch = useDispatch();

  //select a particular state i.e productList state which is an obj
  const productList = useSelector((state) => state.productList);

  //Destructure to access some attributes
  const { error, loading, page, pages, products } = productList;

  const keyword = window.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <PageContainer>
      <ImageSlider />
      <ProductContainer />
      <DiscountOffers />
      <Testimonials />
    </PageContainer>
  );
};
