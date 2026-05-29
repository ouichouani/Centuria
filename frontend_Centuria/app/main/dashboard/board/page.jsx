import HabitRow from "./HabitRow";
import { cookies } from "next/headers";


export default async function board() {

    // get domain from .env.local
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    // get cookies from browser req to be used in server component
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${domain}/dashboard`, {
        headers: {
            Cookie: cookieHeader, // send cookies with request
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) console.error(data)

    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const daysInThisMonths = new Date(thisYear, thisMonth + 1, 0).getDate();
    const daysInMonth = [];
    for (let i = 1; i <= daysInThisMonths; i++) daysInMonth.push(new Date(thisYear, thisMonth, i));

    return (
        <section className="space-y-4">
            {!data?.habits ?
                <div className="border border-solid border-white/30 rounded-4xl bg-[#151b23] px-6 py-10 text-center text-white/70">
                    <p>No habits yet.</p>
                    <a href="{{ route('habits.create') }}" className="mt-4 inline-block text-blue-400 underline">Create your first habit</a>
                </div>
                : <>
                    <div
                        className="rounded-2xl border border-white/30 bg-[#151b23] px-6 py-10 text-center text-white md:hidden portrait:block landscape:hidden">
                        <h2 className="text-lg font-semibold">Rotate your phone</h2>
                        <p className="mt-2 text-sm text-white/70">Turn your phone sideways to view the habit board.</p>
                    </div>

                    <div className="hidden md:block landscape:block">
                        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-thumb]:bg-blue-500">
                            <div className="flex justify-center items-center min-w-max">
                                <table className="">
                                    <thead className="">
                                        <tr className="border border-[#86878b]">
                                            <td className="px-3 min-w-[25px] bg-[#151b23] sticky left-[0px] block m-0 border-x">habits</td>
                                            {daysInMonth.map((i, key) =>
                                                <td key={key} className="border border-solid border-[#86878b] min-w-[25px] text-center bg-[#151b23]">{i.getDate()}</td>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data?.habits.map((habit, key) =>
                                            // show every habits log row by row .
                                            <tr key={key} className="border border-[#86878b] bg-[#0d1117] hover:bg-[#23262d] hover:border-blue-400">
                                                <td className="px-3 min-w-[25px] bg-inherit sticky left-[0px] block m-0 border-x">
                                                    <a href="{{ route('habits.show' , $h->id) }}">{habit.title}</a>
                                                </td>
                                                <HabitRow habit={habit} daysInMonth={daysInMonth} />
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }

        </section>
    )
}