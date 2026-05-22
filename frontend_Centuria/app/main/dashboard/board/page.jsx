"use client" ;

import { useContext, useEffect } from "react";
import { AppContext } from  '@/context/AppContext.jsx'


export default function board(){


    const { setUser , domain} = useContext(AppContext);

    useEffect(()=>{

            (async () => {
            try {
                const response = await fetch(`${domain}/dashboard`, {
                    credentials: "include", // store the cookie from the response
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                // if( response.status == 401) setErrors("invalid credentials") ;
                // if( response.status == 500) setErrors("server error , pleas try later") ;


                if (response.ok) {
                    console.log(result)
                    // setUser(result.user);
                    // router.push("/main/dashboard/board");
                }

            } catch (error) {
                console.error(error);
            }
        })()
    }, []) ;




    return <h1>board</h1>
}