import "./index.css";
import ProductSlider from "./ProductSlider";
const data = [
  {
    src: "https://c4.wallpaperflare.com/wallpaper/290/826/480/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg",
  },
  {
    src: "https://c4.wallpaperflare.com/wallpaper/290/826/480/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg",
  },
];
const index = () => {
  return (
    <ProductSlider slides={data} infinite timer={2000} stopOnManual>
      <img
        src="https://c4.wallpaperflare.com/wallpaper/290/826/480/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg"
        alt=""
      />
      <img
        src="https://c4.wallpaperflare.com/wallpaper/290/826/480/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg"
        alt=""
      />
    </ProductSlider>
  );
};

export default index;
