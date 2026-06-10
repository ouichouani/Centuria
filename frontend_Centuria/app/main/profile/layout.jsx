"use client";

import Link from "next/link";
import { NavContext } from '@/context/NavContext.jsx'
import { useContext, useEffect } from 'react';

export default function ProfaileLayout({ children }) {

    const { setNav } = useContext(NavContext);

    useEffect(() => {
        setNav(
            <>
            </>
        )
    }, []);


    return (
        <>
        { children }
        </>
    )


}