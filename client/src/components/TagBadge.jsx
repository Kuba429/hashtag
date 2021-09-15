import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { ModalContext } from "../App";

export default function TagBadge({ tag }) {
    const context = useContext(ModalContext);
    const hideModal = () => {
        context.setPostModal(false);
    };

    return (
        <Link
            onClick={hideModal}
            to={`/tag/${tag}`}
            className="badge badge-outline badge-primary text-sm cursor-pointer hover:bg-primary hover:text-base-200"
        >
            {`#${tag}`}
        </Link>
    );
}
