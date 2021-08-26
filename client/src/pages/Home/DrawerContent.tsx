import React from 'react'

export default function DrawerContent() {
    return (
        <div className="flex flex-col items-center justify-center drawer-content">
                <label
                    htmlFor="my-drawer-2"
                    className="mb-4 btn btn-primary drawer-button lg:hidden"
                >
                    open menu
                </label>
                <h1 className='text-7xl'>content</h1>
            </div>
    )
}
