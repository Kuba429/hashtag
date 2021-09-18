import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import axios from "axios";

export default function SlideLinks({ sidebarToggleRef }) {
    const [popularTags, setPopularTags] = useState([]);
    const temp = ["123", "ddd"];

    const hideSidebar = () => {
        sidebarToggleRef.current.click();
    };

    const getPopularTags = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/posts/popularTags/3"
            );
            setPopularTags(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPopularTags();
    }, []);
    return (
        <div className="flex flex-col justify-center h-full">
            <li onClick={hideSidebar} className="py-2">
                <Link to="/">Home</Link>
            </li>
            <hr />
            {popularTags.map((item) => {
                item = item.element;
                return (
                    <li onClick={hideSidebar} key={v4()} className="py-2">
                        <Link to={`/tag/${item}`}>{`#${item}`}</Link>
                    </li>
                );
            })}
        </div>
    );
}
