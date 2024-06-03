import bn1 from "../../../assets/images/banner-01.jpg";
import bn2 from "../../../assets/images/banner-02.jpg";
import bn3 from "../../../assets/images/banner-03.jpg";
export default function Banner() {
  return (
    <div className="flex flex-wrap gap-3 ">
      <div className="flex-1 group z-[10]   cursor-pointer relative border shadow-sm h-[250px]  rounded-lg">
        <img src={bn1} className="w-full h-full " alt="" />

        <div className="z-[5] group-hover:bg-[#4a21ff9c]  absolute w-full h-full left-0 top-0">
          <div className="pt-3 pl-8">
            <h1 className="text-2xl font-bold tracking-wider group-hover:text-white text-zinc-900">
              Women
            </h1>
            <p className="text-sm group-hover:text-white text-zinc-500 mt-2">
              Spring 2018
            </p>
          </div>
          <div className="pt-3 pl-8 absolute bottom-8 hidden group-hover:block text-white uppercase font-semibold text-sm">
            <p>Shop Now</p>
          </div>
        </div>
      </div>
      <div className="flex-1 group z-[10]   cursor-pointer relative border shadow-sm h-[250px]  rounded-lg">
        <img src={bn2} className="w-full h-full " alt="" />

        <div className="z-[5] group-hover:bg-[#4a21ff9c]  absolute w-full h-full left-0 top-0">
          <div className="pt-3 pl-8">
            <h1 className="text-2xl font-bold tracking-wider group-hover:text-white text-zinc-900">
              Men
            </h1>
            <p className="text-sm group-hover:text-white text-zinc-500 mt-2">
              Spring 2018
            </p>
          </div>
          <div className="pt-3 pl-8 absolute bottom-8 hidden group-hover:block text-white uppercase font-semibold text-sm">
            <p>Shop Now</p>
          </div>
        </div>
      </div>
      <div className="flex-1 group z-[10]   cursor-pointer relative border shadow-sm h-[250px]  rounded-lg">
        <img src={bn3} className="w-full h-full " alt="" />

        <div className="z-[5] group-hover:bg-[#4a21ff9c]  absolute w-full h-full left-0 top-0">
          <div className="pt-3 pl-8">
            <h1 className="text-2xl font-bold tracking-wider group-hover:text-white text-zinc-900">
              Accessories
            </h1>
            <p className="text-sm group-hover:text-white text-zinc-500 mt-2">
              New Trend
            </p>
          </div>
          <div className="pt-3 pl-8 absolute bottom-8 hidden group-hover:block text-white uppercase font-semibold text-sm">
            <p>Shop Now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
