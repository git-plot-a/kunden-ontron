"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/_sections/Header/Header"
import Footer from "../components/_sections/Footer/Footer"
import UserEditForm from "../components/_forms/UserEditForm/UserEditForm"
import useSendQuery from "../hooks/sendQuery/sendQuery"
import api from "@/app/api/crud"
import utils from "../utils"

const ProfilePage = async () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(utils.user.getToken())
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
            <UserEditForm />
            <Footer />
        </>)}
    </>
}

export default ProfilePage