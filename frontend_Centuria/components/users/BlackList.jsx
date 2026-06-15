'use client';
import { useEffect, useState } from "react";
import ListUsers from "@/components/users/ListUsers.jsx";
import SearchUser from "@/components/users/SearchUser.jsx";



export default function BlackList() {

    const [blackList, setBlackList] = useState([]);
    const [errors, setErrors] = useState({});
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;


    async function fetchBlacklist() {

        const response = await fetch(`${domain}/blackList`, {
            method: "GET",
            credentials: "include", // store the cookie from the response
            headers: {
                "Accept": "application/json",
            },
        });

        const result = await response.json();
        if (response.ok) setBlackList(result.blackList);
        if (!response.ok) setErrors({ ...result.errors });
    }

    useEffect(() => { fetchBlacklist() }, [])


    return (
        <>
            <SearchUser ListUsers={blackList} setUserList={setBlackList}/>
            {blackList?.length ?
                blackList.map((user) => <ListUsers key={user.id} user={user} setBlackList={setBlackList} /> ) 
                :
                <div className="rounded-2xl border border-dashed border-white/15 bg-[#151b23] p-8 text-center shadow-lg">
                    <p className="text-base text-[#9198a1]">no banned users</p>
                </div>
            }
        </>
    )

}