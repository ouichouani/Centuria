"use client";
import Link from "next/link";
import { AppContext } from '@/context/AppContext.jsx'
import NavProvider, { NavContext } from '@/context/NavContext.jsx'
import { useContext, useEffect, useRef } from "react";



export default function MainLayout({ children }) {
    const { user , pathname, pagetitle } = useContext(AppContext);
    const { nav } = useContext(NavContext);

    const toggle = useRef();
    const sidebar = useRef();
    const backdrop = useRef();
    const closeButton = useRef();

    function sidebarControll() {

        if (!toggle || !sidebar || !backdrop) return;

        // this function controll the side bar in responsive design
        const closeSidebar = () => {
            sidebar.current.classList.add('-translate-x-full');
            backdrop.current.classList.add('hidden');
            document.body.style.overflow = '';
            toggle.current.setAttribute('aria-expanded', 'false');
        };

        const openSidebar = () => {
            sidebar.current.classList.remove('-translate-x-full');
            backdrop.current.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            toggle.current.setAttribute('aria-expanded', 'true');
        };

        toggle.current.addEventListener('click', () => {
            sidebar.current.classList.contains('-translate-x-full') ? openSidebar() : closeSidebar()
        });

        backdrop.current.addEventListener('click', closeSidebar);
        closeButton?.current.addEventListener('click', closeSidebar);

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                closeSidebar();
            }
        });
    }

    useEffect(() => {
        sidebarControll();
    }, [])


    return (
        <>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <title>{pagetitle}</title>
            </head>

            <body className="bg-[#151b23]">
                    <div className="flex w-full h-screen">
                        <aside
                            ref={sidebar}
                            data-sidebar
                            className="fixed inset-y-0 left-0 z-200 w-[80vw] min-w-0 max-w-[320px] -translate-x-full bg-[#151b23] px-2 py-10 text-white shadow-2xl border-r-[2px] border-white/30 border-solid transition-transform duration-200 lg:sticky lg:z-auto lg:w-[15vw] lg:min-w-[200px] lg:max-w-none lg:translate-x-0">

                            <div className="mb-6 flex justify-end lg:hidden">
                                <button type="button" data-sidebar-close ref={closeButton}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#0d1117] text-white cursor-pointer"
                                    aria-label="Close menu">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true">
                                        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            <ul className="flex flex-col gap-4 sticky top-10">
                                <Link className={`rounded-lg px-2 py-2 transition hover:bg-[#212830] flex gap-2 ${pathname.includes('/dashboard') ? 'bg-[#212830] border-l-4 rounded-l-none border-blue-500' : ''}`} href={'/main/dashboard/board'}> <img className='w-[20px] stroke-red-100 hover:stock-blue-500' src="/svg/dashboard.svg" alt="" /> dashboard</Link>
                                <Link className={`rounded-lg px-2 py-2 transition hover:bg-[#212830] flex gap-2 ${pathname.includes('/explore') ? 'bg-[#212830] border-l-4 rounded-l-none border-blue-500' : ''}`} href={'/main/explore'}><img className='w-[20px] fill-white/50 hover:fill-white' src="/svg/explore.svg" alt="" /> comminity</Link>
                                <Link className={`rounded-lg px-2 py-2 transition hover:bg-[#212830] flex gap-2 ${pathname.includes('/profile') ? 'bg-[#212830] border-l-4 rounded-l-none border-blue-500' : ''}`} href={'/main/profile'}><img className='w-[20px] fill-white/50 hover:fill-white' src="/svg/profile.svg" alt="" /> profile</Link>
                                <Link className={`rounded-lg px-2 py-2 transition hover:bg-[#212830] flex gap-2 ${pathname.includes('/notifications') ? 'bg-[#212830] border-l-4 rounded-l-none border-blue-500' : ''}`} href={'/main/notifications'}><img className='w-[20px] fill-white/50 hover:fill-white' src="/svg/notification.svg" alt="" /> notification</Link>
                                <Link className={`rounded-lg px-2 py-2 transition hover:bg-[#212830] flex gap-2 ${pathname.includes('/requests') ? 'bg-[#212830] border-l-4 rounded-l-none border-blue-500' : ''}`} href={'/main/requests'}><img className='w-[25px] fill-white/50 hover:fill-white' src="/svg/requests.svg" alt="" /> requests</Link>
                                <Link className={`rounded-lg px-2 py-2 transition hover:bg-[#212830] flex gap-2 ${pathname.includes('/controll-panel') ? 'bg-[#212830] border-l-4 rounded-l-none border-blue-500' : ''}`} href={'/main/controll-panel'}><img className='w-[20px] fill-white/50 hover:fill-white' src="/svg/settings.svg" alt="" /> controll panel</Link>
                            </ul>

                        </aside>

                        <button ref={backdrop}
                            className="fixed inset-0 z-30 hidden bg-black/50 lg:hidden"
                            aria-label="Close menu">
                        </button>

                        <section className="w-full overflow-y-auto bg-[#0d1117] text-white [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-thumb]:bg-blue-500">
                            <header
                                className="sticky top-0 border-b border-white/30 border-solid bg-[#151b23] px-4 py-3 text-blue-100 shadow-lg z-100">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <div className="flex items-center gap-3 ">

                                        <button type="button" ref={toggle} aria-expanded="false"
                                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#0d1117] text-white lg:hidden cursor-pointer">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true">
                                                <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" />
                                            </svg>
                                        </button>

                                        <h1 className="text-xl font-bold tracking-wide text-white">
                                            {pagetitle.toUpperCase()}
                                        </h1>
                                    </div>

                                    <div className="lg:flex items-center flex-col gap-3 text-sm text-blue-100/90 lg:flex-row lg:items-center lg:gap-10">

                                        <nav className="flex m-auto w-fit items-center gap-4 overflow-x-auto whitespace-nowrap text-white lg:gap-5 [&::-webkit-scrollbar]:hidden">
                                            {nav}
                                        </nav>
                                        <Link href="/main/profile">
                                        
                                            <img src={user?.image?.url ?? '/images/blank-profile.webp'} alt="profile image"
                                                className='w-[40px] aspect-square rounded-full hidden lg:block object-cover ' />
                                        </Link>
                                    </div>

                                </div>
                            </header>

                            <main className="text-sm p-[1em]">
                                {children}
                            </main>
                        </section>
                    </div>
            </body>            
        </>
    )
}