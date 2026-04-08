"use client"

import React, { useState, useEffect } from 'react';
import { format, compareAsc } from 'date-fns';

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

const TheCalendar = ({
    display,
    detailPanel, setDetailPanel, leaves, bookings,
    setStartDate, setEndDate
}) => {

    const date = new Date()

    const [selectedMonth, setSelectedMonth] = useState(date.getMonth())
    const [selectedYear, setSelectedYear] = useState(date.getFullYear())
    const [firstDay, setFirstDay] = useState(new Date(selectedYear, selectedMonth, 1).getDay())
    const [lastDate, setLastDate] = useState(new Date(selectedYear, selectedMonth + 1, 0).getDate())

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    useEffect(() => {
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

    return (
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
                                setStartDate(yyyyMMdd + 'T09:00');
                                setEndDate(yyyyMMdd + 'T18:00')
                            }}
                            className={`w-full border text-center cursor-pointer hover:brightness-95 duration-150
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
                                    (yyyyMMdd >= leave.start_date.slice(0, 10) && yyyyMMdd <= leave.end_date.slice(0, 10)) &&
                                    <div className={`my-1 rounded ${display === "vertical" && 'py-1'} ${display === "horizontal" && 'mx-2 grow'} ${leave.status === "approved" ? 'bg-emerald-200' : leave.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'}`} key={leave.id}>
                                        <p className="text-xs truncate">👋 {leave.user.fullname}</p>
                                    </div>
                                )}
                                {bookings.map((booking) =>
                                    (yyyyMMdd >= booking.start_date.slice(0, 10) && yyyyMMdd <= booking.end_date.slice(0, 10)) &&
                                    <div className={`my-1 rounded ${display === "vertical" && 'py-1'} ${display === "horizontal" && 'mx-2 grow'} ${booking.status === "approved" ? 'bg-emerald-200' : booking.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'}`} key={booking.id}>
                                        <p className="text-xs truncate">🚗 {booking.user.fullname}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export { TheCalendar };