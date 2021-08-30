import React, { createContext, useState } from "react";
import Drawer from "./Drawer";

import SignInModal from "./components/SignInModal";

export const ModalContext = createContext("a");

function App() {
    const [loginModal, setLoginModal] = useState(false);
    const toggleLoginModal = () => setLoginModal(!loginModal);

    return (
        <ModalContext.Provider value={{ loginModal, toggleLoginModal }}>
            {loginModal && <SignInModal />}
            <Drawer />
        </ModalContext.Provider>
    );
}

export default App;
