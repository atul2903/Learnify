import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/logo.png";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { categories } from "../../services/api";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  console.log("navabr->", user);

  const [subLinks, setSubLinks] = useState([]);
  const fetchSubLinks = async () => {
    try {
      console.log(process.env.REACT_APP_BASE_URL);
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(res);
      // const res = await axios.get(
      //   "http://localhost:4000/api/v1/course/showAllCategories"
      // );
      console.log("printing sublink :", res.data.allTags);
      setSubLinks(res.data.allTags);
    } catch (error) {
      console.log("could not fetch the category list");
    }
  };
  useEffect(() => {
    fetchSubLinks();
  }, []);
  return (
    <div className="flex flex-row justify-center h-14 items-center border-b-[1px] border-richblack-700">
      <div className="flex w-11/12 max-w-maxContent justify-between items-center">
        {/* image  */}
        <Link to={"/"}>
          <img
            src={Logo}
            width={250}
            height={32}
            loading="lazy"
            className="mix-blend-lighten"
            alt="logo"
          />
        </Link>

        {/* nav links */}
        <nav>
          <ul className="flex gap-x-6  text-richblack-25">
            {NavbarLinks.map((e, i) => {
              return (
                <li key={i}>
                  {e.title === "Catalog" ? (
                    <div className="group relative cursor-pointer  flex items-center gap-2  ">
                      <p>{e.title}</p>
                      <MdOutlineKeyboardArrowDown />

                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] ">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                        {subLinks.length ? (
                          subLinks.map((e, i) => (
                            <Link to={`catalog/${e.name}`} key={i}>
                              {e.name}
                            </Link>
                          ))
                        ) : (
                          <div> </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={e?.path}>
                      <p
                        className={`${
                          matchRoute(e?.path) ? "text-yellow-25" : "text-white"
                        }`}
                      >
                        {e.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        {/* login signup dashboard  */}

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <MdOutlineShoppingCart className="text-richblack-25 w-8 h-8 mt-2" />
              {totalItems > 0 && (
                <span className="text-white absolute top-2 left-3 bg-richblack-700 rounded px-1 font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button className="blackButton">Login</button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="blackButton">Signup</button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
