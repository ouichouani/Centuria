
import SideBar from '@/components/layout/SideBar.jsx';
import Header from '@/components/layout/Header.jsx';
import Head from '@/components/layout/Head.jsx';


export default function MainLayout({ children }) {


    return (
        <>
            <Head />
            <body className="bg-[#151b23]">
                <div className="flex w-full h-screen">

                    <SideBar />

                    <section className="w-full overflow-y-auto bg-[#0d1117] text-white [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-thumb]:bg-blue-500">
                        <Header />
                        <main className="text-sm p-[1em] h-full">
                            {children}
                        </main>
                    </section>
                </div>
            </body>
        </>
    )
}