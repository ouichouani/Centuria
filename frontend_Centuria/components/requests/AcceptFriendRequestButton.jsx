'use client'

export default function AcceptFriendRequestButton({id , setFriendRequests}) {
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;

    async function acceptRequest() {
        const response = await fetch(`${domain}/requests/${id}/accept`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        const data = await response.json() ;

        if(response.ok) setFriendRequests(prev => prev.map(item => item.id === id ? { ...item, status: 'accepted' } : item) ) ;
        console.log(data) ;
    }

    return (
        <button title="accept" onClick={acceptRequest}
            className="rounded-full border w-10 h-10 flex items-center justify-center cursor-pointer border-white/20 bg-[#0d1117] text-sm font-medium text-white transition hover:border-white/50">
            <svg width="12px" height="12px" viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <defs>
                    </defs>
                    <g id="check">
                        <path className="cls-1" style={{ fill: "#ffffff" }}
                            d="M12.16,28a3,3,0,0,1-2.35-1.13L3.22,18.62a1,1,0,0,1,1.56-1.24l6.59,8.24A1,1,0,0,0,13,25.56L27.17,4.44a1,1,0,1,1,1.66,1.12L14.67,26.67A3,3,0,0,1,12.29,28Z" />
                    </g>
                </g>
            </svg>
        </button>
    )
}

