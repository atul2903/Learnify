import React from "react";
import Template from "../components/core/Auth/Template";
import signupImage from "../assets/Images/signup.webp";

const Signup = () => {
  return (
    <Template
      title={"Join the millions Learning to code with Learnify for free"}
      description1={"Build skills for today,tomorrow and beyond"}
      description2={"Education to future-proof your career"}
      image={signupImage}
      formType={"signup"}
    />
  );
};

export default Signup;
