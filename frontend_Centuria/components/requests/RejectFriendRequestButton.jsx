'use client'

export default function RejectFriendRequestButton({id , setFriendRequests}) {

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;

    async function rejectRequest() {
        const response = await fetch(`${domain}/requests/${id}/reject`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        const data = await response.json() ;
        if(response.ok) setFriendRequests(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected' } : item) ) ;
        console.log(data) ;
    }

    return (
        <button title="refuse" onClick={rejectRequest}
            className="rounded-full border w-10 h-10 flex items-center justify-center cursor-pointer border-red-400/30 bg-red-500/10 text-sm font-medium text-red-200 transition hover:bg-red-500/20">
            <svg width="10px" height="10px" viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <defs>
                    </defs>
                    <g id="cancel">
                        <path className="cls-1" style={{ fill: "#ffffff" }}
                            d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
                        <path className="cls-1" style={{ fill: "#ffffff" }}
                            d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z" />
                    </g>
                </g>
            </svg>
        </button>
    )
}