"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


import Post from "@/components/posts/Post.jsx";
import CommentContainer from '@/components/comments/CommentContainer.jsx';


export default function Explore() {

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const { pathname } = useContext(AppContext);
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    async function fetchPosts() {
        try {

            const response = await fetch(`${domain}/posts`, {
                method: "GET",
                credentials: "include", // store the cookie from the response
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });

            const result = await response.json();
            console.log(result.posts);


            if (response.ok) setPosts(result.posts);
        } catch (error) {
            console.error('error from console : ' + error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <section className="mx-auto w-full max-w-6xl flex gap-2 pt-20">
            <div className="w-full h-full bg-green-600">profile</div>
            <div className="flex flex-col gap-6 items-center">
                    {(posts && posts.length) ?
                        posts?.map((post) => <Post key={post.id} post={post} creator={post.user} setPosts={setPosts} Container={CommentContainer} />)
                        :
                        <div className="rounded-2xl border border-dashed border-white/15 bg-[#151b23] p-8 text-center shadow-lg">
                            <p className="text-base text-[#9198a1]">there is no posts yet</p>
                        </div>
                    }
            </div>
            <div className="w-full h-full bg-red-600">comment</div>
        </section>


    )
}