"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import utils from "@/app/utils"

type ClientPartComponentProps = {
    [key: string]: string
}

const HomePageClientPart: React.FC<ClientPartComponentProps> = () => {
    const router = useRouter()
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        if (!utils.user.getToken()) {
            router.push('/login')
        } else {
            setShowContent(true)
        }
    }, [])

    //temporary function
    const logOut = () =>{
        console.log('logged out')
        utils.user.resetAllData(); 
        router.push('/login')
    }

    return <>{showContent && (<>
    <h1>Welcome to the page with authorized access</h1>
    <button onClick={logOut}>Log out</button>
    </>)}</>
}

export default HomePageClientPart