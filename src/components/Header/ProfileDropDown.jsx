import React, { useEffect, useRef, useState } from "react";
import { RxTriangleDown } from "react-icons/rx";
import {
  BsBoxArrowRight,
  BsGear,
  BsPerson,
  BsQuestionCircle,
} from "react-icons/bs";

export const ProfileDropDown = ({ classes }) => {
  const [open, setOpen] = useState(false);
  let ProfileDivRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!ProfileDivRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className={`relative ${classes}`}>
      <div
        className="flex items-center relative"
        ref={ProfileDivRef}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img
          src="https://dashboardleadgen.netlify.app/assets/profile-04683081.jpg"
          className="rounded-full w-7 h-7 object-cover"
          alt=""
        />

        <RxTriangleDown size={50} />
      </div>

      <div
        className={` ${
          open ? "visible opacity-100" : "invisible opacity-0"
        } absolute transition-opacity duration-500 ease-out before:content-[""] before:border-l-[#f4f4f4] before:border-t-[#f4f4f4] before:border-bg-[#fff]  before:border-t-[1px] 
                            before:border-l-[1px] before:absolute before:top-[-10px] before:right-5 before:h-5 before:w-5
                            before:bg-[#fff] before:rotate-[45deg] border
                           top-14 right-[2px] border-[#f4f4f4] bg-[#fff] drop-shadow-lg w-[220px] p-2`}
      >
        <div className="text-center mb-2">
          <h2 className="text-md">Sameer Shahi</h2>
        </div>
        <hr />
        <ul>
          <li>
            <a
              className="px-3 py-2 bg-none hover:bg-[#eef2fa] transition-all duration-500 ease-out flex items-center gap-2 text-xs"
              href=""
            >
              <BsPerson /> My profile
            </a>
          </li>
          <li>
            <a
              className="px-3 py-2 bg-none hover:bg-[#eef2fa] transition-all duration-500 ease-out flex items-center gap-2 text-xs"
              href=""
            >
              <BsGear /> Acccount Setting
            </a>
          </li>
          <li>
            <a
              className="px-3 py-2 bg-none hover:bg-[#eef2fa] transition-all duration-500 ease-out flex items-center gap-2 text-xs"
              href=""
            >
              <BsQuestionCircle /> Need Help?
            </a>
          </li>
          <li>
            <a
              className="px-3 py-2 bg-none hover:bg-[#eef2fa] transition-all duration-500 ease-out flex items-center gap-2 text-xs"
              href=""
            >
              {" "}
              <BsBoxArrowRight /> Sign Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
