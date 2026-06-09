"use client";
import { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'
import { useRouter } from 'next/navigation';



export default function CreatePost() {

    const { domain } = useContext(AppContext);
    const [data, setData] = useState({ type : "Question" , visibility : 'public' ,  content : '' , images: [] });
    const [previews, setPreviews] = useState();
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const types = ['Question', 'History', 'Encouragement'];
    const visibilities = ['public', 'private', 'friends'];

    function handleChange(e) {
        const { name } = e.target;
        setErrors(prev => ({...prev , [name] : ''})) ;
        if (name == 'images[]') {
            const { files } = e.target;
            setData(prev => ({ ...prev, images: Array.from(files) }));

            setPreviews(Array.from(files).map(file => ({
                file,
                url: URL.createObjectURL(file),
            })));

        } else {
            const { value } = e.target;
            setData(prev => ({ ...prev, [name]: value }));
        }

        console.log(data)
    }

    async function handleSubmit(e) {
        
        e.preventDefault();
        const formData = new FormData() ;

        for(let item in data){
            if(item == "images"){
                data[item]?.forEach(element => {
                    formData.append('images[]' , element) ;
                });
            }else{
                formData.append(item , data[item])
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
            if (response.ok) router.push('/main/profile') ;
            if (!response.ok) setErrors({...result.errors}) ;
            

        } catch (error) {
            console.error('llll' + error);
        }
    }

    return (
        <section className="mx-auto w-full max-w-4xl">
            <div className="mb-6 rounded-2xl border border-white/10 bg-[#151b23] px-6 py-5 shadow-lg">
                <h2 className="text-xl font-bold tracking-wide text-white">Create a new post</h2>
                <p className="mt-2 text-sm text-[#9198a1]">
                    Fill in the details below to publish a post with the same clean workflow used across the app.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#151b23] p-6 shadow-lg">
                <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label htmlFor="content" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Post content</span>
                            <textarea name="content" id="content" rows="8" placeholder="write your post here" onChange={handleChange} value={data?.content}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white placeholder:text-[#9198a1] focus:bg-transparent focus:outline-blue-500 focus:outline-2"></textarea>
                        </label>
                        <p className="mt-2 text-sm text-[#9198a1]">You can leave this empty if you upload images instead.</p>
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

                    <div className="md:col-span-2">
                        <label htmlFor="images" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Images</span>
                            <input type="file" name="images[]" id="images" accept="image/*" multiple onChange={handleChange}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-[#151b23] file:px-3 file:py-2 file:text-sm file:text-white" />
                        </label>
                        <p className="mt-2 text-sm text-[#9198a1]">PNG, JPG, JPEG, or GIF up to 2MB each.</p>
                        <div className="mt-2 text-sm text-red-400">{errors?.images && errors?.images[0]}</div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <a href="{{ route('posts.index') }}"
                        className="rounded-lg border border-white/10 bg-[#151b23] px-6 py-2 text-sm font-medium text-[#9198a1] transition hover:border-white/20 hover:text-white">
                        back
                    </a>
                    <button
                        className="rounded-lg border border-white/20 bg-[#0d1117] px-6 py-2 text-sm font-medium text-white transition hover:bg-green-500/20">
                        create
                    </button>
                </div>

                <div>
                    {previews?.map((preview, key) =>
                        <img key={key} src={preview.url} alt={preview.file.name} />
                    )}
                </div>
            </form>
        </section>
    )

}