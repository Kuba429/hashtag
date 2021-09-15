import React, { useContext } from "react";
import DrawerContent from "./DrawerContent";
import DrawerSide from "./DrawerSide";

import { BrowserRouter as Router } from "react-router-dom";

import PostModal from "../components/PostModal";
import SignInModal from "../components/SignInModal";
import { ModalContext } from "../App";

export default function Drawer() {
    const context = useContext(ModalContext);

    return (
        <Router>
            {/* modals */}
            {context.loginModal && <SignInModal />}
            {context.postModal && <PostModal />}

            {/* needed for drawer to work */}
            <div className="shadow bg-base-200 drawer drawer-mobile h-screen">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle w-10"
                />
                <DrawerContent />
                <DrawerSide />
            </div>
        </Router>
    );
}
