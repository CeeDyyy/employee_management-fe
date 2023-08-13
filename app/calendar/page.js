"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { Page } from '@/components/layouts';
import { format, compareAsc } from 'date-fns'

export default function Shift() {
    const searchParams = useSearchParams();
    const date = new Date()
    const month = [
        { enLong: 'January', enShort: 'Jan', thLong: 'มกราคม', thShort: 'มกรา', thAbbr: 'ม.ค.' },
        { enLong: 'February', enShort: 'Feb', thLong: 'กุมภาพันธ์', thShort: 'กุมภา', thAbbr: 'ก.พ.' },
        { enLong: 'March', enShort: 'Mar', thLong: 'มีนาคม ', thShort: 'มีนา', thAbbr: 'มี.ค.' },
        { enLong: 'April', enShort: 'Apr', thLong: 'เมษายน ', thShort: 'เมษา', thAbbr: 'เม.ย.' },
        { enLong: 'May', enShort: 'May', thLong: 'พฤษภาคม', thShort: 'พฤษภา', thAbbr: 'พ.ค.' },
        { enLong: 'June', enShort: 'June', thLong: 'มิถุนายน', thShort: 'มิถุนา', thAbbr: 'มิ.ย.' },
        { enLong: 'July', enShort: 'July', thLong: 'กรกฎาคม', thShort: 'กรกฎา', thAbbr: 'ก.ค.' },
        { enLong: 'August', enShort: 'Aug', thLong: 'สิงหาคม', thShort: 'สิงหาคม', thAbbr: 'ส.ค.' },
        { enLong: 'September', enShort: 'Sept', thLong: 'กันยายน', thShort: 'กันยา', thAbbr: 'ก.ย.' },
        { enLong: 'October', enShort: 'Oct', thLong: 'ตุลาคม', thShort: 'ตุลา', thAbbr: 'ต.ค.' },
        { enLong: 'November', enShort: 'Nov', thLong: 'พฤศจิกายน', thShort: 'พฤศจิกา', thAbbr: 'พ.ย.' },
        { enLong: 'December', enShort: 'Dec', thLong: 'ธันวาคม', thShort: 'ธันวา', thAbbr: 'ธ.ค.' },
    ]
    const days = [
        { enLong: 'Monday', enShort: 'Sun', thLong: 'อาทิตย์', thShort: 'อาทิตย์', thAbbr: 'อา' },
        { enLong: 'Tuesday', enShort: 'Mon', thLong: 'จันทร์', thShort: 'จันทร์', thAbbr: 'จ' },
        { enLong: 'Wednesday', enShort: 'Tue', thLong: 'อังคาร ', thShort: 'อังคาร', thAbbr: 'อ' },
        { enLong: 'Thursday', enShort: 'Wed', thLong: 'พุธ ', thShort: 'พุธ', thAbbr: 'พ' },
        { enLong: 'Friday', enShort: 'Thu', thLong: 'พฤหัสบดี', thShort: 'พฤหัส', thAbbr: 'พฤ' },
        { enLong: 'Saturday', enShort: 'Fri', thLong: 'ศุกร์', thShort: 'ศุกร์', thAbbr: 'ศ' },
        { enLong: 'Sunday', enShort: 'Sat', thLong: 'เสาร์', thShort: 'เสาร์', thAbbr: 'ส' },
    ]
    const startDay = ['col-start-1', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7']

    const [selectedMonth, setSelectedMonth] = useState(date.getMonth())
    const [selectedYear, setSelectedYear] = useState(date.getFullYear())
    const [display, setDisplay] = useState("tiles")
    const [detailPanel, setDetailPanel] = useState(searchParams.get("detailpanel") || "")
    const [firstDay, setFirstDay] = useState(new Date(selectedYear, selectedMonth, 1).getDay())
    const [lastDate, setLastDate] = useState(new Date(selectedYear, selectedMonth + 1, 0).getDate())

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [detail, setDetail] = useState("")
    const [selectedCar, setSelectedCar] = useState("")

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    useEffect(() => {
        getLeaves()
        getBookings()
        setFirstDay(new Date(selectedYear, selectedMonth, 1).getDay())
        setLastDate(new Date(selectedYear, selectedMonth + 1, 0).getDate())
    }, [selectedMonth])

    function decreaseMonth() {
        if (selectedMonth === 0) {
            setSelectedMonth(11)
            setSelectedYear(selectedYear - 1)
        } else {
            setSelectedMonth(selectedMonth - 1)
        }
    }

    function increaseMonth() {
        if (selectedMonth === 11) {
            setSelectedMonth(0)
            setSelectedYear(selectedYear + 1)
        } else {
            setSelectedMonth(selectedMonth + 1)
        }
    }

    const [leaves, setLeaves] = useState([])
    const [bookings, setBookings] = useState([])

    function getLeaves() {
        fetch("http://localhost:3001/leaves")
            .then((response) => response.json())
            .then((res) => {
                setLeaves(res)
            })
            .catch((error) => {
                console.error("getLeaves() Error:", error);
            });
    }

    function getBookings() {
        fetch("http://localhost:3001/bookings")
            .then((response) => response.json())
            .then((res) => {
                setBookings(res)
            })
            .catch((error) => {
                console.error("getLeaves() Error:", error);
            });
    }

    function submit() {
        if (detailPanel === "leave") submitLeave()
        if (detailPanel === "booking") submitBooking()
    }

    function submitLeave() {
        console.log("Leave")
        console.log('from: ' + startDate + ' to: ' + endDate)
        console.log('detail: ' + detail)
        setDetailPanel("")
        setStartDate("")
        setEndDate("")
        setDetail("")
        setSelectedIssue("")
    }

    function submitBooking() {
        console.log("Booking")
        console.log('from: ' + startDate + ' to: ' + endDate)
        console.log('detail: ' + detail)
        console.log('car: ' + selectedCar)
        setDetailPanel("")
        setStartDate("")
        setEndDate("")
        setDetail("")
        setSelectedCar("")
        setSelectedIssue("")
    }

    const [selectedIssue, setSelectedIssue] = useState("")

    return (
        <Page title="Shifts">
            <div className="grid grid-cols-3 content-center">
                {display === "tiles" ?
                    <button onClick={() => setDisplay("list")} className="w-fit p-1">
                        <svg fill="#06B6D4" width="24px" height="24px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M50,15.52H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H50a2,2,0,0,1,2,2V13.52A2,2,0,0,1,50,15.52Zm-46-4H48V4H4Z" /><path d="M50,33.76H2a2,2,0,0,1-2-2V20.24a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V31.76A2,2,0,0,1,50,33.76Zm-46-4H48V22.24H4Z" /><path d="M50,52H2a2,2,0,0,1-2-2V38.48a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V50A2,2,0,0,1,50,52ZM4,48H48V40.48H4Z" /></g></svg>
                    </button>
                    :
                    <button onClick={() => setDisplay("tiles")} className="w-fit">
                        <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" width="32px" height="32px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <style type="text/css" dangerouslySetInnerHTML={{ __html: " .st0{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;} " }} /> <rect x={4} y={4} className="st0" width={10} height={10} /> <rect x={4} y={18} className="st0" width={10} height={10} /> <rect x={18} y={4} className="st0" width={10} height={10} /> <rect x={18} y={18} className="st0" width={10} height={10} /> </g></svg>
                    </button>
                }
                <div>
                    <p className="text-center font-bold">{month[selectedMonth].enLong}</p>
                    <p className="text-center text-gray-500 text-sm">{selectedYear}</p>
                </div>
                <button onClick={() => setDetailPanel("detail")} className="justify-self-end flex items-center px-3 bg-cyan-500 border border-cyan-900 rounded w-fit">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g> </g></svg>
                    <p className="ml-1 text-center text-sm text-white">
                        เพิ่มรายการ
                    </p>
                </button>
            </div>
            <div className="grid md:grid-cols-2">

                <div>
                    <svg onClick={() => decreaseMonth()} className="w-full justify-self-center cursor-pointer" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="#0F0F0F" /> </g></svg>

                    <div className={`${display === "tiles" ? 'grid grid-cols-7 place-items-center' : 'flex overflow-y-auto'} gap-2`}>
                        {days.map((day) =>
                            <div className="w-full bg-cyan-100 border border-cyan-500 rounded text-center select-none" hidden={display !== "tiles"} key={day.enShort.toLocaleLowerCase()}>{day.enShort.toLocaleUpperCase()}</div>
                        )}
                        {[...Array(lastDate)].map((_, i) => {
                            const yyyyMMdd = `${selectedYear}-${zeroPad(selectedMonth + 1, 2)}-${zeroPad(i + 1, 2)}`
                            return (
                                <div onClick={() => {
                                    (detailPanel !== "leave" && detailPanel !== "booking") && setDetailPanel(`detail${yyyyMMdd}`);
                                    setSelectedIssue("");
                                    setStartDate(yyyyMMdd + 'T00:00');
                                    setEndDate(yyyyMMdd + 'T00:00')
                                }}
                                    className={`w-full border border-cyan-500 rounded text-center cursor-pointer
                                            ${display === "list" ? 'h-full' : 'h-16'} 
                                            ${(display === "tiles" && i === 0) && startDay[firstDay]} 
                                            ${format(date, 'yyyy-MM-dd') === yyyyMMdd ? 'bg-cyan-100' :
                                            compareAsc(new Date(selectedYear, selectedMonth, i + 1), new Date()) === -1 ? 'bg-neutral-200' : 'bg-neutral-50'}`}
                                    key={i}
                                >
                                    <p className="text-xs font-bold">{i + 1}</p>
                                    <hr />
                                    {leaves.map((leave) =>
                                        (yyyyMMdd >= leave.startDate.slice(0, 10) && yyyyMMdd <= leave.endDate.slice(0, 10)) &&
                                        <div className={leave.status === "approved" ? 'bg-emerald-200' : leave.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'} key={leave.id}>
                                            <p className="text-xs truncate">👋 {leave.userId}</p>
                                        </div>
                                    )}
                                    {bookings.map((booking) =>
                                        (yyyyMMdd >= booking.startDate.slice(0, 10) && yyyyMMdd <= booking.endDate.slice(0, 10)) &&
                                        <div className={booking.status === "approved" ? 'bg-emerald-200' : booking.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'} key={booking.id}>
                                            <p className="text-xs truncate">🚗 {booking.userId}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                        )}
                    </div>

                    <svg onClick={() => increaseMonth()} className="w-full justify-self-center cursor-pointer" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#0F0F0F" /> </g></svg>
                </div>

                <div className={`absolute    top-0       w-screen  h-screen
                                 md:relative md:top-auto md:w-full md:h-full
                                 left-0 bg-neutral-50 ${detailPanel ? 'block' : 'hidden'}`}
                >
                    <svg onClick={() => { setDetailPanel(""); setSelectedIssue(""); }} className="fixed right-0 w-10 ml-auto mt-2 mr-2 rounded-full cursor-pointer ease-out hover:scale-110 hover:bg-red-100 duration-100 md:hidden bg-neutral-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">{" "}<path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{" "}</g></svg>
                    <div className="mt-10 p-4">

                        {(detailPanel.slice(0, 6) === "detail" && detailPanel.length === 16) ? <p className="mb-4 text-center font-bold">{format(new Date(detailPanel.slice(6, 16)), 'EEEE d MMMM yyyy')}</p> : ""}

                        <div className={detailPanel.slice(0, 6) === "detail" ? 'block grid grid-cols-2 gap-4' : 'hidden'}>
                            <button onClick={() => setDetailPanel("leave")} className="flex justify-center items-center h-20 w-full cursor-pointer bg-cyan-500 border border-cyan-900 rounded-lg shadow-md">
                                <p className="text-white">
                                    ลา
                                </p>
                            </button>
                            <button onClick={() => setDetailPanel("booking")} className="flex justify-center items-center h-20 w-full cursor-pointer bg-cyan-500 border border-cyan-900 rounded-lg shadow-md">
                                <p className="text-white">
                                    จองรถ
                                </p>
                            </button>
                        </div>
                        {(detailPanel.slice(0, 6) === "detail" && detailPanel.length === 16) &&
                            <div className="mt-2 grid gap-y-2">
                                {leaves.map((leave) =>
                                    (format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') >= leave.startDate.slice(0, 10) && format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') <= leave.endDate.slice(0, 10)) &&
                                    <div onClick={() => setSelectedIssue(leave)} className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${leave.status === "approved" ? 'bg-emerald-200' : leave.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'}`} key={leave.id}>
                                        <p className="text-xs md:text-sm">
                                            <span>👋 ลาโดย: </span>
                                            <span className="font-bold">{leave.userId}</span>
                                            <span className="ml-2"> สถานะ: </span>
                                            <span className="font-bold">{leave.status}</span>
                                        </p>
                                        <p className="-mt-0.5">👁️‍🗨️</p>
                                    </div>
                                )}
                                {bookings.map((booking) =>
                                    (format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') >= booking.startDate.slice(0, 10) && format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') <= booking.endDate.slice(0, 10)) &&
                                    <div onClick={() => setSelectedIssue(booking)} className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${booking.status === "approved" ? 'bg-emerald-200' : booking.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'}`} key={booking.id}>
                                        <p className="text-xs md:text-sm">
                                            <span>🚗 จองโดย: </span>
                                            <span className="font-bold">{booking.userId}</span>
                                            <span className="ml-2"> รถ: </span>
                                            <span className="font-bold">{booking.carId}</span>
                                            <span className="ml-2"> สถานะ: </span>
                                            <span className="font-bold">{booking.status}</span>
                                        </p>
                                        <p className="-mt-0.5">👁️‍🗨️</p>
                                    </div>
                                )}
                                {selectedIssue &&
                                    <div className="p-2 grid grid-cols-4 border rounded-md text-xs md:text-sm">
                                        <p>แจ้งโดย: </p><p className={!selectedIssue.carId ? 'col-span-3 font-bold' : 'font-bold'}>{selectedIssue.userId}</p><p className={!selectedIssue.carId ? 'hidden' : ''}>รถ: </p><p className={!selectedIssue.carId ? 'hidden' : 'font-bold'}>{selectedIssue.carId}</p>
                                        <p>รายละเอียด: </p><p className="col-span-3 font-bold">{selectedIssue.detail}</p>
                                        <p>ตั้งแต่: </p><p className="font-bold">{selectedIssue.startDate}</p><p>ถึง: </p><p className="font-bold">{selectedIssue.endDate}</p>
                                        <p>ลงบันทึกเมื่อ: </p><p className="col-span-3 font-bold">{selectedIssue.timeStamp}</p>
                                        <p>สถานะ: </p><p className="col-span-3 font-bold">{selectedIssue.status}</p>
                                        <p>ผู้ให้อนุญาต: </p><p className="font-bold">{selectedIssue.approver}</p><p>เวลา: </p><p className="font-bold">{selectedIssue.changedTimeStamp}</p>
                                        <p>เหตุผล: </p><p className="col-span-3 font-bold">{selectedIssue.reason}</p>
                                    </div>
                                }
                            </div>
                        }

                        <div className={(detailPanel === "leave" || detailPanel === "booking") ? 'block grid grid-cols-4 gap-4' : 'hidden'}>
                            <p>วันที่ : </p>
                            <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <p className="w-12 md:w-14">ตั้งแต่</p>
                                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border-2 rounded-md grow" />
                                </div>
                                <div className="flex items-center">
                                    <p className="w-12 md:w-14">ถึง</p>
                                    <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border-2 rounded-md grow" />
                                </div>
                            </div>
                            <p>รายละเอียด : </p>
                            <textarea value={detail} onChange={(e) => setDetail(e.target.value)} className="col-span-3 border-2 rounded-md" />
                            <p className={detailPanel === "booking" ? 'block' : 'hidden'}>รถ : </p>
                            <select id="cars" name="cars" value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} className={detailPanel === "booking" ? 'block col-span-3 border-2 rounded-md' : 'hidden'}>
                                <option value="volvo">Volvo XC90</option>
                                <option value="saab">Saab 95</option>
                                <option value="mercedes">Mercedes SLK</option>
                                <option value="audi">Audi TT</option>
                            </select>
                            <div className="col-span-4 mt-20 flex justify-around">
                                <button onClick={() => submit()} className="flex justify-center items-center py-2 w-40 bg-cyan-500 border border-cyan-900 rounded w-fit">
                                    <p className="text-white">ลงรายการ</p>
                                </button>
                                <button onClick={() => setDetailPanel("detail")} className="flex justify-center items-center py-2 w-40 bg-white border border-red-500 rounded w-fit">
                                    <p className="text-black">ยกเลิกรายการ</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page >
    )
}