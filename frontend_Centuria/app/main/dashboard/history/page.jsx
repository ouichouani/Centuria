import HabitRow from "./HabitRow";
import { cookies } from "next/headers";
import Link from "next/link";


export default async function board() {

    // get domain from .env.local
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    // get cookies from browser req to be used in server component
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${domain}/logs`, {
        headers: {
            Cookie: cookieHeader, // send cookies with request
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) console.error(data)

    const months = data.months.map(item => getDaysInMonthArray(new Date(item)));

    function getDaysInMonthArray(date) {
        const Month = date.getMonth();
        const Year = date.getFullYear();
        const maxDaysInMonth = new Date(Year, Month + 1, 0).getDate();
        const daysInMonth = [];
        for (let i = 1; i <= maxDaysInMonth; i++) daysInMonth.push(new Date(Year, Month, i));
        return daysInMonth;
    }


    return (
        <section className="space-y-8">

            <div
                className="rounded-2xl border border-white/30 bg-[#151b23] px-6 py-10 text-center text-white md:hidden portrait:block landscape:hidden">
                <h2 className="text-lg font-semibold">Rotate your phone</h2>
                <p className="mt-2 text-sm text-white/70">Turn your phone sideways to view the habit history board.</p>
            </div>

            <h1 className="text-sm text-white/60"> Habits history since {new Date(data.oldestHabit.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' , day : 'numeric' })} </h1>
            {months.map((daysInMonth, key) =>

                <section key={key} className="hidden space-y-3 md:block landscape:block">
                    <div className="px-2">
                        <h2 className="text-xl font-semibold text-white">{daysInMonth[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
                    </div>

                    <div className="overflow-x-auto [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-thumb]:bg-blue-500">
                        <div className="flex justify-center items-center min-w-max">

                            <table className="border border-solid border-white/30 rounded-4xl">


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
                                                <td className="px-3 min-w-[25px] h-[25px] bg-inherit sticky left-[0px] block m-0 border-x">
                                                    <Link href={`/main/dashboard/habits/${habit.id}`}>{habit.title}</Link>
                                                </td>
                                                <HabitRow habit={habit} daysInMonth={daysInMonth} />
                                            </tr>
                                        )}
                                </tbody>

                            </table>

                        </div>

                    </div>
                </section>

            )}
        </section>
    )


}