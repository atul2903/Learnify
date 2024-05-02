import React from "react";
import HighLightText from "./HighLightText";
import compareImage from "../../../assets/Images/Compare_with_others.png";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import planLessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="font-bold font-inter text-[36px] leading-[44px] text-center">
        Your swiss knife for <HighLightText text={"learning any language"} />
        <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
          <img src={knowYourProgress} className="object-contain  lg:-mr-32" />
          <img
            src={compareImage}
            className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
          />
          <img
            src={planLessons}
            className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
          />
        </div>
      </div>
      <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-15">
        <CTAButton active={true} linkto={"/signup"}>
          Learn More
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
