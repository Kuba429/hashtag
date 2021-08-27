import React from "react";
import SlideLinks from "../components/SlideLinks";

export default function DrawerSide() {
    return (
        <div className="drawer-side shadow-lg">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            <ul className="menu flex justify-center align-middle p-4 overflow-y-auto w-80 text-base-content bg-base-200 md:bg-base-100">
                <label
                    htmlFor="my-drawer-2"
                    className="mb-4 w-full bg-base-200 text-gray-600 border-0 drawer-button flex justify-end lg:hidden"
                >
                    {/* @ts-ignore */}
                    <ion-icon size="large" name="chevron-back-outline">
                        {/* @ts-ignore */}
                    </ion-icon>
                </label>

                {/* Links */}
                <SlideLinks />
            </ul>
        </div>
    );
}
