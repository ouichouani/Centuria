
import Link from 'next/link';
import { cookies } from "next/headers";

export default async function indexHabits() {

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${domain}/habits`, {
        method: "GET",
        headers: {
            "accept": "Application/json",
            "Content-Type": "application/json" ,
            cookie: cookieHeader,    
        }
    });

    const data = await response.json();
    const categories = { abandoned_habits: data.abandoned_habits, categories: data.categories }
    console.log(categories) ;


    return (

        <section className="mx-auto w-full max-w-6xl py-6">
            <div className="relative w-full pt-15 flex flex-col gap-5">
                <div className="flex gap-3 absolute top-[0px] right-[0px]">
                    <a className="p-2 bg-[#151b23] border border-solid border-white/30 rounded-lg transition hover:border-white/60"
                        href="{{ route('habits.create') }}">add habit</a>
                </div>

                {categories?.categories?.map((cat, key) =>

                    <div key={key} className='border border-white/30 border-solid rounded-lg flex flex-col gap-1'>

                        <div className="w-full p-[15px] border-b border-solid border-white/30">
                            <Link href={`/main/dashboard/categories/${cat.id}`} className="flex gap-3 items-center w-fit ">
                                <div
                                    className="border border-white/30 border-solid rounded-full w-[20px] h-[20px]" style={{ backgroundColor: cat.color }}>
                                </div>
                                <h1 className="text-2xl font-bold">{cat.title}</h1>
                            </Link>
                            {/* {console.log("tttt" , cat)} */}
                        </div>

                        <section className="flex flex-col gap-4 p-[15px]">
                            {cat?.habits.map((habit, key) =>
                                <div key={key} className="flex flex-col gap-3">
                                    <Link href={`/main/dashboard/habits/${habit.id}`} className='flex items-center gap-2 w-fit'>
                                        <p className="text-md">- {habit.title}</p>
                                    </Link>
                                </div>
                            )}
                        </section>

                    </div>
                )}


                {(categories?.abandoned_habits != null && categories?.abandoned_habits?.length > 0) ?
                    <div className='border border-white/30 border-solid rounded-lg flex flex-col gap-1  '>

                        <div className="w-full p-[15px] border-b border-solid border-white/30 rounded-t-lg">
                            <div className="flex gap-3 items-center w-fit">
                                <div className='bg-[#D51C39]/50 border border-white/30 border-solid rounded-full w-[20px] h-[20px]'>
                                </div>
                                <h1 className="text-2xl font-bold">abandoned habits</h1>
                            </div>
                        </div>

                        <section className="flex flex-col gap-4 p-[15px]">
                            {categories.abandoned_habits != null ?

                                categories.abandoned_habits.map((habit, key) =>
                                    <div key={key} className="flex flex-col gap-3">
                                        <Link href={`/main/dashboard/habits/${habit.id}`} className='flex items-center gap-2 w-fit'>
                                            <p className="text-md">- {habit.title}</p>
                                        </Link>
                                    </div>
                                )
                                : <p>no abandoned habits</p>}

                        </section>

                    </div>
                    : <p>no abandoned habits</p>
                }

            </div>
        </section>
    )
}