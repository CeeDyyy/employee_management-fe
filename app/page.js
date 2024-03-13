"use client"

import Link from "next/link"

export default function Home() {

  return (
    <div className="h-screen mx-4 md:mx-48 2xl:mx-72 grid md:grid-cols-2 gap-4 md:gap-16 content-center place-content-stretch md:place-content-center">
      <Link href="/document" className="group/document flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-500 hover:saturate-150 active:scale-105 duration-150 rounded-lg shadow-md">
        <p className="group-hover/document:scale-110 duration-200 text-white">เอกสาร</p>
      </Link>
      <Link href="/calendar" className="group/calendar flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-500 hover:saturate-150 active:scale-105 duration-150 rounded-lg shadow-md">
        <p className="group-hover/calendar:scale-110 duration-200 text-white">ปฏิทิน</p>
      </Link>
      <Link href="/calendar?detailpanel=leave&display=horizontal&ifdata=true&onlyme=true" className="group/leave flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-500 hover:saturate-150 active:scale-105 duration-150 rounded-lg shadow-md">
        <p className="group-hover/leave:scale-110 duration-200 text-white">ลา</p>
      </Link>
      <Link href="/calendar?detailpanel=booking&display=horizontal&ifdata=true&onlyme=true" className="group/booking flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-500 hover:saturate-150 active:scale-105 duration-150 rounded-lg shadow-md">
        <p className="group-hover/booking:scale-110 duration-200 text-white">จองรถ</p>
      </Link>
    </div>
  )
}
