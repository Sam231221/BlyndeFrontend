import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "../../actions/productActions";
import Testimonials from "./components/Testimonials";
import ProductContainer from "./components/ProductContainer";
import PageContainer from "../../components/PageContainer";
import imageData from "../../data/ImageData";
import DiscountOffers from "./components/DiscountOffers";
import { ImageSlider } from "./components/ImageSlider";
import Banner from "./components/Banner";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const [slides, setSLides] = useState([]);
  useEffect(() => {
    setSLides(imageData);
  }, []);

  const keyword = window.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <PageContainer>
      <ImageSlider slides={slides} autoplay={true} />
      <Banner />

      <ProductContainer />
      <DiscountOffers />
      <Testimonials />
    </PageContainer>
  );
};
