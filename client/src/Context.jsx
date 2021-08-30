//  This context was made in order to make it easier to manage modals
//  (daisyui uses a lot  of relative position)

import React, { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const toggleIsLogged = () => setIsLogged(!isLogged);

    return (
        <Context.Provider value={{ isLogged, toggleIsLogged }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
