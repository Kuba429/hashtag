import axios from "axios";
import React, { useRef, useContext } from "react";
import { v4 } from "uuid";
import { ModalContext } from "../App";
import { readCookie } from "../utils";

export default function Post({ author, content, tags, createdOn, id }) {
    const context = useContext(ModalContext);
    const element = useRef(null);
    createdOn = new Date(createdOn).toDateString();
    const currentUsername = readCookie("username");

    const openPost = () => {
        context.setPostContent({
            author: author,
            content: content,
            tags: tags,
            createdOn: createdOn,
            id: id,
        });

        context.togglePostModal();
    };

    const deletePost = async (e) => {
        if (currentUsername !== author) {
            alert("this isnt your post");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/posts/delete",
                {
                    postId: id,
                },
                {
                    headers: {
                        authorization: `Bearer ${readCookie("token")}`,
                    },
                }
            );
            // console.log(response);
            element.current.className = "hidden";
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id={id} ref={element} className="rounded-box mt-8 p-4 bg-base-200 shadow">
            <div className="flex justify-between">
                <div className="container flex items-end gap-2">
                    <h1 className="text-2xl leading-none">{author}</h1>
                    <p className="text-2xs text-base-content opacity-60">
                        {createdOn}
                    </p>
                </div>
                <div className=" flex gap-3 items-center">
                    {currentUsername === author && (
                        // icon must be wrapped; not affected by colors otherwise
                        <div
                            className="text-red-500 p-0 h-auto w-auto justify-center items-center action-icon text-xl hidden md:flex"
                            onClick={deletePost}
                        >
                            <ion-icon size="medium" name="trash"></ion-icon>
                        </div>
                    )}
                    <div
                        onClick={openPost}
                        className="cursor-pointer h-auto p-0 m-0 flex items-center"
                    >
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <p className="text-base py-2">{content}</p>
            {/* tags */}
            <div className="flex gap-x-1">
                {tags &&
                    tags.map((item) => {
                        return (
                            <div
                                key={v4()}
                                className="badge badge-outline badge-primary text-sm cursor-pointer hover:bg-primary hover:text-base-200"
                            >
                                {`#${item}`}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
