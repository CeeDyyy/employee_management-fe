"use client"

import React, { useContext } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

import { UserContext } from '@/app/layout';
import { convertDateToThai } from '@/utils/convertDateToThai';

const statusTH = {
    pending: "รอการพิจารณา",
    approved: "อนุมัติแล้ว",
    rejected: "คำขอถูกปฏิเสธ"
}

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

const BookingDetail = ({ booking }) => {
    const { user, token } = useContext(UserContext);

    function deleteRecord(type, id) {
        Swal.fire({
            title: `Do you want to delete this ${type}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(process.env.NEXT_PUBLIC_SERVICE_URL + type.toLowerCase() + "/" + id + "/", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token " + token
                    }
                })
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.status) {
                            Toast.fire({
                                icon: 'success',
                                title: 'ลบสำเร็จ'
                            })
                            reFetch()
                        } else console.error(res)
                    })
                    .catch((error) => {
                        console.error(`deleteRecord(${type}, ${id}) Error:`, error);
                    });
            }
        });
    }

    return (
        <details className="group rounded-md overflow-hidden shadow-lg">
            <summary className={`p-2 flex justify-between items-center rounded-t-lg border-2 border-white cursor-pointer ${booking.status === "approved" ? 'bg-gradient-to-r from-emerald-100 from-0% via-emerald-200 via-15% to-emerald-50 to-100%' : booking.status === "rejected" ? 'bg-gradient-to-r from-red-100 from-0% via-red-200 via-15% to-red-50 to-100%' : 'bg-gradient-to-r from-amber-100 from-0% via-amber-200 via-15% to-amber-50 to-100%'}`}>
                {/* <p className="text-xs md:text-sm">
                    <span>{!booking.carId ? "👋 ลา" : "🚗 จอง"}โดย: </span>
                    <span className="font-bold">{booking.user.fullname}</span>
                    <span className={!booking.carId ? 'hidden' : 'ml-2'}> รถ: </span>
                    <span className={!booking.carId ? 'hidden' : 'font-bold'}>{booking.car_id}</span>
                    <span className="ml-2"> สถานะ: </span>
                    <span className="font-bold">{booking.status || "รอ"}</span>
                </p> */}
                <div className="px-2 w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <p>{!booking.carId ? "👋" : "🚗"}</p>
                        <div>
                            <p className="font-bold -mb-1">{booking.user.fullname}</p>
                            <p className="-mt-1">{booking.start_date.slice(-5)} - {booking.end_date.slice(-5)} น.</p>
                        </div>
                    </div>
                    <p>{statusTH[booking.status]}</p>
                </div>
                <svg
                    class="w-5 h-5 transition-transform duration-150 group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
            </summary>
            {/* <div className="p-2 grid grid-cols-4 border text-xs md:text-sm">
                <div className="col-span-full flex justify-end gap-x-2">
                    <button className="hover:scale-110 hover:bg-slate-200 active:scale-90 active:bg-slate-300 duration-100 rounded">✏️</button>
                    <button onClick={() => deleteRecord(!booking.carId ? 'leave' : 'carbooking', booking.id)} className="hover:scale-110 hover:bg-red-200 active:scale-90 active:bg-red-300 duration-200 rounded">🗑️</button>
                </div>
                <p>แจ้งโดย: </p><p className={!booking.carId ? 'col-span-3 font-bold' : 'font-bold'}>{booking.user.fullname}</p><p className={!booking.carId ? 'hidden' : ''}>รถ: </p><p className={!booking.car_id ? 'hidden' : 'font-bold'}>{booking.car_id}</p>
                <p>รายละเอียด: </p><p className="col-span-3 font-bold">{booking.detail}</p>
                <p>ตั้งแต่: </p><p className="font-bold">{booking.start_date}</p><p>ถึง: </p><p className="font-bold">{booking.end_date}</p>
                <p>ลงบันทึกเมื่อ: </p><p className="col-span-3 font-bold">{booking.record_timestamp}</p>
                <p>สถานะ: </p><p className="col-span-3 font-bold">{booking.status}</p>
                <p>ผู้ให้อนุญาต: </p><p className="font-bold">{booking.approver}</p><p>เวลา: </p><p className="font-bold">{booking.update_timestamp}</p>
                <p>เหตุผล: </p><p className="col-span-3 font-bold">{booking.reason}</p>
            </div> */}
            <div className="p-4 grid grid-cols-12 gap-y-2 items-center bg-sky-50 rounded-b-lg border-2 border-white">
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#06b6d4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g></svg>
                <p className="col-span-5 font-bold">ประเภท</p>
                <p className="col-span-6">{booking.type}</p>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#06b6d4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g></svg>
                <p className="col-span-5 font-bold">ระยะเวลา</p>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M3 5.5L5 3.5M21 5.5L19 3.5M12 8.5V12.5L14 14.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z" stroke="#06b6d4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g></svg>
                <p className="col-span-5">{booking.start_date.slice(-5)} - {booking.end_date.slice(-5)} น.</p>
                <p className="col-start-2 col-span-5 font-bold">เหตุผล</p>
                <p className="col-span-6">{booking.detail}</p>
                <p className="col-start-2 col-span-5 font-bold">แจ้งโดย</p>
                <p className="col-span-6">{booking.user.fullname}</p>
                <p className="col-start-2 col-span-5 font-bold">ส่งคำขอเมื่อ</p>
                <p className="col-span-6">{convertDateToThai(format(new Date(booking.timestamp), 'yyyy MMM dd HH:mm'))} น.</p>
                <p className="col-start-2 col-span-5 font-bold">ผู้ให้อนุญาต</p>
                <p className="col-span-6">{booking.approver || "-"}</p>
                <p className="col-start-2 col-span-5 font-bold">ผลการพิจารณา</p>
                <p className="col-span-6">{statusTH[booking.status]}</p>
                <p className="col-start-2 col-span-5 font-bold">ลงบันทึกเมื่อ</p>
                <p className="col-span-6">{convertDateToThai(format(new Date(booking.updated), 'yyyy MMM dd HH:mm'))} น.</p>
                <button className="col-span-6 flex justify-center items-center gap-1 m-1 p-2 text-blue-500 bg-[radial-gradient(50%_70%_at_center,_var(--tw-gradient-stops))] from-blue-100 to-white border-2 border-white rounded-xl shadow-md">
                    <svg className="-mb-0.5" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#3b82f6" /> </g></svg>
                    แก้ไขคำขอ
                </button>
                <button onClick={() => deleteRecord(!booking.carId ? 'leave' : 'carbooking', booking.id)} className="col-span-6 flex justify-center items-center gap-1 m-1 p-2 text-red-600 bg-[radial-gradient(50%_70%_at_center,_var(--tw-gradient-stops))] from-gray-200 to-white border border-white rounded-xl shadow-md">
                    <svg className="-mb-0.5" width="24px" height="24px" viewBox="-0.5 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>icon/18/icon-delete</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="out" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <path d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z" id="path" fill="#dc2626"> </path> </g> </g></svg>
                    ลบคำขอ
                </button>
            </div>
        </details>
    )
}

export { BookingDetail };