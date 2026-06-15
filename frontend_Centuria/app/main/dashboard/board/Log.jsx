"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'

export default function Log({ habit, index_date }) {

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const [log , setLog] = useState(habit.last_log) ;
    const [done, setDon] = useState(new Date(log?.completed_date).setHours(0, 0, 0, 0) == index_date);
    const [loading, setLoading] = useState(false);
    
    // fetch the last 3 logs 
    useEffect(()=>{
        async function habitHistory(){
            setLoading(true) ;
            const response = await fetch(`${domain}/logs/${habit.id}/history`, {
                method: "GET",
                credentials: "include", // send cookies with request
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
            setLog(result.logs[0]) ;
            setLoading(false) ;
        }

        habitHistory() ;
    } , [done]) ;

    function DeleteLog(e) {

        e.preventDefault();
        if (loading == true) return;
        setLoading(true) ;


        async function DeleteLogRequest() {

            const response = await fetch(`${domain}/logs/${log.id}/destroy`, {
                method: "DELETE",
                credentials: "include", // send cookies with request
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
            console.log(result);
            if(response.ok && response.ok ) setDon(prev => !prev);
            setLoading(false) ;
        }

        DeleteLogRequest();
    }

    function StoreLog(e) {

        e.preventDefault();
        if (loading == true) return;
        setLoading(true) ;


        async function StoreLogRequest() {
            const task_id = e.target[0].value;

            const response = await fetch(`${domain}/habits/done`, {
                method: "POST",
                credentials: "include", // send cookies with request
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task_id: task_id,
                    notes: null
                })
            });

            const result = await response.json();
            if(response.ok && response.ok ) setDon(prev => !prev);
            console.log(result);
            setLoading(false) ;
        }

        StoreLogRequest();
    }

    return (
        <>
            {!done ?

                <td className="border-x border-solid border-[#86878b] min-w-[25px] h-[25px] text-center cursor-pointer">
                    <form onSubmit={StoreLog} className="w-full h-full">
                        <input type="hidden" name="task_id" value={habit?.id} />
                        <button className="cursor-pointer flex items-center justify-center w-full h-full h-[25px]">
                            <img src="/svg/ok.svg" className="w-[15px] pointer-events-none" alt="" />
                        </button>
                    </form>
                </td>
                :
                <td className="border-x border-solid border-[#86878b] min-w-[25px] h-[25px] text-center bg-green-800 cursor-pointer">
                    <form onSubmit={DeleteLog} className="w-full h-full">
                        <button className="cursor-pointer flex items-center justify-center w-full h-full h-[25px]">
                            <img src="/svg/ok.svg" className="w-[15px] m-auto pointer-events-none" alt="" />
                        </button>
                    </form>
                </td>
            }
        </>
    )
}