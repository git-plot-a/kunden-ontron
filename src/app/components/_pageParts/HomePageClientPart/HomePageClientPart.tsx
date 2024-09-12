"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import utils from "@/app/utils"
import styles from "./homePage.client.module.scss"

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


    return <>{showContent && (
        <div className={styles.mainCover}
        >
            <h1>Welcome to the page with authorized access</h1>
        </div>
    )}</>
}

export default HomePageClientPart