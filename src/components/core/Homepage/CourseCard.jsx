import React from "react";

import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ data, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`w-[360px] lg:w-[30%] ${
        currentCard === data?.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 text-richblack-900"
          : "bg-richblack-800 "
      }  h-[300px] box-border cursor-pointer `}
      onClick={() => setCurrentCard(data?.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-2 flex flex-col gap-3">
        <div
          className={` ${
            currentCard === data?.heading ? "text-richblack-800" : "text-white"
          } font-semibold text-[20px]`}
        >
          {data?.heading}
        </div>

        <div className="text-richblack-400">{data?.description}</div>
      </div>

      <div
        className={`flex justify-between ${
          currentCard === data?.heading ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{data?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{data?.lessionNumber} Lesson</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
