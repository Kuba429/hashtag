import React from "react";
import { Link } from "react-router-dom";

export default function SlideLinks() {
    return (
        <>
            <li className="py-2">
                <Link to="/">Menu Item</Link>
            </li>
            <li className="py-2">
                <Link to="/test">Test</Link>
            </li>
        </>
    );
}
