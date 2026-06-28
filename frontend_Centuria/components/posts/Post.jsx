"use client";
import { AppContext } from '@/context/AppContext.jsx'
import { useContext, useState } from 'react';
import Link from "next/link";
import Like from '@/components/likes/Like.jsx';
import CreateReportModel from "@/components/reports/CreateReportModel.jsx"


// import dayjs library to get diffForHumans functionality
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime);
const diffForHumans = (date) => {
    return dayjs(date).fromNow()
}



export default function Post({ post, setPosts, creator, type = "comments", Container }) {

    // post CONTAIN DATA OF THE POST PROVIDED BY THE PARENT 
    // setPosts UPDATES THE STATE OF THE PARENT
    // creator ???
    // Container IS THE CONTAINER THAT WILL SHOW THE initialItems
    // type USER TO KNOW IF THE COMPONENT NEED TO SHOW SERTAIN BUTTONS AND COMPONENTS OR NOT

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const { user, pathname, notify } = useContext(AppContext);

    // OPEN OR CLOSE THE CONTAINER THAT SHOWS REPORST OR COMMENTS
    const [isOpen, setIsOpen] = useState(false);

    // USED TO OPEN (EDIT/DELETE/REPORT) A POST
    const [isModelOpen, setIsModelOpen] = useState(false);

    // THIS COMPONENT SHOW BOTH REPORTS AND COMMENTS . count STATE SHOW THE COUNT OF THEM
    // USED HERE TO AVOID DEFINE COMMENT STATE HERE 
    const [count, setCount] = useState(type == "comments" ? post.comments.length : post.reports.length);


    // PERMITION THAT THE AUTH USER CAN DO
    const canDeleteComment = (post.user_id === user.id || (user.role === 'Admin' && creator.role !== 'Admin'));
    const canHide = (post.user_id != user.id && creator.role != 'Admin' && (user.role == 'Admin' || user.role == 'Moderator'));
    const canReport = (user.role === 'Client' && user.id != post.user_id)
    const canDeletePost = (user.role == 'Admin' && (user.id == post.user_id || creator.role != 'Admin'));
    const canEditPost = user.id === post.user_id;


    async function handleDelete() {
        try {

            const response = await fetch(`${domain}/posts/${post.id}`, {
                method: "DELETE",
                credentials: "include", // store the cookie from the response
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                setPosts(prev => prev.filter(item => item.id != post.id));
                notify('post deleted', 'orange');
            }
        } catch (error) {
            console.error('error from console : ' + error);
        }
    }

    async function handleHide() {
        try {

            const response = await fetch(`${domain}/posts/${post.id}/hide`, {
                method: "POST",
                credentials: "include", // store the cookie from the response
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                setPosts(prev => prev.filter(item => item.id != post.id));
                notify('post deleted', 'orange');
            }
        } catch (error) {
            console.error('error from console : ' + error);
        }
    }

    // OPEN OR CLOSE THE CONTAINER THAT INCLUDES THE COMMENTS OR REPORTS
    function toggleDetails() {
        setIsOpen(prev => !prev);
    }

    // OPEN OR CLOSE THE CONTAINER THAT INCLUDES THE MODEL (EDIT/DELETE/REPORT) FORM
    function toggleModel() {
        setIsModelOpen(prev => !prev);
    }


    return (
        <article className="rounded-2xl border border-white/10 shadow-lg md:w-[600px]  w-full ">
            <div className="flex flex-col gap-5 transition ">

                <div className="flex items-start justify-between gap-4">
                    <div
                        className="bg-[#151b23] w-full px-6 py-2 rounded-t-2xl flex justify-between" style={post.visibility == 'private' ? { backgroundColor: '#25171c' } : post.visibility == 'friends' ? { backgroundColor: '#17251c' } : { backgroundColor: '#151b23' }}>
                        <a href="{{ route('users.show', creator.id) }}" className="flex items-center gap-4 w-fit ">
                            <img className="h-12 w-12 rounded-full border border-white/20 bg-[#0d1117] object-cover"
                                src={creator.image?.url ?? "/images/blank-profile.webp"}
                                alt={creator.name} />
                            <div>
                                <h3 className="text-md font-semibold text-white w-fit">{creator.name}</h3>
                                <p className="text-sm text-[#9198a1]">{diffForHumans(post.created_at)}</p>
                            </div>
                        </a>

                        <div className="flex gap-2 items-center">

                            {canReport &&
                                <svg width="25px" height="25px" viewBox="0 0 48 48" version="1.1" onClick={toggleModel}
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
                            }

                            {canHide &&
                                <>

                                    {!post.is_hidden ?

                                        <button onClick={handleHide}>
                                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                                className="text-[#848b93] cursor-pointer hover:text-red-400 transition duration-250"
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
                                        :

                                        <button onClick={handleHide}>
                                            <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                className="text-[#848b93] cursor-pointer hover:text-red-400 transition duration-250 "
                                            >
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                <g id="SVGRepo_iconCarrier"> <g id="Edit / Show"> <g id="Vector"> <path d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z" fill='currentColor' stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </g> </g> </g>
                                            </svg>
                                        </button>
                                    }
                                </>
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

                            {canEditPost &&
                                <Link href={`/main/community/posts/${post.id}/edit`}>

                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <g id="SVGRepo_iconCarrier">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                                                fill="#848b93" />
                                        </g>
                                    </svg>
                                </Link>
                            }

                        </div>


                    </div>
                </div>

                <div className="px-6">

                    <div className="mb-4 w-[80%]">
                        <p className="whitespace-pre-line text-sm leading-7 text-white">{post.content}</p>
                    </div>

                    {post.images.length ?
                        <div className="columns-2 gap-1">
                            {post?.images?.map((image, key) =>
                                <img key={key} className="w-full rounded-xl border border-white/10 bg-[#0d1117] object-cover"
                                    src={image.url} alt="post image" />

                            )}
                        </div>
                        : ""}

                    {post.video &&
                        <div className="bg-gre en-400 flex items-center justify-center">
                            <video src={post.video.url} controls className='rounded-lg max-h-[70vh]'></video>
                        </div>
                    }

                </div>

                <div className="flex flex-wrap gap-3 px-5 py-4">

                    {type === 'comments' &&
                        <div className="flex flex-wrap gap-3 px-5 py-4">
                            <Like post={post} user={user} />
                        </div>
                    }

                    <button className="flex gap-2 items-center cursor-pointer" onClick={toggleDetails}>
                        {type === 'comments' ?
                            <img className="w-[25px]" src="/svg/comments.svg" alt="" />
                            :
                            <img className="w-[25px]" src="/svg/comments.svg" alt="" />
                        }

                        <p className="text-sm font-semibold text-white">{count}</p>
                    </button>
                </div>


                {isOpen ?

                    // INCASE THE CONTAINER IS A REPORTCONTAINER IT WILL NEED SETCOUNT TO CLEAR NON REPORTED POSTS
                    <div className="comments-container px-6 mb-3 ">
                        <Container post={post} setCount={setCount} setPosts={setPosts} />
                    </div>
                    : ''}


                {isModelOpen ?
                    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-11 backdrop-blur-xs">
                        <div className="z-13">
                            <CreateReportModel post={post} setIsModelOpen={setIsModelOpen} />
                        </div>
                        <div className='absolute top-0 left-0 w-full h-full bg-black/50 ' onClick={toggleModel}></div>
                    </div>
                    : ''}

            </div>
        </article>
    )

}