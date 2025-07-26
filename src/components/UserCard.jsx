const UserCard = ({ user }) => {
	const { firstName, lastName, photoUrl, age, gender, about } = user;
	const fullName = `${firstName} ${lastName}`;

	return (
		<div className="card w-full max-w-sm bg-base-50 shadow-md hover:shadow-lg transition-shadow duration-300 mx-auto">
			<figure className="p-4">
				<img
					src={photoUrl}
					alt={`${fullName}'s profile`}
					className="rounded-xl object-cover h-60 w-60"
				/>
			</figure>
			<div className="card-body items-center text-center">
				<h2 className="card-title text-lg font-semibold">{fullName}</h2>
				{age && gender && (
					<p className="text-sm text-gray-500">
						{age}, {gender}
					</p>
				)}
				{about && <p className="mt-2 text-sm text-gray-600">{about}</p>}
				<div className="card-actions mt-4 space-x-4">
					<button className="btn btn-outline btn-error hover:btn-error">
						Ignore
					</button>
					<button className="btn btn-success hover:brightness-110">
						Interested
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
