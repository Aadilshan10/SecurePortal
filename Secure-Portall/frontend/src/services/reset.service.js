import axios from "axios";

const API_URL = "http://localhost:3000/"; // Replace with your actual API URL

// Fetch all projects
const requestReset = (email) => {
    return axios
      .post(`${API_URL}api/request`, { email })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error sending request:", error);
        throw error;
      });
  };
  
  const verifyOTP = (email, otp) => {
    return axios
      .post(`${API_URL}api/verify`, { email, otp })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error verifying OTP", error);
        throw error;
      });
  };
  

// Create a new project


const ResetService = {
    requestReset,
    verifyOTP, // Add getProjectById to the service
};

export default ResetService;
