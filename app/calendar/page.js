"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { format, compareAsc } from 'date-fns';
import Swal from 'sweetalert2';

import { PageLayout } from '@/components/layouts';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
export default function Calendar() {
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
    const [display, setDisplay] = useState(searchParams.get("display") || "tiles")
    const [detailPanel, setDetailPanel] = useState(searchParams.get("detailpanel") || "")
    const [ifData, setIfData] = useState(searchParams.get("ifdata") || false)
    const [onlyMe, setOnlyMe] = useState(searchParams.get("onlyme") || false)
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
        getCars()
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
    const [cars, setCars] = useState([])

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

    function getCars() {
        fetch("http://localhost:3001/cars")
            .then((response) => response.json())
            .then((res) => {
                setCars(res)
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
        setSelectedLeave("")
        setSelectedBooking("")
        Toast.fire({
            icon: 'success',
            title: 'บันทึกการลาเรียบร้อย'
        })
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
        setSelectedLeave("")
        setSelectedBooking("")
        Toast.fire({
            icon: 'success',
            title: 'บันทึกการจองเรียบร้อย'
        })
    }

    const [selectedLeave, setSelectedLeave] = useState("")
    const [selectedBooking, setSelectedBooking] = useState("")

    return (
        <PageLayout title="Calendar">
            <div className="pt-2 grid grid-cols-2 content-center">
                <details>
                    <summary className="w-8 h-8 flex justify-center cursor-pointer list-none">
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
                        <button onClick={() => setDisplay("tiles")} className="w-fit p-1 hover:bg-gray-100 rounded-md duration-150">
                            <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" width="32px" height="32px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <style type="text/css" dangerouslySetInnerHTML={{ __html: " .st0{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;} " }} /> <rect x={4} y={4} className="st0" width={10} height={10} /> <rect x={4} y={18} className="st0" width={10} height={10} /> <rect x={18} y={4} className="st0" width={10} height={10} /> <rect x={18} y={18} className="st0" width={10} height={10} /> </g></svg>
                        </button>
                        <button onClick={() => setDisplay("vertical")} className="w-fit p-2 hover:bg-gray-100 rounded-md duration-150">
                            <svg fill="#06B6D4" width="24px" height="24px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M50,15.52H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H50a2,2,0,0,1,2,2V13.52A2,2,0,0,1,50,15.52Zm-46-4H48V4H4Z" /><path d="M50,33.76H2a2,2,0,0,1-2-2V20.24a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V31.76A2,2,0,0,1,50,33.76Zm-46-4H48V22.24H4Z" /><path d="M50,52H2a2,2,0,0,1-2-2V38.48a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V50A2,2,0,0,1,50,52ZM4,48H48V40.48H4Z" /></g></svg>
                        </button>
                        <button onClick={() => setDisplay("horizontal")} className="w-fit p-1 hover:bg-gray-100 rounded-md duration-150">
                            <svg fill="#06B6D4" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" d="M8,2 C9.65685425,2 11,3.34314575 11,5 L11,19 C11,20.6568542 9.65685425,22 8,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L8,2 Z M19,2 C20.6568542,2 22,3.34314575 22,5 L22,19 C22,20.6568542 20.6568542,22 19,22 L16,22 C14.3431458,22 13,20.6568542 13,19 L13,5 C13,3.34314575 14.3431458,2 16,2 L19,2 Z M8,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,19 C4,19.5522847 4.44771525,20 5,20 L8,20 C8.55228475,20 9,19.5522847 9,19 L9,5 C9,4.44771525 8.55228475,4 8,4 Z M19,4 L16,4 C15.4477153,4 15,4.44771525 15,5 L15,19 C15,19.5522847 15.4477153,20 16,20 L19,20 C19.5522847,20 20,19.5522847 20,19 L20,5 C20,4.44771525 19.5522847,4 19,4 Z" /> </g></svg>
                        </button>
                    </div>
                </details>
                <button onClick={() => setDetailPanel("detail")} className="justify-self-end flex items-center px-3 bg-cyan-500 border border-cyan-900 rounded w-fit">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g> </g></svg>
                    <p className="ml-1 text-center text-sm text-white">
                        เพิ่มรายการ
                    </p>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">

                <div>
                    <div className="my-3 flex justify-between items-center">
                        <p onClick={() => decreaseMonth()} className="flex items-center text-xs md:text-sm text-cyan-500 cursor-pointer">
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#06B6D4" /> </g></svg>
                            เดือนก่อนหน้า
                        </p>
                        <div>
                            <p className="text-center font-bold">{month[selectedMonth].thLong}</p>
                            <p className="text-center text-gray-500 text-sm">{selectedYear}</p>
                        </div>
                        <p onClick={() => increaseMonth()} className="flex items-center text-xs md:text-sm text-cyan-500 cursor-pointer">
                            เดือนถัดไป
                            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#06B6D4" /> </g></svg>
                        </p>
                    </div>

                    <div className={`${display === "tiles" && 'grid grid-cols-7 place-items-center gap-2'}
                                    ${display === "vertical" && 'flex overflow-x-scroll'}
                                    ${display === "horizontal" && 'h-[66vh] overflow-y-scroll'}`}>
                        {days.map((day) =>
                            <div className="w-full bg-cyan-100 border border-cyan-500 rounded text-center font-semibold select-none" hidden={display !== "tiles"} key={day.enShort.toLocaleLowerCase()}>{day.enShort.toLocaleUpperCase()}</div>
                        )}
                        {[...Array(lastDate)].map((_, i) => {
                            const yyyyMMdd = `${selectedYear}-${zeroPad(selectedMonth + 1, 2)}-${zeroPad(i + 1, 2)}`
                            return (
                                <div
                                    onClick={() => {
                                        (detailPanel !== "leave" && detailPanel !== "booking") && setDetailPanel(`detail${yyyyMMdd}`);
                                        setSelectedLeave("");
                                        setSelectedBooking("");
                                        setStartDate(yyyyMMdd + 'T00:00');
                                        setEndDate(yyyyMMdd + 'T00:00')
                                    }}
                                    className={`w-full border text-center cursor-pointer
                                            ${display === "tiles" && 'border-cyan-500 rounded h-16 overflow-y-auto'}
                                            ${display === "vertical" && 'mx-1 h-full border-neutral-300 rounded-md'}
                                            ${display === "horizontal" && 'flex my-2 rounded-xl'}
                                            ${(display === "tiles" && i === 0) && startDay[firstDay]} 
                                            ${(new Date(yyyyMMdd).getDay() === 0 || new Date(yyyyMMdd).getDay() === 6) ? 'bg-slate-200' :
                                            format(date, 'yyyy-MM-dd') === yyyyMMdd ? 'bg-cyan-100' :
                                                compareAsc(new Date(selectedYear, selectedMonth, i + 1), new Date()) === -1 ? 'bg-neutral-100' : 'bg-white'}`}
                                    key={i}
                                >
                                    <div className={`${display === "horizontal" && 'my-2 w-20 border-r'}`}>
                                        <p className={`text-sm font-bold ${display === "tiles" && 'hidden'}`}>{format(new Date(yyyyMMdd), 'EEE')}</p>
                                        <p className={`text-xs font-bold ${display === "horizontal" && 'mx-auto py-1.5 px-3 w-fit bg-cyan-50 rounded-full'}`}>{i + 1}</p>
                                        <hr className={`border border-neutral-300 ${display === "vertical" && 'w-20'} ${display === "horizontal" && 'hidden'}`} />
                                    </div>

                                    <div className={`${display === "vertical" && 'h-[60vh] flex flex-col gap-y-2 py-2'} ${display === "horizontal" && 'w-full'}`}>
                                        {leaves.map((leave) =>
                                            (yyyyMMdd >= leave.startDate.slice(0, 10) && yyyyMMdd <= leave.endDate.slice(0, 10)) &&
                                            <div className={`my-1 rounded ${display === "vertical" && 'py-1'} ${display === "horizontal" && 'mx-2 grow'} ${leave.status === "approved" ? 'bg-emerald-200' : leave.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'}`} key={leave.id}>
                                                <p className="text-xs truncate">👋 {leave.userId}</p>
                                            </div>
                                        )}
                                        {bookings.map((booking) =>
                                            (yyyyMMdd >= booking.startDate.slice(0, 10) && yyyyMMdd <= booking.endDate.slice(0, 10)) &&
                                            <div className={`my-1 rounded ${display === "vertical" && 'py-1'} ${display === "horizontal" && 'mx-2 grow'} ${booking.status === "approved" ? 'bg-emerald-200' : booking.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'}`} key={booking.id}>
                                                <p className="text-xs truncate">🚗 {booking.userId}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>

                <div className={`absolute    top-0       w-screen  h-screen
                                 md:relative md:top-auto md:w-full md:h-full
                                 left-0 bg-neutral-50 ${detailPanel ? 'block' : 'hidden'}`}
                >
                    <svg onClick={() => { setDetailPanel(""); setSelectedLeave(""); setSelectedBooking(""); }} className="fixed right-0 w-10 ml-auto mt-2 mr-2 rounded-full cursor-pointer ease-out hover:scale-110 hover:bg-red-100 duration-100 md:hidden bg-neutral-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">{" "}<path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{" "}</g></svg>
                    <div className="mt-10 p-4">

                        {(detailPanel.slice(0, 6) === "detail" && detailPanel.length === 16) ? <p className="mb-4 text-center font-bold">{format(new Date(detailPanel.slice(6, 16)), 'EEEE d MMMM yyyy')}</p> : ""}

                        <div className={detailPanel.slice(0, 6) === "detail" ? 'grid grid-cols-2 gap-4' : 'hidden'}>
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
                                    <div key={leave.id}>
                                        <div onClick={() => { selectedLeave.id === leave.id ? setSelectedLeave("") : setSelectedLeave(leave); setSelectedBooking(""); }} className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${leave.status === "approved" ? 'bg-emerald-200' : leave.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'}`} key={leave.id}>
                                            <p className="text-xs md:text-sm">
                                                <span>👋 ลาโดย: </span>
                                                <span className="font-bold">{leave.userId}</span>
                                                <span className="ml-2"> สถานะ: </span>
                                                <span className="font-bold">{leave.status}</span>
                                            </p>
                                            <p className="-mt-0.5">👁️‍🗨️</p>
                                        </div>
                                        {selectedLeave && selectedLeave.id === leave.id &&
                                            <div className="p-2 grid grid-cols-4 border rounded-md text-xs md:text-sm">
                                                <p>แจ้งโดย: </p><p className={!selectedLeave.carId ? 'col-span-3 font-bold' : 'font-bold'}>{selectedLeave.userId}</p><p className={!selectedLeave.carId ? 'hidden' : ''}>รถ: </p><p className={!selectedLeave.carId ? 'hidden' : 'font-bold'}>{selectedLeave.carId}</p>
                                                <p>รายละเอียด: </p><p className="col-span-3 font-bold">{selectedLeave.detail}</p>
                                                <p>ตั้งแต่: </p><p className="font-bold">{selectedLeave.startDate}</p><p>ถึง: </p><p className="font-bold">{selectedLeave.endDate}</p>
                                                <p>ลงบันทึกเมื่อ: </p><p className="col-span-3 font-bold">{selectedLeave.timeStamp}</p>
                                                <p>สถานะ: </p><p className="col-span-3 font-bold">{selectedLeave.status}</p>
                                                <p>ผู้ให้อนุญาต: </p><p className="font-bold">{selectedLeave.approver}</p><p>เวลา: </p><p className="font-bold">{selectedLeave.changedTimeStamp}</p>
                                                <p>เหตุผล: </p><p className="col-span-3 font-bold">{selectedLeave.reason}</p>
                                            </div>
                                        }
                                    </div>
                                )}
                                {bookings.map((booking) =>
                                    (format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') >= booking.startDate.slice(0, 10) && format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') <= booking.endDate.slice(0, 10)) &&
                                    <div key={booking.id}>
                                        <div onClick={() => { selectedBooking.id === booking.id ? setSelectedBooking("") : setSelectedBooking(booking); setSelectedLeave(""); }} className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${booking.status === "approved" ? 'bg-emerald-200' : booking.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'}`} key={booking.id}>
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
                                        {selectedBooking && selectedBooking.id === booking.id &&
                                            <div className="p-2 grid grid-cols-4 border rounded-md text-xs md:text-sm">
                                                <p>แจ้งโดย: </p><p className={!selectedBooking.carId ? 'col-span-3 font-bold' : 'font-bold'}>{selectedBooking.userId}</p><p className={!selectedBooking.carId ? 'hidden' : ''}>รถ: </p><p className={!selectedBooking.carId ? 'hidden' : 'font-bold'}>{selectedBooking.carId}</p>
                                                <p>รายละเอียด: </p><p className="col-span-3 font-bold">{selectedBooking.detail}</p>
                                                <p>ตั้งแต่: </p><p className="font-bold">{selectedBooking.startDate}</p><p>ถึง: </p><p className="font-bold">{selectedBooking.endDate}</p>
                                                <p>ลงบันทึกเมื่อ: </p><p className="col-span-3 font-bold">{selectedBooking.timeStamp}</p>
                                                <p>สถานะ: </p><p className="col-span-3 font-bold">{selectedBooking.status}</p>
                                                <p>ผู้ให้อนุญาต: </p><p className="font-bold">{selectedBooking.approver}</p><p>เวลา: </p><p className="font-bold">{selectedBooking.changedTimeStamp}</p>
                                                <p>เหตุผล: </p><p className="col-span-3 font-bold">{selectedBooking.reason}</p>
                                            </div>
                                        }
                                    </div>
                                )}
                            </div>
                        }

                        <div className={(detailPanel === "leave" || detailPanel === "booking") ? 'grid grid-cols-4 gap-4' : 'hidden'}>
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
                                {cars.map((car) => <option value={car.id} key={car.id}>{car.name + ' (' + car.licensePlate + ')'}</option>)}
                            </select>
                            <div className="col-span-4 mt-20 flex justify-around">
                                <button onClick={() => submit()} className="flex justify-center items-center py-2 w-fit bg-cyan-500 border border-cyan-900 rounded">
                                    <p className="text-white">บันทึกรายการ</p>
                                </button>
                                <button onClick={() => setDetailPanel("detail")} className="flex justify-center items-center py-2 w-fit bg-white border border-red-500 rounded">
                                    <p className="text-black">ยกเลิกรายการ</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}