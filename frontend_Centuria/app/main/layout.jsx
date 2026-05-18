import Link from "next/link";
export default function main({ children }) {
    return (
        <>

            <aside>
                <span><Link href={'/main/dashboard'}>dashboard</Link></span> <br />
                <span><Link href={'/main/explore'}>explore</Link></span> <br />
                <span><Link href={'/main/profile'}>profile</Link></span> <br />
                <span><Link href={'/main/requests'}>requests</Link></span> <br />
                <span><Link href={'/main/controll-panel'}>controll-panel</Link></span> <br />
            </aside>
            <hr />

            <main>
                {children}
            </main>

        </>
    )
}