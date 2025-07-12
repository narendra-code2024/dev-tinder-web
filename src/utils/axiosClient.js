import axios from "axios";
import { BASE_URL } from "./constants";

const axiosClient = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

axiosClient.interceptors.response.use(
	(response) => {
		const { data, message } = response.data;

		return {
			...response,
			data,
			message: message || null,
		};
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
