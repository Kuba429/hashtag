import React, { useContext } from "react";
import { ModalContext } from "../App";

export default function PostModal() {
    const context = useContext(ModalContext);
    const [author, content, tags, createdOn, id] = [
        "author",
        "some content lol",
        ["some tags", "aa"],
        new Date().toDateString(),
        123123124123,
    ];

    return (
        <div className="h-full w-full bg-base-content bg-opacity-70 absolute z-30 flex justify-center items-center">
            {/* Disable modal on click on background */}
            <div
                onClick={context.togglePostModal}
                className="z-30 w-full h-full absolute"
            ></div>
            <div className="z-50 w-full h-full md:h-5/6 md:w-11/12  bg-base-200 md:rounded">
                <div className="h-auto w-full flex items-center justify-end">
                    {/* top bar */}
                    <div
                        onClick={context.togglePostModal}
                        className="w-auto h-auto p-0 m-2 text-2xl cursor-pointer hover:text-red-500"
                    >
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </div>
    );
}
