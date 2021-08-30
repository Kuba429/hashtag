import React from "react";
import PostForm from "./PostForm";

export default function PostFormWrapper() {
    return (
        <div className="collapse w-full border rounded-box border-base-300 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">Add Post</div>
            <div className="collapse-content">
                {/* CONTENT */}
                <PostForm/>
            </div>
        </div>
    );
}
