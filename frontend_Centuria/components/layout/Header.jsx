'use client' ;

import Link from "next/link";
import { AppContext } from '@/context/AppContext.jsx'
import NavProvider, { NavContext } from '@/context/NavContext.jsx'
import { useContext } from 'react';

export default function Header() {
    const { user, pathname, pagetitle } = useContext(AppContext);
    const { nav } = useContext(NavContext);

    return (
        <header
            className="sticky top-0 border-b border-white/30 border-solid bg-[#151b23] px-4 py-3 text-blue-100 shadow-lg z-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3 ">

                    {/* <button type="button" ref={toggle} aria-expanded="false"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-[#0d1117] text-white lg:hidden cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true">
                            <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" />
                        </svg>
                    </button> */}

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
    )
}