"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import Header from "../components/_sections/Header/Header"
import Footer from "../components/_sections/Footer/Footer"
// import UserEditForm from "../components/_forms/UserEditForm/UserEditForm"
// import LottieAnimation from "../components/LottieAnimation/LottieAnimation"
import sentAnimation from "../components/_sections/RequestFormSection/animations/Robo_email_v002.json"
import questionAnimation from "../components/_sections/RequestFormSection/animations/Robo_question_v002.json"
import technicalAnimation from "../components/_sections/RequestFormSection/animations/Robo_technical_v002.json"
import errorAnimation from "../components/_sections/RequestFormSection/animations/Robo_error_v002.json"
// import useSendQuery from "../hooks/sendQuery/sendQuery"
// import api from "@/app/api/crud"
import utils from "../utils"

 const LottieAnimation = dynamic(() => import('../components/LottieAnimation/LottieAnimation'), {
        ssr: false
    });

const ProfilePage = async () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // console.log(utils.user.getToken())
        if (!utils.user.getToken()) {
            utils.user.resetAllData()
            router.push('/login')
        } else {
            setLoading(false)
        }
    }, [])


    return <>{!loading && (
        <>
            <Header currentPage={"profile"} />
            {/* <UserEditForm /> */}
            <LottieAnimation animation={sentAnimation} />
            <LottieAnimation animation={questionAnimation} />
            <LottieAnimation animation={technicalAnimation} />
            <LottieAnimation animation={errorAnimation} />
            <Footer />
        </>)}
    </>
}

export default ProfilePage