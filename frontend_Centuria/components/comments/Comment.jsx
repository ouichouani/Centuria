// import dayjs library to get diffForHumans functionality
import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime);



export default function Comment({ comment, DeleteComment }) {
    const canDeleteComment = true

    const diffForHumans = (date) => {
        return dayjs(comment.created_at).fromNow()
    }

    function handleCommentDelete() {
        DeleteComment(comment)
    }

    return (
        <>
            <div className="border border-solid border-white/10 rounded-2xl mb-3">
                <div className="bg-[#151b23] w-full mb-3 py-2 px-2 rounded-t-2xl flex justify-between">

                    <Link href={`/main/explore/users/${comment.user.id}`} className="flex items-center gap-4 w-fit">

                        <img className="h-10 w-10 rounded-full border border-white/20 bg-[#0d1117] object-cover"
                            src={comment.user.image?.url ?? '/images/blank-profile.webp'}
                            alt={comment.user.name} />
                        <div>
                            <h3 className="text-sm font-semibold text-white w-fit">
                                {comment.user.name}
                            </h3>
                            <p className="text-xs text-[#9198a1]">
                                {diffForHumans(comment.created_at)}</p>
                        </div>
                    </Link>

                    {canDeleteComment &&
                        <button onClick={handleCommentDelete}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                className="cursor-pointer transition hover:text-red-400"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </g>
                            </svg>
                        </button>
                    }


                </div>

                <div className="px-6 py-4">
                    <p className="w-[80%]">{comment.content}</p>
                </div>
            </div>
        </>
    )
}