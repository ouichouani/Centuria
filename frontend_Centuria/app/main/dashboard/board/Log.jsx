"use client" ;
import { useContext, useEffect, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'

export default function Log({ habit , index , key}) {

    const { domain } = useContext(AppContext);
    const [data, setData] = useState();

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

        DeleteLogRequest();
    }

    function StoreLog(e) {

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
        <>
            {new Date(habit.last_log?.completed_date).toLocaleDateString() != index.toLocaleDateString() ?

                <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] text-center cursor-pointer">
                    <form onSubmit={StoreLog}>
                        <input type="hidden" name="task_id" value={habit.id} />
                        <button className="cursor-pointer">
                            <img src="/svg/ok.svg" className="w-[15px] pointer-events-none" alt="" />
                        </button>
                    </form>
                </td>
                :
                <td key={key} className="border-x border-solid border-[#86878b] min-w-[25px] text-center bg-green-800 cursor-pointer">
                    <form onSubmit={DeleteLog}>
                        <input type="hidden" name="log_id" value={habit.last_log.id} />
                        <button className="cursor-pointer">
                            <img src="/svg/ok.svg" className="w-[15px] m-auto pointer-events-none" alt="" />
                        </button>
                    </form>
                </td>
            }
        </>
    )
}