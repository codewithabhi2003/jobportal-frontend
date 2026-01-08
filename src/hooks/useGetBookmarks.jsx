import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSavedJobs } from "@/redux/jobSlice";
import { BOOKMARK_API_END_POINT } from "@/utils/constant";

const useGetBookmarks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    // 🚫 If not logged in, do nothing
    if (!user) return;

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(`${BOOKMARK_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          dispatch(setSavedJobs(res.data.savedJobs));
        }
      } catch (error) {
        console.error("Failed to fetch bookmarks", error);
      }
    };

    fetchBookmarks();
  }, [user, dispatch]);
};

export default useGetBookmarks;
