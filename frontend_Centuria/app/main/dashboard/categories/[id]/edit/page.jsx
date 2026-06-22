"use client";
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext.jsx'
import { useContext, useEffect, useState } from 'react';


export default function UpdateHabit() {

    const { id } = useParams();
    const { notify } = useContext(AppContext);
    const [errors, setError] = useState({});
    const [category, setCategory] = useState({ title: "", color: "", description: "" })
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const router = useRouter();


    async function getCategories() {
        const response = await fetch(`${domain}/categories/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "accept": "Application/json",
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        setCategory(data.category);
    }

    useEffect(() => {
        getCategories();
    }, []);

    function handleChange(e) {

        const { name, value } = e.target
        setError(prev => ({ ...prev, [name]: "" }));
        setCategory(prev => ({ ...prev, [name]: value }));
    }

    async function handlSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${domain}/categories/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "accept": "Application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
            });


            const data = await response.json();
            console.log(data.errors)
            if (response.ok) {
                notify('category is updated');
                return router.push(`/main/dashboard/categories/${id}`);
            }
            if (!response.ok) setError(data.errors)

        } catch (error) {
            console.log("error -.", error)
        }

    }


    return (
        <section className="mx-auto w-full max-w-4xl py-6">
            <div className="mb-6 rounded-2xl border border-white/10 bg-[#151b23] px-6 py-5 shadow-lg">
                <h2 className="text-xl font-bold tracking-wide text-white">Edit category</h2>
                <p className="mt-2 text-sm text-[#9198a1]">
                    Update your category with the same clean form style used across the app.
                </p>
            </div>

            <form className="rounded-2xl border border-white/10 bg-[#151b23] p-6 shadow-lg" onSubmit={handlSubmit}>

                <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label htmlFor="title" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Title</span>
                            <input id="title" type="text" name="title" value={category?.title} onChange={handleChange} placeholder="title"
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white placeholder:text-[#9198a1] focus:bg-transparent focus:outline-blue-500 focus:outline-2" />
                        </label>
                        <div className="mt-2 text-sm text-red-400">{errors?.title}</div>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="color" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Color</span>
                            <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-[#0d1117] px-3 py-2">
                                <input id="color" type="color" name="color" value={category?.color} onChange={handleChange}
                                    className="h-5 w-5 cursor-pointer rounded-full border border-white/20 bg-transparent" />
                                <span className="text-sm text-[#9198a1]">Choose the category color</span>
                            </div>
                        </label>

                        <div className="mt-2 text-sm text-red-400">{errors?.color}</div>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="description" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Description</span>
                            <textarea id="description" name="description" placeholder="description" rows="7" value={category?.description} onChange={handleChange}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white placeholder:text-[#9198a1] focus:bg-transparent focus:outline-blue-500 focus:outline-2"></textarea>
                        </label>

                        <div className="mt-2 text-sm text-red-400">{errors?.description}</div>

                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        className="rounded-lg border border-white/20 bg-[#0d1117] px-6 py-2 text-sm font-medium text-white transition hover:bg-green-500/20">
                        update
                    </button>
                </div>
            </form>
        </section>

    )

}