"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import UserFrom from "../../_forms/UserForm/UserFrom";
import utils from "@/app/utils";
import api from "../../../api/crud";
import constants from "./constants";
import { userLoginFormSchems } from "../../../schemes"

const LoginPageClientPart = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [startFields, setStartFields] = useState<FiledList>(constants.FIELDS)

    const loginHandler = async (props: { [key: string]: string | boolean | undefined }) => {
        const dataArray = JSON.stringify({
            "username": props.username,
            "password": props.password
        });

        try {
            const result = await utils.api.fetchData(api.custom.LOGIN, "POST", dataArray, false);
            console.log(result)
            if (result?.token) {
                console.log(result)
                utils.user.setUserData(result)
                if (props.rememberme) {
                    utils.user.setEnterData(props.username as string, props.password as string)
                }
                router.push('/');
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        const savedEmail = utils.user.getSavedEmail()
        const savedPassword = utils.user.getSavedPassword()

        const fieldsUpdate: FiledList = startFields
        fieldsUpdate[0]['value'] = savedEmail ? savedEmail : undefined
        fieldsUpdate[1]['value'] = savedPassword ? savedPassword : undefined
        fieldsUpdate[2]['value'] = savedEmail && savedPassword ? true : false
        setStartFields(fieldsUpdate)
        setLoading(false)
    }, [])


    return <>
        {
            !loading && <UserFrom handler={loginHandler} fields={startFields} buttonTitle={constants.BUTTON_TITLE} verificationSheme={userLoginFormSchems} />
        }
    </>;
};

export default LoginPageClientPart;