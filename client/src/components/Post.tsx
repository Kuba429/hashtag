import React from "react";
import { v4 } from "uuid";

export default function Post() {
    const title = "Post";
    const content = "This is a post. LOL";
    const tags = ["funny", "viral", "video"];
    const date = new Date();

    return (
        <div className="rounded-box mt-8 p-4 bg-base-200 shadow">
            <h1 className="text-2xl">{title}</h1>
            {/* <p>{date}</p> */}
            <p className="text-base py-2">{content}</p>
            {/* tags */}
            <div className="flex gap-x-1">
                {tags.map((item) => {
                    return (
                        <div
                            key={v4()}
                            className="badge badge-outline badge-primary text-sm cursor-pointer hover:bg-primary hover:text-base-200"
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
