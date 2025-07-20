import axios from "axios";

const API_URL = "https://wishcraft-backend-jsts.onrender.com/api/auth";

// REGISTER user
export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

// LOGIN user and save token + name
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  const token = response.data.token;
  const userName = response.data.user?.name || "User"; // make sure backend sends user.name

  if (token) {
    localStorage.setItem("bucketBlissToken", token);
    localStorage.setItem("bucketBlissUserName", userName);
  }

  return token;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("bucketBlissToken");
  localStorage.removeItem("bucketBlissUserName");
};

// Get token
export const getToken = () => localStorage.getItem("bucketBlissToken");

// Get user name
export const getUserName = () =>
  localStorage.getItem("bucketBlissUserName") || "User";
