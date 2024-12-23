"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import RequestFormSection from "../../_sections/RequestFormSection/RequestFormSection"
import utils from "@/app/utils"
import styles from "./feedbackPage.client.module.scss"

type ClientPartComponentProps = {
    [key: string]: string
}

const FeedbackPageClientPart: React.FC<ClientPartComponentProps> = () => {
    const router = useRouter()
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        // handleClick();
        if (!utils.user.getToken()) {
            utils.user.resetAllData()
            router.push('/login')
        } else {
            setShowContent(true)
        }
    }, [])


    return <>{showContent && (
        <div className={styles.mainCover}>
            <RequestFormSection/>
        </div>
    )}</>
}

export default FeedbackPageClientPart