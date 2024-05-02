import React from "react";

import { Link } from "react-router-dom";

const CTAButton = ({ children, linkto, active }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
      ${active ? "bg-yellow-50 text-black" : " bg-richblack-800"}
    hover:scale-95 transition-all duration-200`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
