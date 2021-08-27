import React from "react";
import DrawerContent from "./DrawerContent";
import DrawerSide from "./DrawerSide";

import { BrowserRouter as Router } from "react-router-dom";

export default function Drawer() {
    return (
        <Router>
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
