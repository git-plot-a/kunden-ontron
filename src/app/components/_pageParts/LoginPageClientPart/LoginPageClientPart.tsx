"use client"

import { useRouter } from 'next/navigation';
import UserFrom from "../../_forms/UserForm/UserFrom";
import constants from "./constants";
import utils from "@/app/utils";
import api from "../../../api/crud";

const LoginPageClientPart = () => {
    const router = useRouter(); 

    const loginHandler = async (props: { [key: string]: string | boolean | undefined }) => {
        const dataArray = JSON.stringify({
            "username": props.username,
            "password": props.password
        });

        try {
            const result = await utils.api.fetchData(api.custom.LOGIN, "POST", dataArray, false);
            console.log(result)
            if(result?.token){
                console.log()
                utils.user.setToken(result.token);
                 router.push('/');
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return <UserFrom handler={loginHandler} fields={constants.FIELDS} buttonTitle={constants.BUTTON_TITLE} />;
};

export default LoginPageClientPart;