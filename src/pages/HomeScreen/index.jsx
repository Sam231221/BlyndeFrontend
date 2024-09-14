import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { listProducts } from "../../redux/actions/productActions";
import Testimonials from "./components/Testimonials";
import ProductContainer from "./components/ProductContainer";
import PageContainer from "../../components/PageContainer";
import DiscountOffers from "./components/DiscountOffers";
import { ImageSlider } from "./components/ImageSlider";
import HomeBanner from "./components/HomeBanner";

import imageData from "../../data/ImageData";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const [slides, setSLides] = useState([]);
  useEffect(() => {
    setSLides(imageData);
  }, []);

  const keyword = window.location.search ? window.location.search : "";

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <PageContainer>
      <ImageSlider slides={slides} autoplay={true} />
      <HomeBanner />
      <ProductContainer />
      <DiscountOffers />
      <Testimonials />
    </PageContainer>
  );
};
export default HomeScreen;
