import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../utils/userSlice";
import axiosClient from "../utils/axiosClient";

const Login = () => {
	const [email, setEmail] = useState("naren@in.com");
	const [password, setPassword] = useState("Naren@123");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await axiosClient.post("/login", { email, password });

			const { data } = res.data;
			dispatch(addUser(data));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex justify-center mt-24">
			<div className="card w-72 bg-base-100 card-xl shadow-sm">
				<div className="card-body">
					<h2 className="justify-center card-title mb-4">
						💻 DevTinder
					</h2>
					<div>
						<fieldset className="fieldset mb-4">
							<input
								type="text"
								className="input"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</fieldset>
						<fieldset className="fieldset mb-4">
							<input
								type="text"
								className="input"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</fieldset>
					</div>
					<div className="justify-center card-actions mt-4">
						<button
							className="btn bg-blue-600 text-white w-full"
							onClick={handleLogin}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
