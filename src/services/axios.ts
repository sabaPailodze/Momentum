import axios from "axios";

const BASE_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e76f076-656c-4760-8af8-a3b3fd1f2166";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

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

// POST რექუესტი თანამშრომლის დასამატებლად
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

// POST რექუესტი დავალების დასამატებლად
// export const createTask = async (taskData: any) => {
//   try {
//     const response = await api.post("/tasks", taskData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error creating task:", error);
//     throw new Error("Failed to create task");
//   }
// };

export const createTask = async (taskData: any) => {
  try {
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
    }

    throw new Error("Failed to create task");
  }
};
