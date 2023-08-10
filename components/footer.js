"use client"

import { useState, useEffect } from 'react';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

export default function Footer() {
    const [profile, setProfile] = useState({
        "userId": "uuid",
        "displayName": "name",
        "statusMessage": "status message",
        "pictureUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    })

    useEffect(async () => {
        const liff = (await import('@line/liff')).default
        try {
            await liff.init({ liffId });
        } catch (error) {
            console.error('liff init error', error.message)
        }
        if (liff.isLoggedIn()) {
            const profile = await liff.getProfile()
            console.log(profile)
            setProfile(profile)
        } else {
            liff.login();
        }
    }, [])

    return (
        <div className="z-50 flex items-center px-2 bg-white" style={{ boxShadow: "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
            <p className="ml-auto mr-3 font-bold">{profile.displayName}</p>
            {profile.pictureUrl && <img
                className="rounded-full -mt-5 mb-1 border-2 border-white"
                src={profile.pictureUrl}
                alt={profile.displayName}
                width={60}
                height={60}
                style={{ boxShadow: "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
            />}
        </div>
    )
}