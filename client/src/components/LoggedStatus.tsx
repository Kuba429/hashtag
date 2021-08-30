import React, { useState } from "react";

export default function LoggedStatus() {
    const [isLogged, setIsLogged] = useState(true);

    //separate components not needed for now
    if (isLogged) {
        // logged
        return (
            <div className="dropdown dropdown-top w-auto">
                <div tabIndex={0} className="m-1 btn btn-ghost ">
                    Username
                </div>
                <ul
                    tabIndex={0}
                    className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-auto "
                    // without paddingInline styling li tags are beigh pushed to right
                    style={{ paddingInlineStart: 10, paddingInlineEnd: 10 }}
                >
                    <li>
                        <a>Log Out</a>
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
            <button className='btn btn-accent'>Sign In</button>
        );
    }
}
