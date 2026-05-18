import Link from "next/link";


export default function login(){
    return (<>
    <h1>login</h1>
<Link href={"/auth/register"}>register ??</Link>    
    </>
)
}