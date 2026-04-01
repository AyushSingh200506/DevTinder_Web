import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";

function Feed () {
    const feed  = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if(feed) return;
        try{
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true
            });
            dispatch(addFeed(res?.data?.data));
        } catch (error) {
            console.error(error);

        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]} />
            </div>
        )
    );
}

export default Feed;