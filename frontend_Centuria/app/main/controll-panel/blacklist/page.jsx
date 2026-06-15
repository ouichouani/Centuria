import BlackList from "@/components/users/BlackList.jsx";
export default function ActiveUsers() {

    return (
        <section className="mx-auto w-full max-w-6xl">

            <div className="mb-6 rounded-2xl border border-white/10 bg-[#151b23] px-6 py-5 shadow-lg">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-wide text-white">Black list</h2>
                        <p className="mt-2 text-sm text-[#9198a1]"> Review banned users and restore access when needed </p>
                    </div>
                </div>
            </div>
            
            <section className="flex flex-col gap-2 ">
                <BlackList />
            </section>

        </section>
    )
}