import { useEffect, useState } from "react";

import { ImageSlider } from "./ImageSlider";
import imageData from "../../data/ImageData";
const Index = () => {
  const [slides, setSLides] = useState([]);
  useEffect(() => {
    setSLides(imageData);
  }, []);
  return (
    <div>
      <ImageSlider slides={slides} autoplay={true} />
    </div>
  );
};

export default Index;
