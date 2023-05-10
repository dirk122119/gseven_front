"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Appbar from './components/Appbar'
const inter = Inter({ subsets: ['latin'] })
import { useState, createContext, useContext } from "react";
import * as React from 'react';
import { getCookie } from "./lib/cookie"


// function getCookie(name: string) {
//   let value = "; " + document.cookie;
//   let parts = value.split("; " + name + "=");
//   if (parts.length === 2) {
//       return parts.pop().split(";").shift();
//   }
// }

export type GlobalUserContext = {
  id: string
  setId:(c: string) => void
}

export type GlobalCookieContext = {
  cookie: string
  setCookie:(c: string) => void
}

export const UserContext = createContext<GlobalUserContext>({id:"",setId:()=>{}});
export const CookieContext = createContext<GlobalCookieContext>({cookie:"",setCookie:()=>{}});

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  const [id, setId] = React.useState("");
  const [cookie, setCookie] = React.useState("");

  const handleJWT = (token: string) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    setCookie(token)
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    let result = fetch("https://35.76.111.9/users/info", requestOptions)
      .then(response => response.json())
      .then(result => setId(result["user_id"]))
      .catch(error => console.log('error', error));

    return result
  }

  // if (typeof window !== 'undefined') {
  //     let cookieValue = getCookie("access_token");
  //     if (cookieValue) {
  //         handleJWT(cookieValue)
  //         // window.location.href = '/items'
  //     }
  // }

  React.useEffect(() => {
    let cookieValue = getCookie("access_token");
    if (cookieValue) {
      handleJWT(cookieValue)

    }
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContext.Provider value={{id, setId}}>
          <CookieContext.Provider value={{cookie, setCookie}}>
          <Appbar />
          {children}
          </CookieContext.Provider>
        </UserContext.Provider>
      </body>
    </html>
  )
}
