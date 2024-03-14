"use client"

import React, { useContext } from 'react';
import { UserContext } from '@/app/layout';
import { PageLayout } from '@/components/layouts';

export default function Booking() {
    const profile = useContext(UserContext)

    return (
        <PageLayout title="Profile">
            <div className="grid justify-items-center gap-4">
                <img
                    className="rounded-full border-2 border-white shadow-md"
                    src={profile.pictureUrl}
                    alt={profile.displayName}
                    width={200}
                    height={200}
                />
                <p className="text-xl font-bold">{profile.displayName}</p>
            </div>
        </PageLayout>
    )
}