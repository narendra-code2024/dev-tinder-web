import { useState } from "react";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				"http://localhost:3000/login",
				{
					email,
					password,
				},
				{ withCredentials: true }
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex justify-center mt-12">
			<div className="card w-84 bg-base-100 card-xl shadow-sm">
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
								onChange={(e) => setEmail(e.target.value)}
							/>
						</fieldset>
						<fieldset className="fieldset mb-4">
							<input
								type="text"
								className="input"
								placeholder="Password"
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
