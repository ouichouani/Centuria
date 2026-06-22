"use client";

import Link from "next/link";
import NavProvider, { NavContext } from '@/context/NavContext.jsx'
import { useContext, useEffect } from 'react';

export default function DashboardLayout({ children }) {

    const { setNav } = useContext(NavContext);


    useEffect(() => {
        setNav([
            { title: 'board', href: '/main/dashboard/board', imageSrc: '/svg/notification.svg' },
            { title: 'tasks', href: '/main/dashboard/tasks', imageSrc: '/svg/notification.svg' },
            { title: 'habits', href: '/main/dashboard/habits', imageSrc: '/svg/notification.svg' },
            { title: 'categories', href: '/main/dashboard/categories', imageSrc: '/svg/notification.svg' },
            { title: 'history', href: '/main/dashboard/history', imageSrc: '/svg/notification.svg' },
        ]);
    }, []);


    return (
        <>
            {children}
        </>
    )


}