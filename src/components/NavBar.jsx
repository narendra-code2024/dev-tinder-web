import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
import axiosClient from "../utils/axiosClient";
import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";
import { clearRequests } from "../utils/requestSlice";

const NavBar = () => {
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axiosClient.post("/logout");
			dispatch(removeUser());
			dispatch(removeFeed());
			dispatch(removeConnections());
			dispatch(clearRequests());
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	if (!user) return null;

	return (
		<div className="navbar bg-base-200 shadow-sm">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost text-xl">
					💻 DevTinder
				</Link>
			</div>

			<div className="flex gap-2">
				<div className="m-2">
					<p>Welcome, {user.firstName}</p>
				</div>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img alt="User avatar" src={user.photoUrl} />
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<Link to="/profile">Profile</Link>
						</li>
						<li>
							<Link to="/connections">Connections</Link>
						</li>
						<li>
							<Link to="/requests">Requests</Link>
						</li>
						<li>
							<Link>Settings</Link>
						</li>
						<li>
							<Link onClick={handleLogout}>Logout</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
