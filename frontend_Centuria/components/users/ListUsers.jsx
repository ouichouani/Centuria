'use client';
import { useContext, useEffect, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'
import Link from 'next/link'



export default function ListUsers({ user, setBlackList }) {

    // this component show a list of users that we can (add friend , ban ) used in both black list and active users


    const { user: authUser } = useContext(AppContext);
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const ModeratorCanBan = (user.is_banned_by_moderator && authUser.role == 'Moderator' && user.role != 'Admin' && user.id != authUser.id)
    const AdminCanBan = (authUser.role == 'Admin' && user.role != 'Admin' && user.id != authUser.id);

    async function ban() {
        const response = await fetch(`${domain}/users/${user.id}/ban`, {
            method: "POST",
            credentials: "include", // store the cookie from the response
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
        });

        const result = await response.json();
        console.log(result)
        if (response.ok) setBlackList(prev => prev.filter(item => item.id != user.id))
    }


    return (
        
        <article key={user.id} className="rounded-2xl border border-white/10 bg-[#151b23] p-2  shadow-lg">
            <div className="flex gap-5 justify-between items-center lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">
                    <img src={user.image?.path || '/images/blank-profile.webp'}
                        alt={user.name}
                        className="h-10 w-10 md:h-16 md:w-16  rounded-full border border-white/20 bg-[#0d1117] object-cover" />

                    <div className="flex-1">

                        <Link href="{ route('users.show', user.id) }"
                            className={`md:text-lg text-md font-semibold transition hover:text-white ${user.is_banned ? "text-red-500" : "text-yellow-500"}`}>
                            {user.name}
                        </Link>

                        <p className="mt-1 text-sm text-[#9198a1]">{user.email}</p>
                        <p className="mt-1 text-sm text-[#9198a1]">rank : {user.score}</p>
                    </div>
                </div>


                <div className="flex flex-wrap gap-3">


                    {(ModeratorCanBan || AdminCanBan) &&
                        <button className="rounded-full cursor-pointer border border-red-400/30 bg-red-500/10  px-5 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
                            onClick={ban}>
                            {(user.is_banned || user.is_banned_by_moderator) ?
                                "unban"
                                :
                                "ban"
                            }
                        </button>
                    }
                </div>
            </div>
        </article>

    )
}