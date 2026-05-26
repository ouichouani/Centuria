"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'


export default function board() {
    const { setUser, domain } = useContext(AppContext);
    const [data, setData] = useState();

    const now = new Date();
    const currentDate = now.toLocaleDateString(); // 'DD/MM/YYYY'
    const today = now.getDate(); // 26
    const todayName = now.toLocaleDateString("en-US", { weekday: "long", }); // ltniin hhhh 

    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const daysInMonths = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    let current_log_index = 0
    // fill the days in month array by days in month as objects
    const daysInMonth = [];
    for (let i = 1; i <= daysInMonths; i++) daysInMonth.push(new Date(thisYear, thisMonth, i));


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${domain}/dashboard`, {
                    credentials: "include", // send cookies with request
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                if (response.ok) {
                    console.log("result : ", result);
                    setData(result);
                }

            } catch (error) {
                console.error(error);
            }
        })()
    }, []);


    function DeleteLog(e) {
        e.preventDefault();

        async function DeleteLogRequest() {
            const log_id = e.target[0].value;

            const response = await fetch(`${domain}/logs/${log_id}/destroy`, {
                method: "DELETE",
                credentials: "include", // send cookies with request
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
            console.log(result);
        }

        DeleteLogRequest() ;
    }

    async function StoreLog(e) {

        e.preventDefault();

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
            console.log(result);
        }

        StoreLogRequest()
    }


    return (
        <section className="space-y-4">
            {!data?.habits ?
                <div className="border border-solid border-white/30 rounded-4xl bg-[#151b23] px-6 py-10 text-center text-white/70">
                    <p>No habits yet.</p>
                    <a href="{{ route('habits.create') }}" className="mt-4 inline-block text-blue-400 underline">Create your first habit</a>
                </div>
                : <>
                    <div
                        className="rounded-2xl border border-white/30 bg-[#151b23] px-6 py-10 text-center text-white md:hidden portrait:block landscape:hidden">
                        <h2 className="text-lg font-semibold">Rotate your phone</h2>
                        <p className="mt-2 text-sm text-white/70">Turn your phone sideways to view the habit board.</p>
                    </div>

                    <div className="hidden md:block landscape:block">
                        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-thumb]:bg-blue-500">
                            <div className="flex justify-center items-center min-w-max">
                                <table className="">
                                    <thead className="">
                                        <tr className="border border-[#86878b]">
                                            <td className="px-3 min-w-[25px] bg-[#151b23] sticky left-[0px] block m-0 border-x">habits</td>
                                            {daysInMonth.map((i, key) =>
                                                <td key={key} className="border border-solid border-[#86878b] min-w-[25px] text-center bg-[#151b23]">{i.getDate()}</td>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data?.habits.map((h, key) =>

                                            <tr key={key} className="border border-[#86878b] bg-[#0d1117] hover:bg-[#23262d] hover:border-blue-400">
                                                <td className="px-3 min-w-[25px] bg-inherit sticky left-[0px] block m-0 border-x"> <a href="{{ route('habits.show' , $h->id) }}">{h.title}</a></td>
                                                {daysInMonth.map((i, key) =>
                                                    <>
                                                        {(currentDate > i.toLocaleDateString() && h.frequency.includes(todayName) && new Date(h.created_at).toLocaleDateString() <= i.toLocaleDateString()) ?

                                                            (h.logs[current_log_index] && new Date(h.logs[current_log_index].completed_date).toLocaleDateString() == i.toLocaleDateString()) ?

                                                                <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] text-center bg-green-800">
                                                                    {current_log_index++}
                                                                    <img src="/svg/ok.svg" className="w-[15px] m-auto" alt="" />
                                                                </td>
                                                                :
                                                                <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] text-center bg-red-800">
                                                                    <img src="/svg/x.svg" className="w-[15px] m-auto" alt="" />
                                                                </td>

                                                            : (currentDate == i.toLocaleDateString() && h.frequency.includes(todayName)) ?

                                                                new Date(h.last_log?.completed_date).toLocaleDateString() != i.toLocaleDateString() ?

                                                                    <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] text-center cursor-pointer">
                                                                        <form onSubmit={StoreLog}>
                                                                            <input type="hidden" name="task_id" value={h.id} />
                                                                            <button className="cursor-pointer">
                                                                                <img src="/svg/ok.svg" className="w-[15px] pointer-events-none" alt="" />
                                                                            </button>
                                                                        </form>
                                                                    </td>
                                                                    :
                                                                    <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] text-center bg-green-800 cursor-pointer">
                                                                        <form onSubmit={DeleteLog}>
                                                                            <input type="hidden" name="log_id" value={h.last_log.id} />
                                                                            <button className="cursor-pointer">
                                                                                <img src="/svg/ok.svg" className="w-[15px] m-auto pointer-events-none" alt="" />
                                                                            </button>
                                                                        </form>
                                                                    </td>
                                                                :
                                                                <td className="border-x border-solid border-[#86878b] min-w-[25px] text-center"></td>
                                                        }
                                                        {i == daysInMonth[-1] ? current_log_index = 0 : ''}

                                                    </>
                                                )}

                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }

        </section>
    )
}