"use client";

import Link from "next/link";
import { NavContext } from '@/context/NavContext.jsx'
import { useContext, useEffect } from 'react';

export default function ControllPanelLayout({ children }) {

    const { setNav } = useContext(NavContext);

    useEffect(() => {
        setNav(
            <>
                <Link href={'/main/controll-panel/blacklist'}>black list</Link>
                <Link href={'/main/controll-panel/posts'}>posts</Link>
                <Link href={'/main/controll-panel/reports'}>reports</Link>
            </>
        )
    }, []);


    return (
        <>
        { children }
        </>
    )

}