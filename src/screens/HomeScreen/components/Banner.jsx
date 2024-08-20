import icon1 from "../../../assets/images/icons/icon1.png";
import icon2 from "../../../assets/images/icons/icon2.png";
import icon3 from "../../../assets/images/icons/icon3.png";
import icon4 from "../../../assets/images/icons/icon4.png";

import bn1 from "../../../assets/images/banners/banner-01.jpg";
import bn2 from "../../../assets/images/banners/banner-02.jpg";
import bn3 from "../../../assets/images/banners/banner-03.jpg";

import { LiaLongArrowAltRightSolid } from "react-icons/lia";
export default function Banner() {
  return (
    <div className="container-lg ">
      <div className="flex flex-wrap justify-start md:justify-between  py-5 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14">
              <img
                className="w-full h-full object-contain"
                src={icon1}
                alt=""
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold">Free Shipping</h1>
              <p className="text-xs mt-1 text-zinc-500">
                On all orders over $75.00
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14">
              <img
                className="w-full h-full object-contain"
                src={icon2}
                alt=""
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold">Money Guarantee</h1>
              <p className="text-sm mt-1 text-zinc-500">
                Within 30 days for an exchange.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14">
              <img
                className="w-full h-full object-contain"
                src={icon3}
                alt=""
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold">Online Support</h1>
              <p className="text-sm mt-1 text-zinc-500">
                Within 30 days for an exchange.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14">
              <img
                className="w-full h-full object-contain"
                src={icon4}
                alt=""
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold">Flexible Payment</h1>
              <p className="text-sm mt-1 text-zinc-500">
                Pay with Multiple Credit Cards.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-3 gap-3">
        <div className="relative flex-1">
          <div className="">
            <img className="w-full h-full object-contain" src={bn1} alt="" />
          </div>

          <div className="absolute flex  justify-start top-14 left-10">
            <div className="w-[57%] p-2">
              <h4 className="text-sm font-medium">NEW SEASON</h4>
              <h2 className="text-lg md:text-xl lg:text-4xl my-2 font-bold">
                Big patterns are back in fashion
              </h2>
              <div className="text-xs md:text-sm text-gray-600 tracking-wider">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </p>
              </div>

              <a
                href="https://klbtheme.com/clotya/product/basic-colored-sweatpants-with-elastic-hems/?ft=recentfalse"
                className="flex gap-1 items-center font-medium my-4 text-xs md:text-sm"
              >
                <span>Shop Now</span> <LiaLongArrowAltRightSolid size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full justify-items-center justify-between ">
          <div className="relative flex items-center ">
            <div className="">
              <img className="w-full h-full object-contain" src={bn2} alt="" />
            </div>

            <div className="absolute flex  justify-start top-8 left-10">
              <div className="w-[57%] p-2">
                <h4 className="text-sm font-medium">NEW SEASON</h4>
                <h2 className="text-lg md:text-xl lg:text-4xl my-2 font-bold">
                  The latest men&rsquo;s trends this season
                </h2>
                <div className="text-xs md:text-sm text-gray-600">
                  <p>Don&rsquo;t miss the opportunity.</p>
                </div>
                <a
                  href="https://klbtheme.com/clotya/product/basic-colored-sweatpants-with-elastic-hems/?ft=recentfalse"
                  className="flex gap-1 items-center font-medium my-4 text-xs md:text-sm"
                >
                  <span>Shop Now</span> <LiaLongArrowAltRightSolid size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex items-center ">
            <div className="">
              <img className="w-full h-full object-contain" src={bn3} alt="" />
            </div>

            <div className="absolute flex  justify-start top-8 left-10">
              <div className="w-[57%] p-2">
                <h4 className="text-sm font-medium">NEW SEASON</h4>
                <h2 className="text-lg md:text-xl lg:text-4xl my-2 font-bold">
                  Show your fashion with Summer shoes
                </h2>
                <div className="text-xs md:text-smm text-gray-600">
                  <p>Don&rsquo;t miss the opportunity.</p>
                </div>
                <a
                  href="https://klbtheme.com/clotya/product/basic-colored-sweatpants-with-elastic-hems/?ft=recentfalse"
                  className="flex gap-1 items-center font-medium my-4  md:text-sm"
                >
                  <span>Shop Now</span> <LiaLongArrowAltRightSolid size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
