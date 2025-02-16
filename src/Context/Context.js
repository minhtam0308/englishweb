import { createContext, useState } from "react";

export const ContextAuth = createContext();

export const ContextWrapper = (props) => {
    const [auth, setAuth] = useState({
        auth: false,
        user: {}
    })
    let val = {
        auth,
        setAuth: setAuth
    }
    return (
        <ContextAuth.Provider value={val}>
            {props.children}
        </ContextAuth.Provider>
    )
}
