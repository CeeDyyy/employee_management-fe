"use client"

import './globals.css'
import React, { useState, useEffect, createContext } from 'react';
import { jwtDecode } from "jwt-decode";
import Footer from '@/components/footer';

export const UserContext = createContext()

const liffId = process.env.NEXT_PUBLIC_LIFF_ID

export default function RootLayout({ children }) {
  const [user, setUser] = useState({
    "userId": "uuid",
    "displayName": "name",
    "statusMessage": "status message",
    "pictureUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    "role": null
  })
  const moc = {
    "userId": "Udc30b20e1e87c8bc7d475398bb5607ff",
    "displayName": "CeeDy",
    "statusMessage": "ถ้าตอบช้าทักเฟสนาจา",
    "pictureUrl": "https://profile.line-scdn.net/0hYVxPEv3-BnlVKRM6MOp4BiV5BRN2WF9rKUccGGYhXEk6H0Itek5LTzMsW0w6ThYpKkgeFmN5D0lZOnEfS3_6TVIZW0hpGEMpfE9MnQ",
    "role": null
  }

  function checkUser(profile) {
    fetch(process.env.NEXT_PUBLIC_SERVICE_URL + "usercheck", {
      method: "POST",
      body: JSON.stringify(profile)
    })
      .then((response) => response.json())
      .then((res) => {
        setUser(jwtDecode(res.data, "secret"))
      })
      .catch((error) => {
        console.error("checkUser() Error:", error);
      });
  }

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
      // setUser(profile)
      checkUser(profile)
    } else {
      liff.login();
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <title>Employee Management</title>
        <meta name='description' content='Description' />
      </head>
      <body>
        <UserContext.Provider value={user}>
          <div className="flex flex-col justify-between bg-neutral-50">
            {children}
            <Footer />
          </div>
        </UserContext.Provider>
      </body>
    </html>
  )
}
