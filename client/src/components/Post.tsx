import React from "react";
import { stringify, v4 } from "uuid";

export default function Post() {
    const author = "Author";
    const content = "This is a post. LOL";
    const tags = ["funny", "viral", "video"];
    let date = "20.03.2021";

    return (
        <div className="rounded-box mt-8 p-4 bg-base-200 shadow">
            <div className="container flex items-end gap-2">
                <h1 className="text-2xl leading-none">{author}</h1>
                <p className="text-2xs text-base-content opacity-60">{date}</p>
            </div>
            <p className="text-base py-2">{content}</p>
            {/* tags */}
            <div className="flex gap-x-1">
                {tags.map((item) => {
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
