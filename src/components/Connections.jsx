import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
	const connections = useSelector((state) => state.connections);
	const dispatch = useDispatch();

	const fetchConnections = async () => {
		try {
			const res = await axiosClient.get("/user/connections");

			dispatch(addConnections(res.data?.data));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchConnections();
	}, []);

	if (!connections) return;

	if (connections.length === 0) return <h1> No Connections Found</h1>;
	return (
		<div className="text-center my-10">
			<h1 className="text-bold text-white text-3xl">Connections</h1>

			{connections.map((connection) => {
				const {
					_id,
					firstName,
					lastName,
					photoUrl,
					age,
					gender,
					about,
				} = connection;

				return (
					<div
						key={_id}
						className="card flex-row bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-3xl mx-auto my-6 p-4"
					>
						<figure className="w-60 h-60 flex-shrink-0">
							<img
								src={photoUrl}
								alt={`${firstName} ${lastName}'s profile`}
								className="rounded-xl object-cover w-full h-full"
							/>
						</figure>
						<div className="card-body text-left justify-center">
							<h2 className="card-title text-lg font-semibold">
								{firstName} {lastName}
							</h2>
							{age && gender && (
								<p className="text-sm text-gray-500">
									{age}, {gender}
								</p>
							)}
							{about && (
								<p className="mt-2 text-sm text-gray-600">
									{about}
								</p>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Connections;
