import React from "react";
import PostContainer from "../components/PostContainer";
import { useParams } from "react-router-dom";

export default function ByTag() {
    let { tag } = useParams();
    tag = tag.toLowerCase();

    return (
        <div className="container flex flex-col justify-center items-center">
            <h1 className="w-full pl-20 mt-20 mb-5  lg:w-2/3 text-5xl lg:pl-0">
                {`#${tag}`}
            </h1>

            <PostContainer tags={[tag]} />
        </div>
    );
}
