"use client"

import Link from "next/link"

export default function Home() {
  const pages = [
    {
      title: "เอกสาร",
      href: "/document"
    },
    {
      title: "ปฏิทิน",
      href: "/calendar"
    },
    {
      title: "ลา",
      href: "/calendar?detailpanel=leave&display=horizontal&ifdata=true&onlyme=true"
    },
    {
      title: "จองรถ",
      href: "/calendar?detailpanel=booking&display=horizontal&ifdata=true&onlyme=true"
    }
  ]

  return (
    <div className="h-screen mx-4 md:mx-48 2xl:mx-72 grid md:grid-cols-2 gap-4 md:gap-16 content-center place-content-stretch md:place-content-center">
      {pages.map((page, index) =>
        <Link href={page.href} className="group flex justify-center items-center h-20 md:h-48 cursor-pointer bg-cyan-500 hover:saturate-150 active:scale-105 duration-150 rounded-lg shadow-md" key={index}>
          <p className="group-hover:scale-110 duration-200 text-white">{page.title}</p>
        </Link>
      )}
    </div>
  )
}
