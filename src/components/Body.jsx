import { Outlet } from "react-router";
import NavBar from "./NavBar";

const Body = () => {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};

export default Body;
