"use client"

import BackBtn from '@/components/backbtn';
import { useState } from 'react';

export default function Shift() {
    const [display, setDisplay] = useState("tiles")

    return (
        <div className="pt-2">
            <BackBtn path="/" />
            <p className="text-center text-2xl font-bold">Shifts</p>

            <div className="mx-4 flex justify-end">
                {display === "tiles" ?
                    <button onClick={() => setDisplay("list")}>
                        <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" width="32px" height="32px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <style type="text/css" dangerouslySetInnerHTML={{ __html: " .st0{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:#06B6D4;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;} " }} /> <rect x={4} y={4} className="st0" width={10} height={10} /> <rect x={4} y={18} className="st0" width={10} height={10} /> <rect x={18} y={4} className="st0" width={10} height={10} /> <rect x={18} y={18} className="st0" width={10} height={10} /> </g></svg>
                    </button>
                    :
                    <button onClick={() => setDisplay("tiles")} className="p-1 flex justify-center items-center">
                        <svg fill="#06B6D4" width="24px" height="24px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M50,15.52H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H50a2,2,0,0,1,2,2V13.52A2,2,0,0,1,50,15.52Zm-46-4H48V4H4Z" /><path d="M50,33.76H2a2,2,0,0,1-2-2V20.24a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V31.76A2,2,0,0,1,50,33.76Zm-46-4H48V22.24H4Z" /><path d="M50,52H2a2,2,0,0,1-2-2V38.48a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V50A2,2,0,0,1,50,52ZM4,48H48V40.48H4Z" /></g></svg>
                    </button>
                }
            </div>

            <div className={`mt-5 mx-4 ${display === "tiles" ? 'grid grid-cols-7 place-items-center' : 'flex overflow-y-auto'} gap-2`}>
                <div className="w-full bg-cyan-100 border border-cyan-500 rounded text-center" hidden={display !== "tiles"} key="sun">SUN</div>
                <div className="w-full bg-cyan-100 border border-cyan-500 rounded text-center" hidden={display !== "tiles"} key="mon">MON</div>
                <div className="w-full bg-cyan-100 border border-cyan-500 rounded text-center" hidden={display !== "tiles"} key="tue">TUE</div>
                <div className="w-full bg-cyan-100 border border-cyan-500 rounded text-center" hidden={display !== "tiles"} key="wed">WED</div>
                <div className="w-full bg-cyan-100 border border-cyan-500 rounded text-center" hidden={display !== "tiles"} key="thu">THU</div>
                <div className="w-full bg-cyan-100 border border-cyan-500 rounded text-center" hidden={display !== "tiles"} key="fri">FRI</div>
                <div className="w-full bg-cyan-100 border border-cyan-500 rounded text-center" hidden={display !== "tiles"} key="sat">SAT</div>
                {[...Array(31)].map((e, i) =>
                    <div className="w-full h-20 border border-cyan-500 rounded text-center" key={i}>
                        {i + 1}
                    </div>
                )}
            </div>
        </div>
    )
}