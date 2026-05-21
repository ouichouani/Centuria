"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../layout.tsx';
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Explore() {

    const { domain } = useContext(AppContext);
    const [data, setData] = useState();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {

                const response = await fetch(`${domain}/posts`, {
                    method: "GET",
                    credentials: "include", // store the cookie from the response
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                });

                const result = await response.json();
                console.log(result);

                if (response.ok) setData(result.data);
            } catch (error) {
                console.error('error from console : ' + error);
            }
        })()
        }, []);

    return (
        <>
            {data?.map((item , key) =>
                <h2> - {item.content}</h2>
            )}

        </>
    )
}