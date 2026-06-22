
'use client'
import Link from "next/link";
import { NavContext } from '@/context/NavContext.jsx';
import { useContext, useEffect } from 'react';


export default function RequestLayout({children}) {

    const { setNav } = useContext(NavContext);

    useEffect(() => {

        setNav([
            {title: 'inbox', href: '/main/requests/inbox', imageSrc: '/svg/notification.svg' },
            {title: 'following', href: '/main/requests/following', imageSrc: '/svg/notification.svg' }, 
            {title: 'followers', href: '/main/requests/followers', imageSrc: '/svg/notification.svg' },
        ]) ;
        
    }, []);


    return (
    <>
        {children}
    </>
    )
}