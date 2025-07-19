import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { addUser } from "../utils/userSlice";
import axiosClient from "../utils/axiosClient";
import NavBar from "./NavBar";

const Body = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchUser = async () => {
		try {
			const res = await axiosClient.get("/profile/view");

			dispatch(addUser(res.data));
		} catch (err) {
			if (err.status === 401) {
				navigate("/login");
			}
			console.log(err);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};

export default Body;
