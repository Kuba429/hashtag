import React from "react";
import { v4 } from "uuid";

export default function Post({ author, content, tags, createdOn }) {
    createdOn = new Date(createdOn).toDateString();

    return (
        <div className="rounded-box mt-8 p-4 bg-base-200 shadow">
            <div className="container flex items-end gap-2">
                <h1 className="text-2xl leading-none">{author}</h1>
                <p className="text-2xs text-base-content opacity-60">
                    {createdOn}
                </p>
            </div>
            <p className="text-base py-2">{content}</p>
            {/* tags */}
            <div className="flex gap-x-1">
                {tags&&tags.map((item) => {
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
