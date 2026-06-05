"use client";
import { AppContext } from '@/context/AppContext.jsx'
import { useContext, useState } from 'react';
import Link from "next/link";
import Like from './Like';
import Comment from './Comment';
import CommentContainer from './CommentContainer';


// import dayjs library to get diffForHumans functionality
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime);



export default function Post({ post }) {

    const { user, pathname } = useContext(AppContext);
    const [openComments, setOpenComments] = useState(false);

    const canDeleteComment = (post.user_id === user.id || (user.role === 'Admin' && post.user.role !== 'Admin'));
    const canHide = (post.user_id != user.id && post.user.role != 'Admin' && (user.role == 'Admin' || user.role == 'Moderator'));
    const canReport = (user.role === 'Client' && user.id != post.user_id)
    const canDeletePost = (user.role == 'Admin' && (user.id == post.user_id || post.user.role != 'Admin'));

    const diffForHumans = (date) => {
        return dayjs(post.created_at).fromNow()
    }

    function handleDelete() {}
    function handleHide() {}

    function toggleShowComments() {
        setOpenComments(prev => !prev);
    }


    return (
        <article className="rounded-2xl border border-white/10 shadow-lg">
            <div className="flex flex-col gap-5 transition">

                <div className="flex items-start justify-between gap-4">
                    <div
                        className="bg-[#151b23] w-full px-6 py-2 rounded-t-2xl flex justify-between {{ post.visibility == 'private' ? 'bg-[#25171c]' : (post.visibility == 'friends' ? 'bg-[#17251c]' : 'bg-[#151b23]') }}">
                        <a href="{{ route('users.show', post.user.id) }}" className="flex items-center gap-4 w-fit ">
                            <img className="h-12 w-12 rounded-full border border-white/20 bg-[#0d1117] object-cover"
                                src={post.user.image?.url ?? "/images/blank-profile.webp"}
                                alt={post.user.name} />
                            <div>
                                <h3 className="text-md font-semibold text-white w-fit">{post.user.name}</h3>
                                <p className="text-sm text-[#9198a1]">{diffForHumans(post.created_at)}</p>
                            </div>
                        </a>

                        <div className="flex gap-2 items-center">

                            {canReport &&
                                <Link href={`/main/reports/${post.id}`}>
                                    <svg width="25px" height="25px" viewBox="0 0 48 48" version="1.1"
                                        title="report" className="text-[#848b93] hover:text-red-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">

                                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <g id="SVGRepo_iconCarrier">
                                            <title>report</title>
                                            <desc>Created with Sketch.</desc>
                                            <g id="report" stroke="none" strokeWidth="1" fill="none"
                                                fillRule="evenodd" strokeLinejoin="round">
                                                <rect width="48" height="48" fill="white"
                                                    fillOpacity="0.01" />
                                                <g id="编组" transform="translate(3.754351, 2.827607)"
                                                    stroke="currentColor" strokeWidth="4">
                                                    <path
                                                        d="M32.2456488,32.1723935 L8.24564876,32.1723935 L8.24564876,18.1723935 C8.24564876,11.5449765 13.6182318,6.1723935 20.2456488,6.1723935 C26.8730658,6.1723935 32.2456488,11.5449765 32.2456488,18.1723935 L32.2456488,32.1723935 Z"
                                                        id="形状结合" fill="#" fillRule="nonzero"> </path>
                                                    <path d="M4.24564876,39.1723935 L36.2456488,39.1723935"
                                                        id="路径-7" strokeLinecap="round"> </path>
                                                    <path d="M1,9.08742569 L2.51206274,11.8647745" id="路径-8"
                                                        strokeLinecap="round"
                                                        transform="translate(2.000000, 10.587426) rotate(-43.000000) translate(-2.000000, -10.587426) ">
                                                    </path>
                                                    <path d="M10.3594726,1 L9.0448312,3.87605946" id="路径-8"
                                                        strokeLinecap="round"
                                                        transform="translate(10.021384, 2.500000) rotate(-43.000000) translate(-10.021384, -2.500000) ">
                                                    </path>
                                                    <path d="M2.78432782,5.80894292 L7.02438401,5.6608769"
                                                        id="路径-8" strokeLinecap="round"
                                                        transform="translate(4.681446, 6.068090) scale(-1, 1) rotate(-43.000000) translate(-4.681446, -6.068090) ">
                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </Link>
                            }

                            {canHide &&
                                <button onClick={handleHide}>
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                        className=" text-[#848b93] cursor-pointer hover:text-red-400"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <g id="SVGRepo_iconCarrier">
                                            <g id="Edit / Hide">
                                                <path id="Vector"
                                                    d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" />
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            }

                            {canDeletePost &&
                                <button onClick={handleDelete}>
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                        className="cursor-pointer transition text-[#848b93] hover:text-red-400"
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


                    </div>
                </div>

                <div className="px-6">

                    <div className="mb-4 w-[80%]">
                        <p className="whitespace-pre-line text-sm leading-7 text-white">{post.content}</p>
                    </div>

                    {post.images.length ?
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {post?.images?.map((image, key) =>
                                <img key={key} className="h-56 w-full rounded-xl border border-white/10 bg-[#0d1117] object-cover"
                                    src={image.url} alt="post image" />

                            )}
                        </div>
                        : ""}

                </div>

                <div className="flex flex-wrap gap-3 px-5 py-4">

                    <div className="flex flex-wrap gap-3 px-5 py-4">
                        <Like post={post} user={user} />
                    </div>

                    <button className="comments_button flex gap-2 items-center cursor-pointer" onClick={toggleShowComments}>
                        <img className="w-[25px]" src="/svg/comments.svg" alt="" />
                        <p className="text-sm font-semibold text-white">{post.comments.length}</p>
                    </button>
                </div>


                {openComments ?
                    <div className="comments-container px-6 mb-3 ">
                        <CommentContainer post={post} />
                    </div>
                    : ''}

            </div>
        </article>
    )

}