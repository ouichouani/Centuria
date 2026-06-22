'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext.jsx'


export default function callback() {
    // const params = useSearchParams() ;
    const router = useRouter();
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const { setUser } = useContext(AppContext);


    async function fetchauthUser() {
        const response = await fetch(`${domain}/profile`, {
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
            }
        });

        const data = await response.json();
        if (response.ok) {
            setUser(data.user);
            router.push("/main/dashboard/board");
        }
    }

    useEffect(() => {
        fetchauthUser() ;
    }, [])


    return (
        <h1>jari lmo3alaja ... </h1>
    )
}