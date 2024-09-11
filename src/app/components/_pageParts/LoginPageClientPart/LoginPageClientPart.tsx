"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import UserFrom from "../../_forms/UserForm/UserFrom";
import utils from "@/app/utils";
import api from "../../../api/crud";
import constants from "./constants";

const LoginPageClientPart = () => {
    const router = useRouter();
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
                console.log()
                utils.user.setToken(result.token);
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

        setStartFields(fieldsUpdate)

    }, [])


    return <UserFrom handler={loginHandler} fields={startFields} buttonTitle={constants.BUTTON_TITLE} />;
};

export default LoginPageClientPart;