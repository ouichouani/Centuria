"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Login() {

    const { setUser , domain} = useContext(AppContext);
    const [data, setData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState();
    const router = useRouter();




    function handleChange(e) {
        setErrors("") ;
        let { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        (async () => {
            try {

                const response = await fetch(`${domain}/login`, {
                    method: "POST",
                    credentials: "include", // store the cookie from the response
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password.trim()
                    })
                });

                const result = await response.json();
                if( response.status == 401) setErrors("invalid credentials") ;
                if( response.status == 500) setErrors("server error , pleas try later") ;


                if (response.ok) {
                    setUser(result.user);
                    router.push("/main/dashboard/board");
                }

            } catch (error) {
                console.error('llll' + error);
            }
        })();

        setData({email : '' , password : ''}) ;
    }

    return (
        
        <main className="w-full h-screen bg-[#0d1117] text-white">
            <div className="lg:flex h-full items-center">

                <section className="h-[50%] w-[50%] pl-[10vw] hidden lg:flex flex-col gap-8 border-r border-solid border-white/30 ">
                    <h1 className="text-[3.3em] font-bold">BACK IN ACTION</h1>
                    <p className="text-[#9198a1] pl-[10px] w-[90%] ">Great to see you again! Your habits define your future, and
                        you’ve just made the best choice of the day by showing up for yourself. Ready to tick off some goals
                        and crush your streaks? Let’s get to work!</p>
                </section>

                <section className="lg:h-[70%] lg:w-[50%] w-full h-full flex justify-center items-center ">
                    <div className="w-[60%] h-fit">
                        <h1 className="text-[2em] font-bold mb-10">LOGIN</h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                            <div>
                                <label htmlFor="email" className="flex flex-col gap-2">
                                    <p>Email</p>
                                    <input id="email" type="email" name="email" value={data?.email} onChange={handleChange} required
                                        className="p-1 px-2 bg-[#151b23] border border-solid border-white/20 rounded-lg focus:bg-transparent focus:outline-blue-500 focus:outline-2 " />
                                </label>

                                <div className='text-red-700 pt-2' >{errors}</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name="password" value={data?.password} onChange={handleChange} required
                                    className="p-1 px-2 bg-[#151b23] border border-solid border-white/20 rounded-lg focus:bg-transparent focus:outline-blue-500 focus:outline-2 " />
                            </div>

                            <button type="submit" className="p-1 w-[50%] m-auto bg-[#151b23] border border-solid border-white/20 rounded-lg hover:bg-green-500/20 " >Let's go</button>
                        </form>

                        <p className="text-center mt-5 text-[#9198a1]">
                            Don't have an account ?
                            <Link className="hover:text-white px-2" href={"/auth/register"}>Register</Link>

                        </p>
                    </div>
                </section>

            </div>


        </main>
    )
}