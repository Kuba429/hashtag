import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import PostFormWrapper from "./PostFormWrapper";

export default function PostContainer() {
    const [post, setPosts] = useState([]);

    useEffect(() => {
        console.log("eloelo320");
    }, []);

    return (
        <div className="flex flex-col w-11/12 lg:w-2/3">
            <PostFormWrapper />

            <Post />
            <Post />
        </div>
    );
}
