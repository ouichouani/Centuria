"use client";
import { useContext, useState } from "react";
import Report from "@/components/reports/Report.jsx";
import {AppContext} from "@/context/AppContext.jsx";

export default function ReportContainer({ post, setCount, setPosts }) {
    // THIS COMPONENT USED INSIDE THE POST COMPONENT IN REPORTS PAGES

    // post CONTAIN POST DATA 
    // setCount TO UPDATE THE COUNT STATE 
    // setPosts TO CLEAR THE POST FROM THE POSTS STATE IN CASE THERE WAS NO REPORTS LEFT

    const domain = process.env.NEXT_PUBLIC_API_DOMAIN;
    const [reports, setReports] = useState(post.reports || []);
    const {user} = useContext(AppContext)

    async function DeleteReport(report) {
        try {
            const response = await fetch(`${domain}/reports/${report.id}`, {
                method: "DELETE",
                credentials: "include", // store the cookie from the response
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) {
                const updatedReports = reports.filter(
                    item => item.id !== report.id
                );

                setReports(updatedReports);
                setCount(updatedReports.length);

                if (updatedReports.length === 0) {
                    setPosts(prev =>
                        prev.filter(item => item.id !== post.id)
                    );
                }
            }

        } catch (error) {
            console.error('llll' + error);
        }
    }

    async function ConfirmReport(report) {
        try {
            const response = await fetch(`${domain}/reports/${report.id}/confirm`, {
                method: "POST",
                credentials: "include", // store the cookie from the response
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) {
                const updatedReports = reports.filter(
                    item => item.id !== report.id
                );

                setReports(updatedReports);
                setCount(updatedReports.length);

                if (updatedReports.length === 0) {
                    setPosts(prev =>
                        prev.filter(item => item.id !== post.id)
                    );
                }
            }
        } catch (error) {
            console.error('llll' + error);
        }
    }


    return (
        <>
            {reports?.length ?

                reports?.map((report) =>
                    <Report key={report.id} report={report} DeleteReport={DeleteReport} ConfirmReport={ConfirmReport} user={user} />
                ) :
                <p className="text-[#9198a1] p-3 w-[90%]">no reported posts for the moment</p>
            }
        </>

    )
}