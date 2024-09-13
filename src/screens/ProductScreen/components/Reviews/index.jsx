import React, { useState } from "react";

import CommentForm from "./CommentForm";
import Rating from "../../../../components/reusables/Rating";

export default function Reviews() {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-800">Reviews(12)</h1>
      <hr />
      <h1 className="text-xl mt-2 tracking-wide mb-2">
        {" "}
        1 review for Corduroy Bucket Hat
      </h1>
      <div className="flex items-center gap-4 mb-3">
        <img
          className="w-14 h-14 rounded-full"
          src="https://secure.gravatar.com/avatar/dd28514c9a8cfba334e05f21703be28e?s=60&d=mm&r=g"
          alt=""
        />
        <div className="flex flex-col">
          <Rating fontSize={12} value={3} color={"#fc8c04"} />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">admin</span>
            <div className=" w-[20px] h-[1px] bg-black"></div>
            <span className="text-gray-400">12 May, 2022</span>
          </div>
          <p className="text-xs tracking-wide">
            Sed perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
        </div>
      </div>

      <CommentForm />
    </>
  );
}
