

import Link from 'next/link';
import { cookies } from "next/headers";
import DeleteTask from './DeleteTask';

export default async function Showtask({ params }) {

    const { id } = await params;

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${domain}/tasks/${id}`, {
        method: "GET",
        headers: {
            "accept": "Application/json",
            "Content-Type": "application/json",
            cookie: cookieHeader,
        }
    });


    const data = await response.json();
    const task = data.task;
    console.log(task)


    return (
        <section className="mx-auto w-full max-w-5xl py-6">
            <div className="mb-6 rounded-2xl border border-white/10 bg-[#151b23] p-6 shadow-lg">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">

                        {task?.category_id != null &&
                            <div className="mb-4 flex items-center gap-3 mt-2">
                                <div
                                    className="h-3 w-3 rounded-full border border-white/70 bg-[#9198a1]" style={{background : task.category?.color}}>
                                </div>

                                <a href="{{ route('categories.show', $task->category?->id) }}">
                                    <p className="text-lg text-[#9198a1]">{ task.category.title }</p>
                                </a>
                            </div>
                        }

                        <h2 className="text-3xl font-bold text-white">{task?.title}</h2>


                        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#9198a1]">
                            {task?.description ?? 'No description'}
                        </p>

                    </div>

                    <div className="flex gap-3">
                        <Link href={`/main/dashboard/tasks/${id}/edit`}
                            className="rounded-lg border border-white/20 bg-[#0d1117] px-5 py-2 text-sm font-medium text-white transition hover:border-white/50">
                            update
                        </Link>
                        <DeleteTask id={id}/>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-2xl border border-white/10 bg-[#151b23] p-6 shadow-lg">
                    <h3 className="mb-5 text-xl font-bold text-white">Overview</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#9198a1]">Streaks</p>
                            <p className="mt-2 text-lg font-semibold text-white">{ task?.streaks}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#9198a1]">Category</p>
                            <p className="mt-2 text-lg font-semibold text-white">{ task?.category?.title ?? 'No category' }
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#9198a1]">Priority</p>
                            <p className="mt-2 text-lg font-semibold text-white">{ task?.priority}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#9198a1]">Difficulty</p>
                            <p className="mt-2 text-lg font-semibold text-white">{ task?.difficulty}</p>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-[#151b23] p-6 shadow-lg">
                    <h3 className="mb-5 text-xl font-bold text-white">More info</h3>
                    <div className="flex flex-col gap-4">
                        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#9198a1]">Deadline</p>
                            <p className="mt-2 text-lg font-semibold text-white">
                                { task?.deadline ? new Date(task?.deadline).toLocaleDateString() : 'No deadline'}
                            </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-[#0d1117] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#9198a1]">Frequency</p>
                            <p className="mt-2 text-lg font-semibold text-white">
                            {task?.frequency.length > 0 ?
                                task.frequency.join(', ')
                                :
                                <>No frequency set</>
                            }
                            </p>
                        </div>

                    </div>
                </section>
            </div>
        </section >

    )
}