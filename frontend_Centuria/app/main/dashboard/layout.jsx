"use client";

import Link from "next/link";
import NavProvider, { NavContext } from '@/context/NavContext.jsx'
import { useContext, useEffect } from 'react';

export default function DashboardLayout({ children }) {

    const { setNav } = useContext(NavContext);


    useEffect(() => {
        setNav([
            { title: 'board', href: '/main/dashboard/board', imageSrc: '/svg/board.svg' },
            { title: 'tasks', href: '/main/dashboard/tasks', imageSrc: '/svg/tasks.svg' },
            { title: 'habits', href: '/main/dashboard/habits', imageSrc: '/svg/habits.svg' },
            { title: 'categories', href: '/main/dashboard/categories', imageSrc: '/svg/categories.svg' },
            { title: 'history', href: '/main/dashboard/history', imageSrc: '/svg/history.svg' },
        ]);
    }, []);


    return (
        <>
            {children}
        </>
    )


}