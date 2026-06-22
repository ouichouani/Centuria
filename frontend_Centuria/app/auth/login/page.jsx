"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'
import { useRouter } from "next/navigation";


export default function Login() {
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const { setUser } = useContext(AppContext);
    const [data, setData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState();
    const router = useRouter();




    function handleChange(e) {
        setErrors("");
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
                if (response.status == 401) setErrors("invalid credentials");
                if (response.status == 500) setErrors("server error , pleas try later");


                if (response.ok) {
                    setUser(result.user);
                    router.push("/main/dashboard/board");
                }

            } catch (error) {
                console.error('llll' + error);
            }
        })();

        setData({ email: '', password: '' });
    }

    async function handleClickGoogle() {
        try {
            const response = await fetch(`${domain}/auth/google`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            // console.log(response);
            const data = await response.json();
            console.log(data);
        } catch (error) {

            console.log('google : ', error)
        }
    }
    async function handleClickGithub() {
        const response = await fetch(`${domain}/auth/github`);
        const data = await response.json();
        console.log(data);
    }
    async function handleClickFacebook() {
        const response = await fetch(`${domain}/auth/facebook`);
        const data = await response.json();
        console.log(data);
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

                        <div className="bg-red -500 flex justify-center">
                            <div className="w-fit bg-green- 500 flex items-center gap-3 pt-10">
                                <Link href={`${domain}/auth/google`}>
                                    <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48">
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    </svg>
                                </Link>

                                <Link href={`${domain}/auth/github`}>
                                    <svg className="cursor-pointer" onClick={handleClickGithub} xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0px" y="0px" width="38" height="38" viewBox="0 0 30 30">
                                        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                    </svg>
                                </Link>

                                <Link href={""}>
                                    <svg className="cursor-pointer" onClick={handleClickFacebook} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                        <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </div>


        </main>
    )
}