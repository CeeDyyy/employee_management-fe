"use client"

import Link from "next/link"

export default function Home() {

  return (
    <div className="my-auto mx-4 md:mx-96 grid md:grid-cols-2 gap-4 md:gap-16">
      <Link href="/" className="flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-200 rounded-lg shadow-md">-</Link>
      <Link href="/shifts" className="flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-200 rounded-lg shadow-md">ลา</Link>
      <Link href="/booking" className="flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-200 rounded-lg shadow-md">จองรถ</Link>
    </div>
  )
}
