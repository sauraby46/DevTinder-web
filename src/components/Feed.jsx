import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    if (feed !== null) return;

    const fetchFeed = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/feed`,
          { withCredentials: true }
        );

        dispatch(addFeed(res.data.data));
      } catch {
        console.error("Failed to fetch feed");
      }
    };

    fetchFeed();
  }, [feed, dispatch]);

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <h1 className="flex justify-center my-10">
        No new users found!
      </h1>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
