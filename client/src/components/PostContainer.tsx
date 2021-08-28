import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Post from "./Post";
import PostFormWrapper from "./PostFormWrapper";

export default function PostContainer() {
    const [posts, setPosts] = useState(false);
    const getPosts = async () => {
        try {
            const response = await axios({
                url: "/posts/get",
                method: "post",
                baseURL: "http://localhost:5000",
                headers: { "Content-Type": "application/json" },

                data: {
                    page: 1,
                    howMany: 10,
                },
            });
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="flex flex-col w-11/12 lg:w-2/3">
            <PostFormWrapper />
            <div
                className="btn"
                onClick={() => {
                    console.log(posts);
                }}
            >
                Click
            </div>

            {posts &&
                //@ts-ignore
                posts.map((post) => {
                    return (
                        <Post
                            content={post.content}
                            key={post.id}
                            author={post.author}
                            tags={post.tags}
                            createdOn={post.created_on}
                        />
                    );
                })}
        </div>
    );
}
