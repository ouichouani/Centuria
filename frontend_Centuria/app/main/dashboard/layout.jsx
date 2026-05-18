import Link from 'next/link' ;
export default function dashboard({children}){

    return (
        <>
        <nav className="flex gap-3">
            <span><Link href='/main/dashboard/board'>board</Link></span> 
            <span><Link href='/main/dashboard/habits'>habits</Link></span> 
            <span><Link href='/main/dashboard/tasks'>tasks</Link></span> 
            <span><Link href='/main/dashboard/categories'>categories</Link></span> 
            <span><Link href='/main/dashboard/historie'>historie</Link></span> 
            <hr />
        </nav>
        <div>
            {children}
        </div>
        </>
    )

}