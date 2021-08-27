import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";

export default function PostContainer() {
    const [post, setPosts] = useState([]);

    useEffect(() => {
        console.log("eloelo320");
    }, []);

    return (
        <div className='flex flex-col w-11/12 lg:w-2/3'>
            <Post />
            <Post />
        </div>
    );
}
