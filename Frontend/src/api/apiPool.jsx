import AppInstance from "./apiBaseUrl";
import axios from "axios";
// Routing
export const userAPI = {
  // user login
  UserLogin: async (data) => {
    try {
      const response = await AppInstance.post("/api/auth/login", data);
      const token = response.data.result.accessToken;
      localStorage.setItem("_token", token);
      return response;
    } catch (error) {
      return handleError(error);
    }
  },
 
  // userupdateprofile
  UserUpdateProfile: async (data, auth) => {  
    try {
      const userId = auth?.user?._id;
      const existId = auth?._id
      const response = await AppInstance.patch(`/api/auth/${userId || existId}`, data);
      return response;
    } catch (error) {
      return handleError(error);
    }
  },
};

// For Error handling
const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Axios error response:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  } else {
    console.error("An unexpected error occurred:", error.message);
  }

  throw error;
};
