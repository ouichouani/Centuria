"use client";
import Link from 'next/link';
import { useState } from 'react';


export default function Task({ task, color }) {

    const [done, setDone] = useState(task.done);
    const checkboxColor = color ? color : '#ddd';


    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    let allowedToClick = true;



    async function handlCheck() {
        console.log('click')
        allowedToClick = false ;


        const response = await fetch(`${domain}/tasks/${task.id}/done`, {
            credentials: 'include',
            method: "POST",
            headers: {
                "accept": "Application/json",
                "Content-Type": "application/json",
            }
        });

        const data = response.json();
        if (response.ok) {
            setDone(prev => !prev)
            allowedToClick = true;
        }

        if(!response.ok) console.log(data) ;
    }

    return (

        <label htmlFor="" className="flex gap-2 items-center ">

            <button onClick={handlCheck} className="cursor-pointer w-[17px] h-[17px] flex items-center justify-center rounded-full border border-2 border-solid border-[#9198a1] opacity-[.8] hover:opacity-[1] " style={{ borderColor: checkboxColor }}>
                {!done ?
                    <div className="none w-full h-full flex items-center justify-center rounded-full border border-2 border-solid border-black opacity-[0] hover:opacity-[1] transition" style={{ background: checkboxColor }}>
                    </div>
                    :
                    <svg className='min-w-[12px] min-h-[12px]' width="12px" height="12px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier" > <defs style={{ fill: "#ffffff" }}> <style>.cls-1</style> </defs> <g id="check"> <path className="cls-1" d="M12.16,28a3,3,0,0,1-2.35-1.13L3.22,18.62a1,1,0,0,1,1.56-1.24l6.59,8.24A1,1,0,0,0,13,25.56L27.17,4.44a1,1,0,1,1,1.66,1.12L14.67,26.67A3,3,0,0,1,12.29,28Z" /> </g> </g>
                    </svg>
                }
            </button>

            <Link href={`/main/dashboard/tasks/${task.id}`} className='flex items-center gap-2 w-fit'>
                <p className="text-md" style={done ? { textDecoration: 'line-through', color: '#9198a1', opacity: .7 } : {}}>{task.title}</p>
            </Link>
        </label>
    )
}