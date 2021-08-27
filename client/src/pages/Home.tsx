import React from "react";
import PostContainer from "../components/PostContainer";

export default function Home() {
    return (
        <div className="container flex flex-col justify-center items-center">
            <h1 className="w-full pl-20 lg:w-2/3 text-5xl lg:pl-0">Home</h1>

            <PostContainer />
        </div>
    );
}
