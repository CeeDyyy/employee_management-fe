"use client"

import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { UserContext } from '@/app/layout';
import { PageLayout } from '@/components/layouts';

import { DetailPanel } from './components/DetailPanel';
import { TheCalendar } from './components/TheCalendar';

export default function Calendar() {
    const { user, token } = useContext(UserContext);
    const searchParams = useSearchParams();

    const [display, setDisplay] = useState(searchParams.get("display") || "tiles")
    const [detailPanel, setDetailPanel] = useState(searchParams.get("detailpanel") || "")
    const [ifData, setIfData] = useState(searchParams.get("ifdata") || false)
    const [onlyMe, setOnlyMe] = useState(searchParams.get("onlyme") || false)

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    function reFetch() {
        getLeaves()
        getBookings()
    }

    useEffect(() => {
        if (token) {
            reFetch()
        }
    }, [token])

    const [leaves, setLeaves] = useState([{ id: "xxx", user_id: "noobyz", status: "pending", user: { fullname: "ธนวัฒน์ อุดชาชน" }, type: "ลาพักร้อน", detail: "ไปต่างจังหวัด", start_date: "2026-04-06T09:00", end_date: "2026-04-06T18:00", timestamp: "2026-04-04T12:34", approver: "", updated: "2026-04-04T12:34"}])
    const [bookings, setBookings] = useState([])

    function getLeaves() {
        fetch(process.env.NEXT_PUBLIC_SERVICE_URL + "leaves/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            }
        })
            .then((response) => response.json())
            .then((res) => {
                setLeaves(res.data)
            })
            .catch((error) => {
                console.error("getLeaves() Error:", error);
            });
    }

    function getBookings() {
        fetch(process.env.NEXT_PUBLIC_SERVICE_URL + "carbookings/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            }
        })
            .then((response) => response.json())
            .then((res) => {
                setBookings(res.data)
            })
            .catch((error) => {
                console.error("getBookings() Error:", error);
            });
    }

    return (
        <PageLayout title="Calendar">
            <div className="pt-2 grid grid-cols-2 content-center">
                <details>
                    <summary className="w-8 h-8 flex justify-center cursor-pointer list-none bg-blue-50 rounded duration-150">
                        {display === "tiles" &&
                            <div>
                                <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" width="32px" height="32px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <style type="text/css" dangerouslySetInnerHTML={{ __html: " .st0{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;} " }} /> <rect x={4} y={4} className="st0" width={10} height={10} /> <rect x={4} y={18} className="st0" width={10} height={10} /> <rect x={18} y={4} className="st0" width={10} height={10} /> <rect x={18} y={18} className="st0" width={10} height={10} /> </g></svg>
                            </div>
                        }
                        {display === "vertical" &&
                            <div className="p-1">
                                <svg fill="#06B6D4" width="24px" height="24px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M50,15.52H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H50a2,2,0,0,1,2,2V13.52A2,2,0,0,1,50,15.52Zm-46-4H48V4H4Z" /><path d="M50,33.76H2a2,2,0,0,1-2-2V20.24a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V31.76A2,2,0,0,1,50,33.76Zm-46-4H48V22.24H4Z" /><path d="M50,52H2a2,2,0,0,1-2-2V38.48a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V50A2,2,0,0,1,50,52ZM4,48H48V40.48H4Z" /></g></svg>
                            </div>
                        }
                        {display === "horizontal" &&
                            <div>
                                <svg fill="#06B6D4" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" d="M8,2 C9.65685425,2 11,3.34314575 11,5 L11,19 C11,20.6568542 9.65685425,22 8,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L8,2 Z M19,2 C20.6568542,2 22,3.34314575 22,5 L22,19 C22,20.6568542 20.6568542,22 19,22 L16,22 C14.3431458,22 13,20.6568542 13,19 L13,5 C13,3.34314575 14.3431458,2 16,2 L19,2 Z M8,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,19 C4,19.5522847 4.44771525,20 5,20 L8,20 C8.55228475,20 9,19.5522847 9,19 L9,5 C9,4.44771525 8.55228475,4 8,4 Z M19,4 L16,4 C15.4477153,4 15,4.44771525 15,5 L15,19 C15,19.5522847 15.4477153,20 16,20 L19,20 C19.5522847,20 20,19.5522847 20,19 L20,5 C20,4.44771525 19.5522847,4 19,4 Z" /> </g></svg>
                            </div>
                        }
                    </summary>
                    <div className="absolute p-2 grid justify-items-center divide-y-2 rounded bg-white">
                        <button onClick={() => setDisplay("tiles")} className="w-fit p-1 hover:bg-gray-100 rounded duration-150">
                            <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" width="32px" height="32px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <style type="text/css" dangerouslySetInnerHTML={{ __html: " .st0{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;} " }} /> <rect x={4} y={4} className="st0" width={10} height={10} /> <rect x={4} y={18} className="st0" width={10} height={10} /> <rect x={18} y={4} className="st0" width={10} height={10} /> <rect x={18} y={18} className="st0" width={10} height={10} /> </g></svg>
                        </button>
                        <button onClick={() => setDisplay("vertical")} className="w-fit p-2 hover:bg-gray-100 rounded duration-150">
                            <svg fill="#06B6D4" width="24px" height="24px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M50,15.52H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H50a2,2,0,0,1,2,2V13.52A2,2,0,0,1,50,15.52Zm-46-4H48V4H4Z" /><path d="M50,33.76H2a2,2,0,0,1-2-2V20.24a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V31.76A2,2,0,0,1,50,33.76Zm-46-4H48V22.24H4Z" /><path d="M50,52H2a2,2,0,0,1-2-2V38.48a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V50A2,2,0,0,1,50,52ZM4,48H48V40.48H4Z" /></g></svg>
                        </button>
                        <button onClick={() => setDisplay("horizontal")} className="w-fit p-1 hover:bg-gray-100 rounded duration-150">
                            <svg fill="#06B6D4" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" d="M8,2 C9.65685425,2 11,3.34314575 11,5 L11,19 C11,20.6568542 9.65685425,22 8,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L8,2 Z M19,2 C20.6568542,2 22,3.34314575 22,5 L22,19 C22,20.6568542 20.6568542,22 19,22 L16,22 C14.3431458,22 13,20.6568542 13,19 L13,5 C13,3.34314575 14.3431458,2 16,2 L19,2 Z M8,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,19 C4,19.5522847 4.44771525,20 5,20 L8,20 C8.55228475,20 9,19.5522847 9,19 L9,5 C9,4.44771525 8.55228475,4 8,4 Z M19,4 L16,4 C15.4477153,4 15,4.44771525 15,5 L15,19 C15,19.5522847 15.4477153,20 16,20 L19,20 C19.5522847,20 20,19.5522847 20,19 L20,5 C20,4.44771525 19.5522847,4 19,4 Z" /> </g></svg>
                        </button>
                    </div>
                </details>
                <button onClick={() => setDetailPanel("detail")} className="group/add justify-self-end flex items-center px-3 bg-cyan-500 hover:saturate-150 active:scale-95 duration-150 border border-cyan-900 rounded w-fit">
                    <svg className="group-hover/add:scale-110 duration-150 " width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g> </g></svg>
                    <p className="ml-1 text-center text-sm text-white">
                        เพิ่มรายการ
                    </p>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">

                <TheCalendar
                    display={display}
                    detailPanel={detailPanel} setDetailPanel={setDetailPanel} leaves={leaves} bookings={bookings}
                    setStartDate={setStartDate} setEndDate={setEndDate}
                />

                <DetailPanel
                    detailPanel={detailPanel} setDetailPanel={setDetailPanel} leaves={leaves} bookings={bookings}
                    startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                />

            </div>
        </PageLayout>
    )
}