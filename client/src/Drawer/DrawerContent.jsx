import React, { useRef, useEffect } from "react";
import MainRouter from "../components/MainRouter";

export default function DrawerContent() {
    const element = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!element.current) {
                return;
            }
            if (
                element.current.scrollHeight - element.current.scrollTop <=
                element.current.clientHeight + 100
            ) {
                const event = new Event("hitBottom");
                document.dispatchEvent(event);
            }
        }, 1000);
    }, []);

    return (
        <div
            ref={element}
            className="flex flex-col items-center pt-10 drawer-content bg-base-100"
        >
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
