"use client";

import Link from "next/link";
import NavProvider, { NavContext } from '@/context/NavContext.jsx'
import { useContext, useEffect } from 'react';

export default function ExploreLayout({ children }) {

    const { setNav } = useContext(NavContext);

    useEffect(() => {
        setNav([
            { title: 'posts', href: '/main/community/posts', imageSrc: '/svg/notification.svg' },
            { title: 'network', href: '/main/community/network', imageSrc: '/svg/notification.svg' },
            { title: 'tribes', href: '/main/community/tribes', imageSrc: '/svg/notification.svg' },
            { title: 'chalenges', href: '/main/community/tribes', imageSrc: '/svg/notification.svg' },
        ]);
    }, []);


    return (
        <>
        { children }
        </>
    )


}