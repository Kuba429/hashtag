import React, { useRef } from "react";
import LoggedStatus from "../components/LoggedStatus";
import SlideLinks from "../components/SlideLinks";

export default function DrawerSide() {
    const sidebarToggleRef = useRef(null);

    return (
        <div className="drawer-side shadow-lg">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            <ul className="menu flex justify-center align-middle p-4 overflow-y-auto w-80 text-base-content bg-base-200 md:bg-base-100">
                <label
                    ref={sidebarToggleRef}
                    htmlFor="my-drawer-2"
                    className="mb-4 w-full bg-base-200 text-gray-600 border-0 drawer-button flex justify-end lg:hidden"
                >
                    <ion-icon
                        size="large"
                        name="chevron-back-outline"
                    ></ion-icon>
                </label>

                {/* Links */}
                <SlideLinks sidebarToggleRef={sidebarToggleRef} />
                <LoggedStatus />
            </ul>
        </div>
    );
}
