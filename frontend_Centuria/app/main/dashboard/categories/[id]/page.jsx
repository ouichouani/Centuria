

import Link from 'next/link';
import { cookies } from "next/headers";
import DeleteCategory from './DeleteCategory';
import Task from '../../tasks/Task';

export default async function ShowHabit({ params }) {

    const { id } = await params;

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${domain}/categories/${id}`, {
        method: "GET",
        headers: {
            "accept": "Application/json",
            "Content-Type": "application/json",
            cookie: cookieHeader,
        }
    });


    const data = await response.json();
    console.log(data);
    const habits = data.habits;
    const category = data.category;
    const tasks = data.tasks;



    return (
        <section className="mx-auto w-full max-w-5xl py-6">
            <div className="mb-6 rounded-2xl border border-white/10 bg-[#151b23] p-6 shadow-lg">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full border border-white/70" style={{ backgroundColor: category.color }}></div>
                            <p className="text-xs uppercase tracking-[0.3em] text-[#9198a1]">Category details</p>
                        </div>

                        <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#9198a1]">
                            {category.description}
                        </p>
                    </div>


                    <div className="flex gap-3">
                        <Link href={`/main/dashboard/categories/${id}/edit`}
                            className="rounded-lg border border-white/20 bg-[#0d1117] px-5 py-2 text-sm font-medium text-white transition hover:border-white/50">
                            update
                        </Link>
                        <DeleteCategory id={id} />
                    </div>

                </div>
            </div>

            <div className="flex flex-col gap-6">
                
                <section className="rounded-2xl border border-white/10 shadow-lg">

                    <div className="flex flex-col gap-2 bg-[#151b23] w-full p-6 rounded-2xl">
                        <h3 className="text-2xl font-bold text-white">Tasks</h3>
                        <p className="text-sm text-[#9198a1]">All tasks linked to this category.</p>
                    </div>

                    <div className="flex flex-col gap-4 p-6 ">
                        {tasks ?
                            tasks.map((task, key) =>
                                <article key={key} className="rounded-xl borderr border-white/10 bg-[#0d1117]">
                                    <Task key={key} task={task} color={category.color} />
                                </article>
                            ) :
                            <p className="bg-[#0d1117] px-4 py-1 text-sm text-[#9198a1]">
                                this cat doesn't have any tasks
                            </p>
                        }
                    </div>

                </section>

                <section className="rounded-2xl border border-white/10">
                    <div className="flex flex-col gap-2 bg-[#151b23] w-full p-6 rounded-2xl">
                        <h3 className="text-2xl font-bold text-white">Habits</h3>
                        <p className="text-sm text-[#9198a1]">All habits linked to this category.</p>
                    </div>

                    <div className="flex flex-col gap-1 p-6 ">
                        {habits ?
                            habits.map((habit, key) =>
                                <article key={key} className="rounded-xl borderr border-white/10 bg-[#0d1117]">

                                    <Link href={`/main/dashboard/habits/${habit.id}`}>
                                        <h4 className="text-lg font-semibold text-white">&emsp; - {habit.title}</h4>
                                    </Link>

                                </article>
                            )
                            :
                            <p className="bg-[#0d1117] px-4 py-1 text-sm text-[#9198a1]">
                                this category doesn't have any habits
                            </p>
                        }
                    </div>
                </section>
            </div>
        </section>

    )
}