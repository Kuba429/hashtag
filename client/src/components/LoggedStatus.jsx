import axios from "axios";
import React, { useContext, useState } from "react";
import { ModalContext } from "../App";

import { readCookie } from "../utils";
export default function LoggedStatus() {
    const context = useContext(ModalContext);
    const [isLogged, setIsLogged] = useState(Boolean(readCookie("username")));
    //no need for state because after every logging in/out page refreshes (for now)
    const username = readCookie("username");

    const logOut = () => {
        document.cookie =
            "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = window.location;
    };

    //separate components not needed for now
    if (isLogged) {
        // logged
        return (
            <div className="dropdown dropdown-top w-auto">
                <div tabIndex={0} className="m-1 btn btn-ghost ">
                    {username}
                </div>
                <ul
                    tabIndex={0}
                    className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-auto "
                    // without paddingInline styling li tags are beigh pushed to right
                    style={{ paddingInlineStart: 10, paddingInlineEnd: 10 }}
                >
                    <li>
                        <a onClick={logOut}>Log Out</a>
                    </li>
                    <li>
                        <a>Profile</a>
                    </li>
                </ul>
            </div>
        );
    } else {
        // not logged
        return (
            <button
                className="btn btn-accent"
                onClick={context.toggleLoginModal}
            >
                Sign In
            </button>
        );
    }
}
