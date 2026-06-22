'use client'
import { useContext, useEffect, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'

export default function TostsComponent() {


    const { toastNotification } = useContext(AppContext);


    return (

        <div className="absolute top-0 left-0 -translate-x-[120%] rounded-b-lg min-w-[300px] w-fit  max-h-fit px-3 bg-[#151b23]/80 backdrop-blur-xs transition-all duration-300 ">

            <div className="flex flex-col">
                {toastNotification.map((item) =>

                    <div key={item.id} className={`flex gap-3 items-center animate-[toastIn_0.5s_ease_forwards] 
                        ${item.removing ? "animate-[toastOut_0.5s_forwards]" : "animate-[toastIn_0.5s_forwards]"}`}>

                        <div className="rounded-full w-3 h-3" style={{ background: item.color }}></div>
                        <p>{item.message}</p>
                    </div>

                )}
            </div>
        </div>
    )

}