import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { ModalContext } from "../App";
import { readCookie } from "../utils";

export default function PostModal() {
    const context = useContext(ModalContext);
    const [currentUsername, setCurrentUsername] = useState(
        readCookie("username")
    );

    //TODO update posts state inside post container component
    const deletePost = async () => {
        if (currentUsername !== context.postContent.author) {
            alert("this isnt your post");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/posts/delete",
                {
                    postId: context.postContent.id,
                },
                {
                    headers: {
                        authorization: `Bearer ${readCookie("token")}`,
                    },
                }
            );
            const deletedPost = document.getElementById(context.postContent.id);
            deletedPost.classList.add("hidden");

            context.togglePostModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-full w-full bg-base-content bg-opacity-70 absolute z-30 flex justify-center items-center">
            {/* Disable modal on click on background */}
            <div
                onClick={context.togglePostModal}
                className="z-30 w-full h-full absolute"
            ></div>
            <div className="z-50 w-full h-full md:h-5/6 md:w-11/12 bg-base-200 md:rounded">
                {/* top bar */}
                <div className="h-auto w-full flex items-center justify-between">
                    {/* actions for logged users */}
                    <div className="flex justify-center items-center">
                        {context.postContent.author === currentUsername && (
                            <div
                                onClick={deletePost}
                                className="w-auto  h-auto p-0 m-2 text-2xl cursor-pointer hover:text-red-500"
                            >
                                <ion-icon name="trash"></ion-icon>
                            </div>
                        )}
                    </div>
                    {/* close modal button */}
                    <div
                        onClick={context.togglePostModal}
                        className="w-auto h-auto p-0 m-2 text-2xl cursor-pointer hover:text-red-500"
                    >
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                </div>
                {/* actual post */}
                <div>
                    <p>{context.postContent.author}</p>
                </div>
            </div>
        </div>
    );
}
