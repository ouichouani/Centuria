"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


export default function register() {

    const { user , setUser, domain } = useContext(AppContext);
    const [data, setData] = useState({ email: '', password: '' , name : '' , password_confirmation : ''});
    const [errors, setErrors] = useState({general : '' ,email: '', password: '' , name : '' , password_confirmation : '' });
    const router = useRouter();


    function handleChange(e) {
        setErrors("");
        let { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));  
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors({general : '' ,email: '', password: '' , name : '' , password_confirmation : '' }) ;

        (async () => {
            try {

                const response = await fetch(`${domain}/register`, {
                    method: "POST",
                    credentials: "include", // store the cookie from the response
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password.trim(),
                        password_confirmation: data.password_confirmation.trim(),
                        name: data.name.trim(),
                    })
                });

                const result = await response.json();
                if (response.status == 401) setErrors({general : "invalid credentials"});
                if (response.status == 500) setErrors({general :"server error , pleas try later"});                
                if (response.status == 422) setErrors(prev => ({...prev , ...result.errors })) ;
                console.log(response.status)

                // clear all inputs with an error 
                let toRemoveFromData = {}
                for (let i in result?.errors ) toRemoveFromData[i] = '' ; 
                setData( prev => ({ ... prev, ...toRemoveFromData }));

                if (response.ok) {
                    setUser(result.user);
                    router.push("/main/dashboard/board");
                }

            } catch (error) {
                console.error('error from console : ' + error);
            }
        })();


    }

    return (
        <main className="w-full h-screen bg-[#0d1117] text-white">
            <div className="flex h-full items-center">

                <section className="h-[50%] w-[50%] pl-[10vw] lg:flex hidden flex-col gap-8 border-r border-solid border-white/30">

                    <h1 className="text-[3.3em] font-bold">WELCOM, WARRIOR</h1>
                    <p className="text-[#9198a1] pl-[10px] w-[90%] ">Hi there! Welcome to Habit Trackr.<br /> We’re so excited to
                        help you start crushing your goals! Whether you're here to build new habits or just keep your daily
                        tasks on track, you've got a whole community behind you.
                        <br /> <br />Time to lock in and get to work!
                    </p>

                </section>

                <section className="lg:h-[70%] lg:w-[50%] w-full h-full flex justify-center items-center ">
                    <div className="w-[60%] h-fit">
                        <h1 className="text-[2em] font-bold mb-10">REGISTER</h1>
                        {/* <div className='text-red-700 pt-2' >{errors?.general}</div> */}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-h-[60vh] px-3 overflow-auto [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-thumb]:bg-blue-500">

                            <div>
                                <label htmlFor="Name" className="flex flex-col gap-2">
                                    <p>Name</p>
                                    <input id="Name" type="text" name="name" value= {data?.name} onChange={handleChange} required
                                        className="p-1 px-2 bg-[#151b23] border border-solid border-white/20 rounded-lg focus:bg-transparent focus:outline-blue-500 focus:outline-2 " />
                                </label>

                                <div className='text-red-700' >{errors?.name?.[0]}</div>
                            </div>

                            <div>
                                <label htmlFor="email" className="flex flex-col gap-2">
                                    <p>Email</p>
                                    <input id="email" type="email" name="email" value= {data?.email} onChange={handleChange} required
                                        className="p-1 px-2 bg-[#151b23] border border-solid border-white/20 rounded-lg focus:bg-transparent focus:outline-blue-500 focus:outline-2 " />
                                </label>

                                <div className='text-red-700' >{errors?.email?.[0]}</div>

                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name="password"  value= {data?.password} onChange={handleChange} required
                                    className="p-1 px-2 bg-[#151b23] border border-solid border-white/20 rounded-lg focus:bg-transparent focus:outline-blue-500 focus:outline-2 " />
                                <div className='text-red-700' >{errors?.password?.[0]}</div>

                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                <input id="password_confirmation" type="password" name="password_confirmation"  value= {data?.password_confirmation} onChange={handleChange} required
                                    className="p-1 px-2 bg-[#151b23] border border-solid border-white/20 rounded-lg focus:bg-transparent focus:outline-blue-500 focus:outline-2 " />
                                <div className='text-red-700' >{errors?.password_confirmation?.[0]}</div>

                            </div>

                            <button type="submit" className="p-1 w-[50%] m-auto bg-[#151b23] border border-solid border-white/20 rounded-lg hover:bg-green-500/20 ">
                                Let's get to work
                            </button>

                        </form>

                        <p className="text-center mt-5 text-[#9198a1]">
                            already have an account ?
                            <Link className="hover:text-white px-2" href={"/auth/login"}>Login</Link>
                        </p>
                    </div>
                </section>

            </div>
        </main>
    )
}