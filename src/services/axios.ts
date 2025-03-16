import axios from "axios";

const url = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e6cea8a-7e46-4553-8e38-120baaded277";

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
