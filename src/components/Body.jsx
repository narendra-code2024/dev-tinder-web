import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router";
import { addUser, removeUser } from "../utils/userSlice";
import axiosClient from "../utils/axiosClient";
import NavBar from "./NavBar";

const Body = () => {
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const fetchUser = async () => {
		try {
			const res = await axiosClient.get("/profile/view");
			const { data } = res.data;
			dispatch(addUser(data));

			if (location.pathname === "/login") {
				navigate("/");
			}
		} catch (err) {
			dispatch(removeUser());

			if (location.pathname !== "/login") {
				navigate("/login");
			}
		}
	};

	useEffect(() => {
		if (!user) {
			fetchUser();
		}
	}, [user]);

	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};

export default Body;
