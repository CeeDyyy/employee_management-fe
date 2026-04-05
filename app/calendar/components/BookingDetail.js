"use client"

import React, { useContext } from 'react';
import Swal from 'sweetalert2';

import { UserContext } from '@/app/layout';

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
        <div>
            <summary className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${booking.status === "approved" ? 'bg-emerald-200' : booking.status === "rejected" ? 'bg-rose-200' : 'bg-amber-200'}`}>
                <p className="text-xs md:text-sm">
                    <span>{!booking.carId ? "👋 ลา" : "🚗 จอง"}โดย: </span>
                    <span className="font-bold">{booking.user.fullname}</span>
                    <span className={!booking.carId ? 'hidden' : 'ml-2'}> รถ: </span>
                    <span className={!booking.carId ? 'hidden' : 'font-bold'}>{booking.car_id}</span>
                    <span className="ml-2"> สถานะ: </span>
                    <span className="font-bold">{booking.status || "รอ"}</span>
                </p>
            </summary>
            <div className="p-2 grid grid-cols-4 border rounded-md text-xs md:text-sm">
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
            </div>
        </div>
    )
}

export { BookingDetail };