import AppInstance from "./apiBaseUrl";
import axios from "axios";

// Routing
export const userAPI = {
  // user login
  UserLogin: async (data) => {
    try {
      const response = await AppInstance.post("/api/auth/login", data);

      const { accessToken, user } = response.data.result;

      // Save token
      localStorage.setItem("_token", accessToken);

      // Return user and token to thunk
      return { user, token: accessToken };
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
