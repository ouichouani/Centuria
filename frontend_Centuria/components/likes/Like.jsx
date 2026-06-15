import { useContext, useRef, useState } from "react";
import { AppContext } from '@/context/AppContext.jsx'


export default function Like({ post, user }) {

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const [active, setActive] = useState(!!post.likes.find(item => item.user_id == user.id));
    const [likesCount, setLikeCounts] = useState(post.likes.length)
    const clickAbility = useRef(true);

    async function handleClick() {
        if (!clickAbility.current) return;

        clickAbility.current = false;

        try {
            const response = await fetch(`${domain}/likes`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ post_id: post.id })
            });

            if (response.ok) {
                if (active) {
                    setLikeCounts(prev => prev - 1);
                } else {
                    setLikeCounts(prev => prev + 1);
                }
                setActive(prev => !prev);
            }

        } catch (error) {
            console.error(error);
        } finally {
            clickAbility.current = true;
        }
    }

    return (
        <button onClick={handleClick} className="flex gap-2 items-center cursor-pointer">
            <img className="w-[23px]"
                src={active ? '/svg/unlike.svg' : '/svg/like.svg'}
                alt="" />
            <p className="text-sm font-semibold text-white">{likesCount}</p>
        </button>
    )
}