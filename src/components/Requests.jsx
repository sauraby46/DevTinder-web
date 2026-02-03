import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/user/requests/received`,
          { withCredentials: true }
        );

        dispatch(addRequests(res.data.data));
      } catch {
        console.error("Failed to fetch requests");
      }
    };

    fetchRequests();
  }, [dispatch]);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(requestId));
    } catch {
      console.error("Failed to review request");
    }
  };

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <h1 className="flex justify-center my-10">
        No Requests Found
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 mx-auto"
          >
            <img
              src={photoUrl}
              alt={`${firstName}'s profile`}
              className="w-20 h-20 rounded-full"
            />

            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>

              {age && gender && <p>{`${age}, ${gender}`}</p>}
              <p>{about}</p>
            </div>

            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>

              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
