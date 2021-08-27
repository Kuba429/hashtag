import React from "react";
import MainRouter from "../components/MainRouter";

export default function DrawerContent() {
    return (
        <div className="flex flex-col items-center pt-10 drawer-content bg-base-100">
            <label
                htmlFor="my-drawer-2"
                className="mb-4 p-2 rounded-btn bg-base-200 text-gray-600 border-0 drawer-button fixed left-1 top-1 flex justify-center align-middle lg:hidden"
            >
                {/* @ts-ignore */}
                <ion-icon size="large" name="chevron-forward-outline">
                    {/* @ts-ignore */}
                </ion-icon>
            </label>

            {/* content here */}
            <MainRouter />
        </div>
    );
}
