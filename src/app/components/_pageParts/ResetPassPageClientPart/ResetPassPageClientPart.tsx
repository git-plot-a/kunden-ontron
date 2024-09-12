"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import UserFormSection from "../../_sections/UserFromSection/UserFromSection";
import { userResetPasswordFormSchems } from "@/app/schemes";
import utils from "@/app/utils";
import api from "@/app/api/crud";
import constants from "./constants";
import styles from "./resetPass.client.module.scss"


const ResetPassPageClientPart = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [startFields, setStartFields] = useState<FiledList>(constants.FIELDS)
    const [resultingText, setResultinText] = useState<React.ReactNode | undefined>(undefined)


    const resetPassword = async (props: { [key: string]: string | boolean | undefined }) => {
        const dataArray = JSON.stringify({
            "username": props.username,
        });
        try {
            console.log(api.custom.RESET_PASWORD)
            const result = await utils.api.fetchData(api.custom.RESET_PASWORD, "POST", dataArray, false);
            console.log(result?.data?.status)
            if (result?.data?.status != "200") {
                console.log(result?.message);
                const errorText: React.ReactNode = <div className={"error"}>{result?.message}</div>
                setResultinText(errorText)
                return
            }
            console.log(result?.message);
            const successText: React.ReactNode = <div className={"success"}>{result?.message}</div>
            setResultinText(successText)
        } catch (error) {
            console.error(error);
            const errorText: React.ReactNode = <div className={"error"}>{error as string}</div>
            setResultinText(errorText)
        }

    }

    useEffect(() => {
        if (utils.user.getToken()) {
            router.push('/')
        }
    }, [])

    useEffect(() => {
        const savedEmail = utils.user.getSavedEmail()
        const fieldsUpdate: FiledList = startFields
        fieldsUpdate[0]['value'] = savedEmail ? savedEmail : undefined
        setStartFields(fieldsUpdate)
        setLoading(false)
    }, [])

    return <>
        <div className={styles.temporaryClosed}><div className={styles.text} dangerouslySetInnerHTML={{ __html: constants.TEMPORARY_TEXT }}></div></div>
        <UserFormSection fields={constants.FIELDS} handler={resetPassword} buttonTitle={constants.BUTTON_TITLE} verificationSheme={userResetPasswordFormSchems} loading={loading} links={constants.LINKS} resultingText={resultingText} />
    </>
}

export default ResetPassPageClientPart