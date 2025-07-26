import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
	const requests = useSelector((store) => store.requests);
	const dispatch = useDispatch();
	const fetchRequests = async () => {
		try {
			const res = await axiosClient.get("/user/requests/received");
			dispatch(addRequests(res.data.data));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	if (!requests) return;

	if (requests.length === 0)
		return (
			<h1 className="flex justify-center my-10"> No Requests Found</h1>
		);

	return (
		<div className="text-center my-10">
			<h1 className="text-bold text-white text-3xl">
				Connections Requests
			</h1>

			{requests.map((connection) => {
				const {
					_id,
					firstName,
					lastName,
					photoUrl,
					age,
					gender,
					about,
				} = connection.fromUserId;

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

export default Requests;
