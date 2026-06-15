"use client" ;
import { createContext, useState } from "react";

export const NavContext = createContext({});

export default function NavProvider({children}){
    const [nav , setNav ] = useState(null) ;
    // const updateNav = (item) => setNav(item) ; // just a rename to be able to use setNav ,

    return (
        <NavContext.Provider value={{nav : nav , setNav : setNav }} >
            {children}
        </NavContext.Provider>
    )
}