"use client"

import React, { useContext } from 'react';
import { UserContext } from '@/app/layout';
import { PageLayout } from '@/components/layouts';

export default function Booking() {
    const { user } = useContext(UserContext);

    return (
        <PageLayout title="Profile">
            <div className="grid justify-items-center gap-4">
                <img
                    className="rounded-full border-2 border-white shadow-md"
                    src={user.picture_url}
                    alt={user.display_name}
                    width={200}
                    height={200}
                />
                <p className="text-xl font-bold">{user.display_name}</p>
            </div>
        </PageLayout>
    )
}