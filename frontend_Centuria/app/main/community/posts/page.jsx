"use client";
import { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'
import { useRouter } from 'next/navigation';



export default function CreatePost() {

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const [data, setData] = useState({ type: "Question", video: null, visibility: 'public', content: '', images: [] });
    const [previews, setPreviews] = useState([]);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const types = ['Question', 'History', 'Encouragement'];
    const visibilities = ['public', 'private', 'friends'];

    function handleChange(e) {

        const { name } = e.target;
        setErrors(prev => ({ ...prev, [name]: '' }));

        if (name == 'images[]') {
            const { files } = e.target;
            const imagesArray = [...data.images, ...Array.from(files)];
            setData(prev => ({ ...prev, video: null, images: imagesArray }));

            setPreviews(prev => ([...prev, ...Array.from(files).map(file => ({ file, url: URL.createObjectURL(file), }))]));

        } else if (name == "video") {
            const { files } = e.target;
            files[0].url = URL.createObjectURL(files[0]);
            setData(prev => ({ ...prev, video: files[0], images: [] }));
            setPreviews([]);

        } else {
            const { value } = e.target;
            setData(prev => ({ ...prev, [name]: value }));
        }

    }

    async function handleSubmit(e) {

        e.preventDefault();
        const formData = new FormData();

        for (let item in data) {
            if (item == "images") {
                data[item]?.forEach(element => {
                    if (element instanceof File) {
                        formData.append('images[]', element);
                    }
                });
            } else if (item == 'video') {
                if (data[item] instanceof File) formData.append("video", data.video);
            } else {
                formData.append(item, data[item]);
            }
        }


        try {

            const response = await fetch(`${domain}/posts`, {
                method: "POST",
                credentials: "include", // store the cookie from the response
                headers: {
                    "Accept": "application/json",
                },
                body: formData
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) router.push('/main/profile');
            if (!response.ok) setErrors({ ...result.errors });


        } catch (error) {
            console.error('llll' + error);
        }
    }

    function removeImage(preview) {
        // FIND THE FILE
        const file = previews.filter((item) => item.url == preview.url);

        // UPDATE THE PREVIEWS STATE
        setPreviews(prev => prev.filter((item) => item.url != preview.url));

        // FILTER THE DATA STATE
        const newImagesArray = data.images.filter(item => (item.name != file[0].file.name && item.lastModified != file[0].file.lastModified))
        setData(prev => ({ ...prev, images: newImagesArray }))
    }

    function removeVideo() {
        setData(prev => ({ ...prev, video: null }));
    }


    return (
        <section className="mx-auto w-full max-w-4xl">
            <div className="mb-6 rounded-2xl border border-white/10 bg-[#151b23] px-6 py-5 shadow-lg">
                <h2 className="text-xl font-bold tracking-wide text-white">Create a new post</h2>
                <p className="mt-2 text-sm text-[#9198a1]">
                    Fill in the details below to publish a post with the same clean workflow used across the app.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="relative rounded-2xl border border-white/10 bg-[#151b23] p-6 shadow-lg">
                <div className={(previews.length || data.video) ? 'grid gap-2 md:grid-cols-2' : ""}>
                    <div className="grid gap-5 md:grid-cols-2 h-fit">

                        <div className="md:col-span-2">
                            <label htmlFor="content" className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-white">Post content</span>
                                <textarea name="content" id="content" rows="8" placeholder="write your post here" onChange={handleChange} value={data?.content}
                                    className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white placeholder:text-[#9198a1] focus:bg-transparent focus:outline-blue-500 focus:outline-2"></textarea>
                            </label>
                            {/* <p className="mt-2 text-sm text-[#9198a1]">You can leave this empty if you upload images instead.</p> */}
                            <div className="mt-2 text-sm text-red-400">{errors?.content && errors?.content[0]}</div>
                        </div>

                        <div>
                            <label htmlFor="type" className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-white">Post type</span>
                                <select name="type" id="type" required onChange={handleChange} value={data.type}
                                    className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white focus:bg-transparent focus:outline-blue-500 focus:outline-2">
                                    <option className="bg-[#151b23] text-white" disabled >Choose type</option>
                                    {types.map((type, key) =>
                                        <option key={key} className="bg-[#151b23] text-white" value={type} >{type}</option>
                                    )}
                                </select>
                            </label>

                            <div className="mt-2 text-sm text-red-400">{errors?.type && errors?.type[0]}</div>
                        </div>

                        <div>
                            <label htmlFor="visibility" className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-white">Visibility</span>
                                <select name="visibility" id="visibility" required onChange={handleChange} value={data.visibility}
                                    className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white focus:bg-transparent focus:outline-blue-500 focus:outline-2">
                                    <option className="bg-[#151b23] text-white" disabled >Choose visibility</option>
                                    {visibilities.map((visibility, key) =>
                                        <option key={key} className="bg-[#151b23] text-white" value={visibility} >{visibility}</option>
                                    )}
                                </select>
                            </label>

                            <div className="mt-2 text-sm text-red-400">{errors?.visibility && errors?.visibility[0]}</div>
                        </div>
                    </div>

                    <div className="w-full bg-gr een-400">

                        {previews &&
                            <div  className={`${previews.length > 1 ? "columns-2" : "columns-1"} gap-1 `}>
                                {previews?.map((preview, key) =>
                                    <div key={key} className="group relative h-fit w-fit bg-gree n-400 py-1">
                                        <img className="rounded-lg group-hover:brightness-50 transition duration-300" key={key} src={preview.url} alt={preview.file.name} />
                                        <button type="button" onClick={() => removeImage(preview)} className="cursor-pointer opacity-0 group-hover:opacity-100 absolute top-2 right-2 ">
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" className="cursor-pointer transition text-[#848b93] hover:text-red-400" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        }

                        {data.video &&
                            <div className="w-full flex items-center justify-center hover:brightness-50">
                                <div className="w-fit h-fit group relative h-fit w-fit py-1 ">
                                    <video src={data?.video?.url} autoPlay controls loop className="rounded-lg max-h-[50vh]"></video>
                                    <button type="button" onClick={removeVideo} className="cursor-pointer opacity-0 group-hover:opacity-100 absolute top-2 right-2 ">
                                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" className="cursor-pointer transition text-[#848b93] hover:text-red-400" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        }
                    </div>

                </div>


                <div className="bg-[#151b23] absolute top-0 right-0 flex flex-col translate-x-[calc(100%+10px)] rounded-lg" >

                    <button type="button" className='cursor-pointer flex items-center gap-0 group-hover:gap-3 rounded-lg p-2 transition-all duration-300 hover:bg-[#212830]'>
                        <label htmlFor="images" className="cursor-pointer w-[25px] h-[25px]" >
                            <img src="/svg/add-image.svg" alt="add image" className='w-full h-full hrink-0' />
                            <input type="file" name="images[]" id="images" accept="image/*" multiple onChange={handleChange}
                                className="hidden p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-[#151b23] file:px-3 file:py-2 file:text-sm file:text-white" />
                        </label>
                    </button>

                    <button type="button" className='cursor-pointer flex items-center gap-0 group-hover:gap-3 rounded-lg p-2 transition-all duration-300 hover:bg-[#212830]' >
                        <label htmlFor="video" className="cursor-pointer w-[25px] h-[25px]" >
                            <img src="/svg/add-video.svg" alt="video" className='w-full h-full hrink-0' />
                            <input disabled={data.images?.length == true} type="file" name="video" id="video" accept="video/*" onChange={handleChange}
                                className="hidden p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-[#151b23] file:px-3 file:py-2 file:text-sm file:text-white" />
                        </label>
                    </button>

                    <button type="button" className='cursor-pointer flex items-center gap-0 group-hover:gap-3 rounded-lg p-2 transition-all duration-300 hover:bg-[#212830]'>
                        <div className="cursor-pointer w-[25px] h-[25px]" >
                            <img src="/svg/out.svg" alt="cancel" className='w-full h-full hrink-0' />
                        </div>
                    </button>

                    <div className='cursor-pointer flex items-center gap-0 group-hover:gap-3 rounded-lg p-2 transition-all duration-300 hover:bg-[#212830]'>
                        <button type="submit" className="cursor-pointer w-[25px] h-[25px]" >
                            <img src="/svg/done.svg" alt="submit" className='w-full h-full hrink-0' />
                        </button>
                    </div>

                </div>

            </form>

        </section>
    )

}