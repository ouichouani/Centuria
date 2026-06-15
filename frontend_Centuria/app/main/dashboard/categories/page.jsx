"use client";
import Link from "next/link";
import { AppContext } from '@/context/AppContext';
import { useContext, useState, useEffect } from 'react';



export default function categories() {
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const { user, pathname } = useContext(AppContext);
    const [categories, setCategories] = useState();

    async function getCategories() {
        const response = await fetch(`${domain}/categories`, {
            method: "GET",
            credentials: "include",
            headers: {
                "accept": "Application/json",
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        console.log(data.categories)
        setCategories(data.categories);
    }

    useEffect(() => {
        getCategories();
    }, []);



    return (
        <section className="mx-auto w-full max-w-6xl py-6">
            <div className="relative w-full pt-15">

                <div className="flex gap-3 absolute top-[0px] right-[0px] ">
                    <Link href={"/main/dashboard/categories/create"} className="p-2 bg-[#151b23] border border-solid border-white/30 rounded-lg transition hover:border-white/60">add category</Link>
                </div>

                <section className="flex flex-col gap-3">

                    {pathname.includes('/main/dashboard/categories') &&
                        <section className='border border-white/30 border-solid rounded-lg p-[20px] flex flex-col gap-15 '>
                            <div className="flex flex-col gap-5">
                                <h2 className="text-3xl font-bold">Private categories</h2>
                                <p className="text-[#9198a1] pl-[10px] w-[80%]">this section is visible only tho the you , no one
                                    can
                                    see
                                    your categories and no one can modify them . </p>
                            </div>

                            <div className="flex flex-col gap-7">
                                {categories?.map((c, key) =>
                                    !c.is_global &&
                                    <div key={key} className="flex flex-col gap-3">
                                    <Link href={`/main/dashboard/categories/${c.id}`} className='flex items-center gap-2'>
                                        <div className="w-[12px] h-[12px] rounded-full border border-solid border-white"
                                            style={{ backgroundColor: c.color, height: "12px", width: "12px" }}>
                                        </div>
                                        <p>{c.title}</p>
                                    </Link>
                                        <p className="text-[#9198a1] w-[80%] pl-[10px]">&emsp;{c?.description} </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    }



                    <section className='border border-white/30 border-solid rounded-lg p-[20px] flex flex-col gap-15 bg-[#25171c] '>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-3xl font-bold">Global categories</h2>
                            <p className="text-[#9198a1] pl-[10px] w-[80%]">this section contain all used global categories in your tasks and habits </p>
                        </div>

                        <div className="flex flex-col gap-7">

                            {categories?.map((c, key) =>
                                c.is_global &&

                                <div key={key} className="flex flex-col gap-3">
                                    <Link href={`/main/dashboard/categories/${c.id}`} className='flex items-center gap-2'>
                                        <div className="w-[12px] h-[12px] rounded-full border border-solid border-white"
                                            style={{ backgroundColor: c.color, height: "12px", width: "12px" }}>
                                        </div>
                                        <p>{c.title}</p>
                                    </Link>
                                    <p className="text-[#9198a1] w-[80%] pl-[10px]">&emsp;{c.description} </p>
                                </div>

                            )}

                        </div>
                    </section>

                </section>
            </div >
        </section >
    )
}