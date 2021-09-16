import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

export default function SlideLinks({ sidebarToggleRef }) {
    const temp = ["123", "ddd"];
    const hideSidebar = () => {
        sidebarToggleRef.current.click();
    };
    return (
        <div className="flex flex-col justify-center h-full">
            <li onClick={hideSidebar} className="py-2">
                <Link to="/">Home</Link>
            </li>
            <hr />
            {temp.map((item) => {
                return (
                    <li onClick={hideSidebar} key={v4()} className="py-2">
                        <Link to={`/tag/${item}`}>{`#${item}`}</Link>
                    </li>
                );
            })}
        </div>
    );
}
