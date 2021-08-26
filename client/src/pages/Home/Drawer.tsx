import React from "react";
import DrawerContent from "./DrawerContent";
import DrawerSide from "./DrawerSide";

export default function Drawer() {
    return (
        <div className="shadow bg-base-200 drawer drawer-mobile h-52">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <DrawerContent />
            <DrawerSide />
        </div>
    );
}
