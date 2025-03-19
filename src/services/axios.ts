import axios from "axios";

const url = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e76f076-656c-4760-8af8-a3b3fd1f2166";

export const fetchData = async (endpoint: string, auth = false) => {
  try {
    const headers = auth ? { Authorization: `Bearer ${TOKEN}` } : {};
    const response = await axios.get(`${url}/${endpoint}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
};

export const addEmployee = async (employeeData: FormData) => {
  try {
    const response = await axios.post(`${url}/employees`, employeeData, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};
