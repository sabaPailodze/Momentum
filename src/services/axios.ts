import axios from "axios";

const BASE_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e7b22dd-7c42-46f0-87e7-af3548535f42";
// const TOKEN = "9e7b11e9-051d-4029-b025-a92323c81084";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// GET მოთხოვნა მონაცემების წამოსაღებად

export const fetchData = async (endpoint: string, _auth: boolean = false) => {
  try {
    const response = await api.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
};

// POST მოთხოვნა თანამშრომლის დასამატებლად
export const addEmployee = async (employeeData: FormData) => {
  try {
    const response = await api.post("/employees", employeeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

// POST მოთხოვნა დავალების დასამატებლად

export const createTask = async (taskData: any) => {
  try {
    console.log("Sending task data to API:", taskData);
    const response = await api.post("/tasks", taskData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Task created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating task:", error);

    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    throw new Error("Failed to create task");
  }
};
