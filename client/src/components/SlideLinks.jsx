import React from "react";
import { Link } from "react-router-dom";

export default function SlideLinks() {
    return (
        <div className="flex flex-col justify-center h-full">
            <li className="py-2">
                <Link to="/">Home</Link>
            </li>
            <li className="py-2">
                <Link to="/tag/BMW">Tag</Link>
            </li>
        </div>
    );
}
