'use client';
import { useEffect, useRef, useState } from "react";

export default function CreateReportModel({ post, setIsModelOpen }) {

    // post CONTAIN THE DATA OF POST OBJ .
    // USED HERE TO GET THE POST ID AND CREATE THE REPORT 

    // setIsModelOpen IS A STATE THAT OPEN OR CLOSE THE MODEL IN PARENT COMPONENT


    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({ type: "spam", description: '' });

    // USED TO FOCUS ON THE ELEMENT (textarea) ONCE THE COMPONENT GET DISPLAYED
    const textareaRef = useRef();


    async function handleChange(e) {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${domain}/reports`, {
                method: "POST",
                credentials: "include", // store the cookie from the response
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    post_id: post.id,
                    ...data
                })
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) setIsModelOpen(prev => !prev);

        } catch (error) {
            console.error('AYAYAAAY' + error);
        }

    }

    function handleClick() {
        setIsModelOpen(prev => !prev);
    }

    useEffect(() => {
        // ONCE THE COMPONENT RENDERED . FOCUS ON THE textarea
        textareaRef.current?.focus();
    }, []);

    return (
        <section className="mx-auto w-fit max-w-4xl px-4 py-6">
            <div className="mb-6 rounded-2xl border border-white/10 bg-[#151b23] px-6 py-5 shadow-lg flex gap-3">
                <img src={post.user.image?.url ?? '/images/blank-profile.webp'} alt=""
                    className="h-15 w-15 rounded-full" />
                <div>
                    <h2 className="text-xl font-bold tracking-wide text-white">Create a report from {post.user.name}'s post </h2>
                    <p className="mt-2 text-sm text-[#9198a1]">
                        Explain what is wrong with this post and choose the reason that matches best.
                    </p></div>
            </div>

            <form className="rounded-2xl border border-white/10 bg-[#151b23] p-6 shadow-lg" onSubmit={handleSubmit}>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label htmlFor="type" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Report type</span>
                            <select name="type" id="type" onChange={handleChange} value={data?.type}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white focus:bg-transparent focus:outline-blue-500 focus:outline-2">
                                <option className="bg-[#151b23] text-white" value="spam">spam</option>
                                <option className="bg-[#151b23] text-white" value="harassment">harassment</option>
                                <option className="bg-[#151b23] text-white" value="hate_speech">hate_speech</option>
                                <option className="bg-[#151b23] text-white" value="violence">violence</option>
                                <option className="bg-[#151b23] text-white" value="nudity">nudity</option>
                                <option className="bg-[#151b23] text-white" value="misinformation">misinformation</option>
                                <option className="bg-[#151b23] text-white" value="copyright">copyright</option>
                                <option className="bg-[#151b23] text-white" value="scam">scam</option>
                                <option className="bg-[#151b23] text-white" value="other">other</option>
                            </select>
                        </label>
                        <div className="mt-2 text-sm text-red-400">{errors?.type}</div>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="description" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Description</span>
                            <textarea id="description" name="description" rows="7" placeholder="describe the problem" onChange={handleChange} value={data?.description} style={{ resize: 'none' }} ref={textareaRef}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white placeholder:text-[#9198a1] focus:bg-transparent focus:outline-blue-500 focus:outline-2"></textarea>
                        </label>
                        <div className="mt-2 text-sm text-red-400">{errors?.description}</div>
                    </div>
                </div>

                <input type="hidden" name="post_id" value="{{ $post_id }}" />

                <div className="mt-8 flex justify-end gap-3">
                    <button type="button" onClick={handleClick}
                        className="cursor-pointer rounded-lg border border-white/10 bg-[#151b23] px-6 py-2 text-sm font-medium text-[#9198a1] transition hover:border-white/20 hover:text-white">
                        back
                    </button>
                    <button type="submit"
                        className="cursor-pointer rounded-lg border border-red-400/30 bg-red-500/10 px-6 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20">
                        report
                    </button>
                </div>
            </form>
        </section>
    )
}