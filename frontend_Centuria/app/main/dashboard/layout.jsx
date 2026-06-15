"use client";

import Link from "next/link";
import NavProvider, { NavContext } from '@/context/NavContext.jsx'
import { useContext, useEffect } from 'react';

export default function DashboardLayout({ children }) {

    const { setNav } = useContext(NavContext);

    useEffect(() => {
        setNav(
            <>
                <Link href={'/main/dashboard/board'}>board</Link>
                <Link href={'/main/dashboard/tasks'}>tasks</Link>
                <Link href={'/main/dashboard/habits'}>habits</Link>
                <Link href={'/main/dashboard/categories'}>categories</Link>
                <Link href={'/main/dashboard/history'}>history</Link>
            </>
        )
    }, []);


    return (
        <>
        { children }
        </>
    )


}