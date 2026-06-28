"use client";

import Link from "next/link";
import { NavContext } from '@/context/NavContext.jsx'
import { useContext, useEffect } from 'react';

export default function ControllPanelLayout({ children }) {

    const { setNav } = useContext(NavContext);

    useEffect(() => {
        setNav([
            { title: 'blacklist', href: '/main/controll-panel/blacklist', imageSrc: '/svg/black-list.svg' },
            { title: 'hidden-posts', href: '/main/controll-panel/posts', imageSrc: '/svg/hidden-posts.svg' },
            { title: 'reports', href: '/main/controll-panel/reports', imageSrc: '/svg/reports.svg' },
        ]);
    }, []);


    return (
        <>
            {children}
        </>
    )

}