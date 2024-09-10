"use client"

import React, { useEffect, useState } from "react"
import utils from "@/app/utils"
import actions from "../../../actions"

type ClientPartComponentProps = {
    [key: string]: string
}

const HomePageClientPart: React.FC<ClientPartComponentProps> = () => {
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        console.log(window)
        if (!utils.user.getToken()) {
            actions.navigate('/login')
        } else {
            setShowContent(true)
        }
    }, [])

    return <>{showContent && (<h1>Welcome to the page with authorized access</h1>)}</>
}

export default HomePageClientPart