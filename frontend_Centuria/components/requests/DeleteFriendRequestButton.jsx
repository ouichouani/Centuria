'use client'

export default function DeleteFriendRequestButton({id , setFriendRequests}) {


    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;

    async function deleteRequest() {
        const response = await fetch(`${domain}/requests/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if(response.ok) setFriendRequests(prev => prev.filter(item => item.id != id) ) ;
        console.log(data) ;
        console.log(data);
    }


    return (
        <button onClick={deleteRequest}
            className=" rounded-full border  w-10 h-10 flex items-center justify-center cursor-pointer  border-white/10 bg-[#151b23] text-sm font-medium text-[#9198a1] transition hover:border-white/20 hover:text-red-500">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" className=""
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z"
                        stroke="CurrentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" />
                </g>
            </svg>
        </button>
    )
}