import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighLightText";
import { FaRegWindowClose } from "react-icons/fa";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((v) => v.tag === value);
    console.log(result);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className=" text-4xl font-semibold text-center">
        Unlock the
        <HighLightText text={"Power of Code"} />
      </div>

      <p className="text-center text-richblack-300  text-sm mt-3">
        Learn to build anything you can imagine
      </p>

      <div className="hidden lg:flex gap-10 mt-5  w-max bg-richblack-800 text-richblack-200  rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]  ">
        {tabName.map((e, i) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2 ${
                currentTab === e
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } rounded-full cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-4 transition-all duration-500`}
              key={i}
              onClick={() => setMyCards(e)}
            >
              {e}
            </div>
          );
        })}
      </div>

      <div className="hidden lg:block lg:h-[200px]"></div>
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((e, i) => {
          return (
            <CourseCard
              key={i}
              data={e}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
