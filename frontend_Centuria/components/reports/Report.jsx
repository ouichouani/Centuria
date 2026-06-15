// import dayjs library to get diffForHumans functionality
import Link from "next/link";

// DAYJS IS A LIBRARY THAT MANIPUTALE DATES . 
// USED HERE TO KNOW HOW MUSH TAME PASS SINCE THE REPORT CREATED
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime);



export default function Report({ report , user, DeleteReport, ConfirmReport }) {

    // report IS CONTAIN ALL INFOS ABOUT THE REPORT
    // user IS THE AUTH USER . USED TO CHECK IF THE USER IS ADMIN TO SHOW THE PROPER UI
    // DeleteReport AND ConfirmReport ARE FUNCTIONS DECLARED IN THE PARENT TO DELETE/CONFIRM A REPORT

    // DECLARE A FUNCTION THAT DO THE SAME TASK AS diffForHumans IN PHP
    const diffForHumans = (date) => {
        return dayjs(report.created_at).fromNow()
    }

    function handleReportDelete() {
        DeleteReport(report)
    }

    function handleReportConfirm() {
        if(user.role != 'Admin') ConfirmReport(report) ;
    }


    return (
        <>
            <div className="border border-solid border-white/10 rounded-2xl mb-3">
                <div className="bg-[#151b23] w-full mb-3 py-2 px-2 rounded-t-2xl flex justify-between">

                    <Link href={`/main/explore/users/${report.user.id}`} className="flex items-center gap-4 w-fit">

                        <img className="h-10 w-10 rounded-full border border-white/20 bg-[#0d1117] object-cover"
                            src={report.user.image?.url ?? '/images/blank-profile.webp'}
                            alt={report.user.name} />
                        <div>
                            <h3 className="text-sm font-semibold text-white w-fit">
                                {report.user.name}
                            </h3>
                            <p className="text-xs text-[#9198a1]">
                                {diffForHumans(report.created_at)}</p>
                        </div>
                    </Link>

                    <div className="flex gap-3">
                        
                        <button onClick={handleReportDelete}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                className="cursor-pointer transition hover:text-red-400"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </g>
                            </svg>
                        </button>

                        {user.role != 'Admin' &&
                        <button onClick={handleReportConfirm}>
                            <svg width="23px" height="23px" viewBox="0 0 32 32"
                                className="cursor-pointer hover:text-green-500"
                                xmlns="http://www.w3.org/2000/svg" fill="#ffffff"
                                stroke="currentColor">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <defs>
                                    </defs>
                                    <g id="check">
                                        <path style={{ fill: "#ffffff" }}
                                            d="M12.16,28a3,3,0,0,1-2.35-1.13L3.22,18.62a1,1,0,0,1,1.56-1.24l6.59,8.24A1,1,0,0,0,13,25.56L27.17,4.44a1,1,0,1,1,1.66,1.12L14.67,26.67A3,3,0,0,1,12.29,28Z" />
                                    </g>
                                </g>

                            </svg>
                        </button>
                        }

                    </div>

                </div>

                <div className="px-6 py-4">
                    <p className="w-[80%]">{report.description}</p>
                </div>
            </div>
        </>
    )
}