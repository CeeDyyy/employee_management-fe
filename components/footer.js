"use client"

import Link from 'next/link';
import React, { useContext } from 'react';
import { UserContext } from '@/app/layout';

export default function Footer() {
    const profile = useContext(UserContext)
    
    return (
        <div className="z-50 fixed bottom-0 right-0 w-full flex items-center px-2 bg-white" style={{ boxShadow: "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
            <p className="ml-auto mr-3 font-bold">{profile.displayName}</p>
            {profile.pictureUrl && <Link href="/profile">
                <img
                    className="rounded-full -mt-5 mb-1 border-2 border-white"
                    src={profile.pictureUrl}
                    alt={profile.displayName}
                    width={60}
                    height={60}
                    style={{ boxShadow: "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
                />
            </Link>}
        </div>
    )
}