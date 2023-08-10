"use client"
import { useState, useEffect } from 'react';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

export default function Home() {
  const [profile, setProfile] = useState({})

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
    <div>
      <div>
        {profile.pictureUrl && <img
          src={profile.pictureUrl}
          alt={profile.displayName}
          width={500}
          height={500}
        />}
        <div>Name: {profile.displayName}</div>
      </div>
    </div>
  )
}
