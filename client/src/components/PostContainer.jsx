import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Post from "./Post";
import PostFormWrapper from "./PostFormWrapper";

export default function PostContainer({ tags }) {
    const [posts, setPosts] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const elRef = useRef(null);

    const convertDates = (array) => {
        array.forEach((item) => {
            let date = new Date(item.created_on).toLocaleDateString();

            item.created_on = date;
        });
        return array;
    };

    const setDefaults = () => {
        setPage(1);
        setPosts([]);
    };
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
                    howMany: 15,
                    tags: tags,
                },
            });
            let tempArray = convertDates(response.data);
            setPosts(tempArray);
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
                    howMany: 15,
                    tags: tags,
                },
            });
            // let tempArray = [...posts];
            if (response.data.length > 0 && typeof response.data === "object") {
                let tempArray = convertDates([...posts, ...response.data]);

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

    useEffect(() => {
        //event dispatch @ 'DrawerContent' component
        //listeners must be reset on every 'posts' state change
        //otherwise callback has only access to state values from the time of reference
        document.removeEventListener("hitBottom", hitBottomHandler);
        if (posts) {
            document.addEventListener("hitBottom", hitBottomHandler);
        }
    }, [posts]);

    const hitBottomHandler = () => {
        /*
        EXPLANATION
        when user reaches bottom the handler is being invoked,
        said handler checks if 'posts' state is an object (it may be a 'false' - the initial state value),
        then it dispatches a 'click' event on a hidden element with ref 'elRef' and
        'onClick' listener which then calls the 'getMorePosts' function.
        
        calling 'getMorePosts' directly from within 'addEventListener' callback function (hitBottomHandler) causes a crash (duplicate posts)
        */

        if (elRef.current && typeof posts == "object") {
            elRef.current.click();
        }
    };

    return (
        <div className="flex flex-col w-11/12 lg:w-2/3 min-h-full mb-10">
            <div className="hidden" onClick={getMorePosts} ref={elRef}>
                TEST
            </div>
            {tags.length <= 0 && <PostFormWrapper setDefaults={setDefaults} />}

            {posts &&
                //@ts-ignore
                posts.map((post) => {
                    return (
                        <Post
                            content={post.content}
                            key={post.id}
                            id={post.id}
                            author={post.author}
                            tags={post.tags}
                            createdOn={post.created_on}
                        />
                    );
                })}

            {isFetching && <p>Fetching more posts</p>}
        </div>
    );
}
