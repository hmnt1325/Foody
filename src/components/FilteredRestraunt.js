import React from "react";
import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
const FilteredRestraunt = () => {
  return (
    <div className="flex h-screen justify-center  bg-slate-50">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img
          className="w-96"
          src={
            IMG_CDN_URL+"2xempty_cart_yfxml0"
          }
          alt="empty cart"
        />

        <span className="font-fira-code">No Data Found</span>

        <div className="">
          <a href="/">
            <button className="font-fira-code rounded-sm bg-slate-900 p-2 text-white mt-2">
              See Restaurants Near You
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilteredRestraunt;
