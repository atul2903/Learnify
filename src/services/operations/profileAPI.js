import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../api";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      console.log("sending response");
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: token,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("res->", response.data.userDetails);
      console.log("res->", response.data.userDetails.image);
      const userImage = response.data.userDetails.image
        ? response.data.userDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userDetails.firstName} ${response.data.userDetails.lastName}`;
      dispatch(setUser({ ...response.data.userDetails, image: userImage }));
      console.log("setted user successfully");
    } catch (error) {
      // dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error.message);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: token,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: token,
    });
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error);
    toast.error("Could Not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}

// export async function getInstructorData(token) {
//   const toastId = toast.loading("Loading...");
//   let result = [];

//   try {
//     const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
//       Authorization: token,
//     });
//     console.log("GET_INSTRUCOR_API_RESPONSE", response);
//     result = response?.data?.courses;
//   } catch (error) {
//     console.log("GET_INSTRUCTOR_API_ERROR", error);
//     toast.error("cant get instructor data");
//   }
//   toast.dismiss(toastId);
// }
