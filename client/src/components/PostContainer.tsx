import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import PostForm from "./PostForm";

export default function PostContainer() {
    const [post, setPosts] = useState([]);

    useEffect(() => {
        console.log("eloelo320");
    }, []);

    return (
        <div className='flex flex-col w-11/12 lg:w-2/3'>
            <PostForm/>

            <Post />
            <Post />
            
            
        </div>
    );
}
