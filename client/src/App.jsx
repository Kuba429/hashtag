import React, { createContext, useState } from "react";
import Drawer from "./Drawer";

export const ModalContext = createContext("a");

function App() {
    const [loginModal, setLoginModal] = useState(false);
    const toggleLoginModal = () => setLoginModal(!loginModal);

    const [postModal, setPostModal] = useState(false);
    const [postContent, setPostContent] = useState({});
    const togglePostModal = () => setPostModal(!postModal);

    return (
        <ModalContext.Provider
            value={{
                loginModal,
                toggleLoginModal,
                postModal,
                setPostModal,
                togglePostModal,
                postContent,
                setPostContent,
            }}
        >
            <Drawer />
        </ModalContext.Provider>
    );
}

export default App;
