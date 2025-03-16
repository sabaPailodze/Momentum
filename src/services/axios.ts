// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://momentum.redberryinternship.ge/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const fetchDepartments = async () => {
//   try {
//     const response = await api.get("/departments");
//     console.log("API Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return null;
//   }
// };

import axios from "axios";

const baseUrl = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e6cea8a-7e46-4553-8e38-120baaded277";

export const fetchData = async (endpoint: string, auth = false) => {
  try {
    const headers = auth ? { Authorization: `Bearer ${TOKEN}` } : {};
    const response = await axios.get(`${baseUrl}/${endpoint}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
};
