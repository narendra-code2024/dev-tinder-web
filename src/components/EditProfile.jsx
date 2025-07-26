import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axiosClient from "../utils/axiosClient";

const EditProfile = ({ user }) => {
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
	const [age, setAge] = useState(user.age || "");
	const [gender, setGender] = useState(user.gender || "");
	const [about, setAbout] = useState(user.about || "");
	const [error, setError] = useState("");
	const [showToast, setShowToast] = useState(false);

	const saveProfile = async () => {
		setError("");
		try {
			const res = await axiosClient.patch(BASE_URL + "/profile/edit", {
				firstName,
				lastName,
				photoUrl,
				age,
				gender,
				about,
			});
			dispatch(addUser(res?.data?.data));
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
		}
	};

	return (
		<>
			<div className="flex flex-col md:flex-row justify-center items-start gap-10 px-4 md:px-10 my-10">
				{/* Form Card */}
				<div className="card bg-base-50 w-full md:w-96 shadow-xl border border-base-300 rounded-lg">
					<div className="card-body">
						<h2 className="card-title justify-center mb-4">
							Edit Profile
						</h2>

						{/* First Name */}
						<label className="form-control w-full mb-3">
							<span className="label-text">First Name</span>
							<input
								type="text"
								value={firstName}
								className="input input-bordered mt-1"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</label>

						{/* Last Name */}
						<label className="form-control w-full mb-3">
							<span className="label-text">Last Name</span>
							<input
								type="text"
								value={lastName}
								className="input input-bordered mt-1"
								onChange={(e) => setLastName(e.target.value)}
							/>
						</label>

						{/* Photo URL */}
						<label className="form-control w-full mb-3">
							<span className="label-text">Photo URL</span>
							<input
								type="text"
								value={photoUrl}
								className="input input-bordered mt-1"
								onChange={(e) => setPhotoUrl(e.target.value)}
							/>
						</label>

						{/* Age */}
						<label className="form-control w-full mb-3">
							<span className="label-text">Age</span>
							<input
								type="number"
								min="0"
								value={age}
								className="input input-bordered mt-1"
								onChange={(e) => setAge(e.target.value)}
							/>
						</label>

						{/* Gender */}
						<label className="form-control w-full mb-3">
							<span className="label-text">Gender</span>
							<select
								value={gender}
								className="select select-bordered mt-1"
								onChange={(e) =>
									setGender(e.target.value.toLowerCase())
								}
							>
								<option value="">Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</select>
						</label>

						{/* About */}
						<label className="form-control w-full mb-4">
							<span className="label-text">About</span>
							<input
								type="text"
								value={about}
								className="input input-bordered mt-1"
								onChange={(e) => setAbout(e.target.value)}
							/>
						</label>

						{/* Error Message */}
						{error && (
							<p className="text-red-500 text-sm mt-2">{error}</p>
						)}

						{/* Save Button */}
						<div className="card-actions justify-center mt-4">
							<button
								className="btn bg-blue-600 text-white w-full hover:scale-105 transition-transform duration-150"
								onClick={saveProfile}
							>
								Save Profile
							</button>
						</div>
					</div>
				</div>

				{/* Preview Section */}
				<div className="flex flex-col items-center border-l border-base-300 pl-6">
					<h2 className="text-lg font-semibold mb-4 text-center">
						Live Preview
					</h2>
					<UserCard
						user={{
							firstName,
							lastName,
							photoUrl,
							age,
							gender,
							about,
						}}
					/>
				</div>
			</div>

			{/* Toast Notification */}
			{showToast && (
				<div className="toast toast-top toast-center z-50">
					<div className="alert alert-success">
						<span>Profile saved successfully.</span>
					</div>
				</div>
			)}
		</>
	);
};

export default EditProfile;
