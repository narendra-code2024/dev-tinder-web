import axios from "axios";
import { BASE_URL } from "./constants";

const axiosClient = axios.create({
	baseURL: BASE_URL,
	withCredentials: true, // Required for cookie-based auth
});

export default axiosClient;
