'use client';
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'

export default function CreateReportModel({ setIsModelOpen }) {

    
    // setIsModelOpen IS A STATE THAT OPEN OR CLOSE THE MODEL IN PARENT COMPONENT
    // user IS THE GLOBAL USER THAT WE WANT TO UPDATE 
    const { user , setUser } = useContext(AppContext);


    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({ name: user.name , bio: user.bio , password:'' , password_confirmation:'' });
    
    // THIS STATE JOB IS ONLY DISPLAY THE PROFILE IMG 
    const [image , setImage] = useState(user.image?.url)
        

    // USED TO FOCUS ON THE ELEMENT (textarea) ONCE THE COMPONENT GET DISPLAYED
    const textareaRef = useRef();


    async function handleChange(e) {
        const { name, value } = e.target;
        if(name == 'image'){
            setData(prev => ({ ...prev, image : e.target.files[0] }));
            setImage(URL.createObjectURL(e.target.files[0]));

        }else {
            setData(prev => ({ ...prev, [name]: value }));
        }
        setErrors(prev => ({ ...prev, [name]: '' }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(data.password.trim() != data.password_confirmation.trim()) return ;

        const formData = new FormData() ;
        data.name != user.name && formData.append('name' , data.name)
        data.bio != user.bio && formData.append('bio' , data.bio)
        data.password.trim() && formData.append('password' , data.password)
        data.password_confirmation.trim() && formData.append('password_confirmation' , data.password_confirmation)
        data.image && formData.append('image' , data.image)

        try {
            const response = await fetch(`${domain}/users/${user.id}`, {
                method: "PUT",
                credentials: "include", // store the cookie from the response
                headers: {
                    "Accept": "application/json",
                },
                body: formData
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) {
            
                if (result.user) setUser(result.user) ;
                setIsModelOpen(prev => !prev);
            }

        } catch (error) {
            console.error('AYAYAAAY' + error);
        }

    }

    function cancelEdit() {
        setIsModelOpen(prev => !prev);
    }

    return (
        <section className="mx-auto w-fit w-screen md:max-w-[40vw] min-w-[500px] px-4 py-6">
            
            <div className="mb-3 rounded-2xl border border-white/10 bg-[#151b23] px-2 py-2 shadow-lg">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <img src={image ??  '/images/blank-profile.webp' }
                            alt={user.name}
                            className="h-15 w-15 rounded-full border border-white/20 bg-[#0d1117] object-cover" />
                        <div>
                            <p className="text-lg max-w-[50vw] md:max-w-[30vw] font-bold text-white overflow-hidden text-ellipsis whitespace-nowrap">{data.name}</p>
                            <p className="text-sm max-w-[50vw] md:max-w-[30vw] text-[#9198a1] overflow-hidden text-ellipsis whitespace-nowrap">{data.bio}</p>
                        </div>
                    </div>
                </div>
            </div>

            <form className="rounded-2xl border border-white/10 bg-[#151b23] p-6 shadow-lg" onSubmit={handleSubmit}>


                {/* @if (errors.any()) */}
                {/* <div className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    A few fields still need attention before this profile can be updated.
                </div> */}
                {/* @endif */}

                <div className="grid gap-2 md:grid-cols-2">
                    
                    <div className="col-span-2">
                        <label htmlFor="name" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Name</span>
                            <input id="name" type="text" name="name" value={data.name} required onChange={handleChange}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white placeholder:text-[#9198a1] focus:bg-transparent focus:outline-blue-500 focus:outline-2" />
                        </label>
                        <div className="mt-2 text-sm text-red-400">{errors?.name}</div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="bio" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Bio</span>
                            <textarea id="bio" name="bio" rows="5" value={data?.bio ??''} onChange={handleChange}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white placeholder:text-[#9198a1] focus:bg-transparent focus:outline-blue-500 focus:outline-2"></textarea>
                        </label>
                        <div className="mt-2 text-sm text-red-400">{errors?.bio}</div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="password" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Password</span>
                            <input id="password" type="password" name="password" onChange={handleChange}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white focus:bg-transparent focus:outline-blue-500 focus:outline-2" />
                        </label>
                        <div className="mt-2 text-sm text-red-400">{errors?.password}</div>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="password_confirmation" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Confirm password</span>
                            <input id="password_confirmation" type="password" name="password_confirmation" onChange={handleChange}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-white focus:bg-transparent focus:outline-blue-500 focus:outline-2" />
                        </label>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="images" className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-white">Profile image</span>
                            <input id="images" type="file" name="image" accept="image/*" onChange={handleChange}
                                className="p-2 px-3 bg-[#0d1117] border border-solid border-white/20 rounded-lg text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-[#151b23] file:px-3 file:py-2 file:text-sm file:text-white" />
                        </label>
                        <p className="mt-2 text-sm text-[#9198a1]">Upload a new image if you want to replace your current profile picture.</p>
                        <div className="mt-2 text-sm text-red-400">{errors?.image}</div>

                    </div>

                    <div className="mt-8 flex justify-end gap-3 col-span-2">
                        <button onClick={cancelEdit} type="button"
                            className="cursor-pointer rounded-lg border border-white/10 bg-[#151b23] px-6 py-2 text-sm font-medium text-[#9198a1] transition hover:border-white/20 hover:text-white">
                            back
                        </button>
                        <button type="submit"
                            className="cursor-pointer rounded-lg border border-white/20 bg-[#0d1117] px-6 py-2 text-sm font-medium text-white transition hover:bg-green-500/20">
                            update
                        </button>
                    </div>

                </div>
            </form>
        </section>
    )
}