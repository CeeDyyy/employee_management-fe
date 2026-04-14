"use client"

import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

import { UserContext } from '@/app/layout';
import { convertDateToThai } from '@/utils/convertDateToThai';

import { BookingDetail } from './BookingDetail';

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

const DetailPanel = ({
    detailPanel, setDetailPanel, leaves, bookings,
    startDate, setStartDate, endDate, setEndDate
}) => {
    const { user, token } = useContext(UserContext);

    const [detail, setDetail] = useState("")
    const [selectedCar, setSelectedCar] = useState("")

    const [cars, setCars] = useState([])
    function getCars() {
        fetch(process.env.NEXT_PUBLIC_SERVICE_URL + "cars/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            }
        })
            .then((response) => response.json())
            .then((res) => {
                setCars(res.data)
            })
            .catch((error) => {
                console.error("getCars() Error:", error);
            });
    }
    useEffect(() => {
        if (detailPanel === "booking") getCars()
    }, [detailPanel])

    function submit() {
        if (detailPanel === "leave") submitLeave()
        if (detailPanel === "booking") submitBooking()
    }

    function submitLeave() {
        const body = {
            user_id: user.user_id,
            detail: detail,
            start_date: startDate,
            end_date: endDate
        }
        fetch(process.env.NEXT_PUBLIC_SERVICE_URL + "leaves/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status) {
                    setDetailPanel("")
                    setStartDate("")
                    setEndDate("")
                    setDetail("")
                    Toast.fire({
                        icon: 'success',
                        title: 'บันทึกการลาเรียบร้อย'
                    })
                    reFetch()
                } else console.error(res)
            })
            .catch((error) => {
                console.error("submitLeave() Error:", error);
            });
    }

    function submitBooking() {
        const body = {
            user_id: user.user_id,
            detail: detail,
            start_date: startDate,
            end_date: endDate,
            car_id: selectedCar
        }
        fetch(process.env.NEXT_PUBLIC_SERVICE_URL + "carbookings/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status) {
                    setDetailPanel("")
                    setStartDate("")
                    setEndDate("")
                    setDetail("")
                    setSelectedCar("")
                    Toast.fire({
                        icon: 'success',
                        title: 'บันทึกการจองเรียบร้อย'
                    })
                    reFetch()
                } else console.error(res)
            })
            .catch((error) => {
                console.error("submitBooking() Error:", error);
            });
    }

    return (
        <div className={`absolute    top-0       w-screen
                                 md:relative md:top-auto md:w-full md:h-full
                                 left-0 bg-blue-50 ${detailPanel ? 'block' : 'hidden'}`}
        >
            <svg onClick={() => setDetailPanel("")} className="fixed right-0 w-10 ml-auto mt-2 mr-2 rounded-full cursor-pointer ease-out hover:scale-110 hover:bg-red-100 duration-100 md:hidden bg-neutral-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">{" "}<path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{" "}</g></svg>
            <div className="mt-10 p-4">

                {(detailPanel.slice(0, 6) === "detail" && detailPanel.length === 16) ? <p className="mb-4 text-center text-3xl font-bold">{convertDateToThai(format(new Date(detailPanel.slice(6, 16)), 'EEEE d MMMM yyyy'))}</p> : ""}

                <div className={detailPanel.slice(0, 6) === "detail" ? 'grid grid-cols-2 gap-4' : 'hidden'}>
                    <button onClick={() => setDetailPanel("leave")} className="group/leave flex justify-center items-center h-20 w-full cursor-pointer bg-cyan-500 hover:saturate-150 active:scale-95 duration-150 border border-cyan-900 rounded-lg shadow-md">
                        <p className="group-hover/leave:scale-110 duration-150 text-white">
                            ลา
                        </p>
                    </button>
                    <button onClick={() => setDetailPanel("booking")} className="group/booking flex justify-center items-center h-20 w-full cursor-pointer bg-cyan-500 hover:saturate-150 active:scale-95 duration-150 border border-cyan-900 rounded-lg shadow-md">
                        <p className="group-hover/booking:scale-110 duration-150 text-white">
                            จองรถ
                        </p>
                    </button>
                </div>
                {(detailPanel.slice(0, 6) === "detail" && detailPanel.length === 16) &&
                    <div className="mt-2 grid gap-y-2">
                        {leaves.map((leave) =>
                            (format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') >= leave.start_date.slice(0, 10) && format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') <= leave.end_date.slice(0, 10)) && <BookingDetail booking={leave} key={leave.id} />
                        )}
                        {bookings.map((booking) =>
                            (format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') >= booking.start_date.slice(0, 10) && format(new Date(detailPanel.slice(6, 16)), 'yyyy-MM-dd') <= booking.end_date.slice(0, 10)) && <BookingDetail booking={booking} key={booking.id} />
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
                        <button onClick={() => submit()} className="group/save flex justify-center items-center py-2 px-4 w-fit bg-cyan-500 hover:saturate-150 active:scale-95 duration-150 border border-cyan-900 rounded">
                            <p className="group-hover/save:scale-110 duration-150 text-white">บันทึกรายการ</p>
                        </button>
                        <button onClick={() => setDetailPanel("detail")} className="group/cancel flex justify-center items-center py-2 px-4 w-fit bg-white hover:bg-gray-100 active:scale-95 duration-150 border border-red-500 rounded">
                            <p className="group-hover/cancel:scale-110 duration-150 text-black">ยกเลิกรายการ</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { DetailPanel };