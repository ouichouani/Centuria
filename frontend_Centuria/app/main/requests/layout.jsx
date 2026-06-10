
'use client'
import Link from "next/link";
import { NavContext } from '@/context/NavContext.jsx';
import { useContext, useEffect } from 'react';


export default function RequestLayout({children}) {

    const { setNav } = useContext(NavContext);

    useEffect(() => {
        setNav(
            <>
                <Link href={'/main/requests/followers'}>followers</Link>
                <Link href={'/main/requests/following'}>following</Link>
                <Link href={'/main/dashboard/inbox'}>inbox</Link>
            </>
        )
    }, []);


    return (
    <>
        {children}
    </>
    )
}