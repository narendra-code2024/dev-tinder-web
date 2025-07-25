import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axiosClient from "../utils/axiosClient";
import UserCard from "./UserCard";

const Feed = () => {
	const dispatch = useDispatch();
	const [feed, setFeed] = useState();

	const getFeed = async () => {
		try {
			const res = await axiosClient.get("user/feed");
			const { data } = res.data;
			setFeed(data);
			dispatch(addFeed(data));
		} catch (error) {}
	};

	useEffect(() => {
		getFeed();
	}, []);

	if (!feed) return;

	if (feed.length === 0)
		return (
			<h1 className="flex justify-center my-10">
				End of feed, please see your connections!
			</h1>
		);

	return (
		feed && (
			<div className="flex justify-center my-12">
				<UserCard user={feed[0]} />
			</div>
		)
	);
};

export default Feed;
