"use client";

import Link from "next/link";
import NavProvider, { NavContext } from '@/context/NavContext.jsx'
import { useContext, useEffect } from 'react';

export default function ExploreLayout({ children }) {

    const { setNav } = useContext(NavContext);

    useEffect(() => {
        setNav([
            { title: 'posts', href: '/main/community/posts', imageSrc: '/svg/posts.svg' },
            { title: 'network', href: '/main/community/network', imageSrc: '/svg/network.svg' },
            { title: 'tribes', href: '/main/community/tribes', imageSrc: '/svg/tribes.svg' },
            { title: 'chalenges', href: '/main/community/tribes', imageSrc: '/svg/chalenges.svg' },
        ]);
    }, []);


    return (
        <>
        { children }
        </>
    )


}