"use client"

import Link from "next/link"

export default function Home() {

  return (
    <div className="h-screen mx-4 md:mx-96 grid md:grid-cols-2 gap-4 md:gap-16 content-center place-content-stretch md:place-content-center">
      <Link href="/document" className="flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-500 rounded-lg shadow-md">
        <p className="text-white">เอกสาร</p>
      </Link>
      <Link href="/calendar" className="flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-500 rounded-lg shadow-md">
        <p className="text-white">ปฏิทิน</p>
      </Link>
      <Link href="/calendar?detailpanel=leave&display=horizontal&ifdata=true&onlyme=true" className="flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-500 rounded-lg shadow-md">
        <p className="text-white">ลา</p>
      </Link>
      <Link href="/calendar?detailpanel=booking&display=horizontal&ifdata=true&onlyme=true" className="flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-500 rounded-lg shadow-md">
        <p className="text-white">จองรถ</p>
      </Link>
    </div>
  )
}
