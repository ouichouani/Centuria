'use client';
// import { cookies } from "next/headers";
import AcceptFriendRequestButton from '@/components/requests/AcceptFriendRequestButton.jsx'
import RejectFriendRequestButton from '@/components/requests/RejectFriendRequestButton.jsx'
import DeleteFriendRequestButton from '@/components/requests/DeleteFriendRequestButton.jsx'
import { useEffect, useState } from 'react';

export default function inbox() {

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const [friendRequests , setFriendRequests] = useState([]) ;

    async function fetchRequests() {
        const response = await fetch(`${domain}/requests`, {
            credentials: "include",
            headers: {
                "Accept": "application/json",
            },
        });
        const data = await response.json();
        setFriendRequests(data.friendRequests)
        console.log(data)
    }

    useEffect(()=>{
        fetchRequests() ;
    } , []) ;


    return (
        <section className="mx-auto w-full max-w-5xl pt-10">

            <div className="flex flex-col gap-2">
                {friendRequests?.length ?
                    friendRequests.map((f) =>
                        <article key={f.id} className={`rounded-2xl border border-white/10 bg-[#151b23] p-2 md:p-4 shadow-lg transition
                         ${(f.status == 'accepted' || f.status == 'rejected') && "opacity-40 hover:opacity-100"}`} >
                            <div className="flex justify-between items-center md:gap-5 lg:flex-row lg:items-center lg:justify-between">

                                <div className="flex items-start gap-4">
                                    <img src={f.sender?.image?.url || '/images/blank-profile.webp'}
                                        alt={f.sender?.name ?? 'undefind'}
                                        className={`h-10 w-10 md:w-16 md:h-16 rounded-full border border-white/20 bg-[#0d1117] object-cover outline outline-solid outline-[2px]
                                        ${f.status == 'accepted' && "outline-green-500"}
                                        ${f.status == 'rejected' && "outline-red-500"}`} />

                                    <div>
                                        <a href="{$f.sender?.id && route('users.show', $f.sender?.id) }">
                                            <p className="md:text-lg text-md font-semibold text-white">{f.sender?.name ?? 'undefined'}</p>
                                            <p className="mt-1 md:text-sm text-xs  text-[#9198a1]">{f.sender?.email ?? 'undefined'}</p>
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {f.status == 'pending' &&
                                        <>
                                            <AcceptFriendRequestButton id={f.id} setFriendRequests={setFriendRequests} />
                                            <RejectFriendRequestButton id={f.id} setFriendRequests={setFriendRequests}/>
                                        </>
                                    }

                                    {(f.status == 'rejected' || f.status == 'accepted') && <DeleteFriendRequestButton id={f.id} setFriendRequests={setFriendRequests} />}
                                </div>

                            </div>
                        </article>

                    ) :
                    <div className="rounded-2xl border border-dashed border-white/15 bg-[#151b23] p-8 text-center shadow-lg">
                        <p className="text-base text-[#9198a1]">there is no pending received req</p>
                    </div>
                }
            </div>

        </section>
    )
}