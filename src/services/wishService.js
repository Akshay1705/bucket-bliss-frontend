import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:4000/api/wishes";

const getToken = () => localStorage.getItem("bucketBlissToken");

export const fetchWishes = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data; // returns { total, page, totalPages, wishes }
  } catch (error) {
    console.error("Failed to fetch wishes:", error);
    return { wishes: [], total: 0, page: 1, totalPages: 1 };
  }
};


export const addWish = async (wishData) => {
  try {
    const response = await axios.post(API_URL, wishData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    toast.success("Wish added successfully!");
    return response.data;
  } catch (error) {
    console.error("Failed to add wish:", error);
    toast.error("Failed to add wish.");
    return null;
  }
};

export const updateWish = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    toast.success("Wish updated!");
    return response.data;
  } catch (error) {
    console.error(`Failed to update wish ${id}:`, error);
    toast.error("Failed to update wish.");
    return null;
  }
};

export const deleteWish = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    toast.success("Wish deleted.");
    return response.data;
  } catch (error) {
    console.error(`Failed to delete wish ${id}:`, error);
    toast.error("Failed to delete wish.");
    return null;
  }
};
