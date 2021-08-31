import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import PostFormWrapper from "./PostFormWrapper";

export default function PostContainer() {
    const [posts, setPosts] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const getFirstPosts = async () => {
        setIsFetching(true);
        try {
            const response = await axios({
                url: "/posts/get",
                method: "post",
                baseURL: "http://localhost:5000",
                headers: { "Content-Type": "application/json" },

                data: {
                    page: page,
                    howMany: 10,
                },
            });
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setPage(page + 1);
            setIsFetching(false);
        }
    };
    const getMorePosts = async () => {
        if (isFetching) return;

        setIsFetching(true);
        try {
            const response = await axios({
                url: "/posts/get",
                method: "post",
                baseURL: "http://localhost:5000",
                headers: { "Content-Type": "application/json" },

                data: {
                    page: page,
                    howMany: 10,
                },
            });
            // let tempArray = [...posts];
            if (response.data.length > 0 && typeof response.data === "object") {
                let tempArray = [...posts, ...response.data];
                console.log(tempArray)

                setPosts(tempArray);
                setPage(page + 1);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getFirstPosts();
    }, []);

    return (
        <div
            onScroll={() => {
                console.log("aa");
            }}
            onClick={getMorePosts}
            className="flex flex-col w-11/12 lg:w-2/3"
        >
            <PostFormWrapper />
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

            {/* {isFetching && <p>Fetching more posts</p>} */}
        </div>
    );
}
