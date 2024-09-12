"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import utils from "@/app/utils";
import api from "../../../api/crud";
import constants from "./constants";
import { userLoginFormSchems } from "../../../schemes"
import UserFormSection from "../../_sections/UserFromSection/UserFromSection";


const LoginPageClientPart = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [startFields, setStartFields] = useState<FiledList>(constants.FIELDS)
    const [resultingText, setResultinText] = useState<React.ReactNode | undefined>(undefined)

    const loginHandler = async (props: { [key: string]: string | boolean | undefined }) => {
        const dataArray = JSON.stringify({
            "username": props.username,
            "password": props.password
        });

        try {
            const result = await utils.api.fetchData(api.custom.LOGIN, "POST", dataArray, false);
            console.log(result)
            if (result?.data?.status && result?.data?.status != "200") {
                let errorText: React.ReactNode = <></>
                console.log(result?.data?.status)
                switch (result?.data?.status) {
                    case 403: {
                        errorText = <div className={"error"}>{constants.INCORRECT_LOGON_OR_PASSWORD}</div>
                        break
                    }
                    default: {
                        errorText = <div className={"error"}>{constants.SOMETHING_WENT_WRONG_TEXT}</div>
                    }

                }
                setResultinText(errorText)
                return
            }
            if (result?.token) {
                console.log(result)
                utils.user.setUserData(result)
                if (props.rememberme) {
                    utils.user.setEnterData(props.username as string, props.password as string)
                }
                //router.push('/');
            }

        } catch (error) {
            const errorText: React.ReactNode = <div className={"error"}>{error as string}</div>
            setResultinText(errorText)
            return
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        if (utils.user.getToken()) {
            router.push('/')
        }
    }, [])

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


    return <UserFormSection fields={startFields} handler={loginHandler} buttonTitle={constants.BUTTON_TITLE} verificationSheme={userLoginFormSchems} changeFieldsList={setStartFields} loading={loading} links={constants.LINKS} resultingText={resultingText} />
    // return <Container fullScreen={true} classes={styles.background}>
    //     <div className={clsx(styles.userFormContainer, loading ? styles.smallHeight : '')}>
    //         <div className={styles.logo}>
    //             <Image alt={'ontron'} src={'/img/Logo_ontron.svg'} width={132} height={21} />
    //         </div>
    //         <div className={styles.descriptionText}>
    //             {constants.DESCRIPTION}
    //         </div>
    //         {
    //             !loading ?
    //                 <div>
    //                     <UserFrom handler={loginHandler} fields={startFields} buttonTitle={constants.BUTTON_TITLE} verificationSheme={userLoginFormSchems} changeFieldsList={setStartFields} />
    //                 </div> :
    //                 <SceletonLoading />
    //         }
    //         <div className={styles.linksArea}>
    //             {constants?.LINKS.map((link, key) => (
    //                 <div className={styles.linkItem} key={key} dangerouslySetInnerHTML={{ __html: link }} />
    //             ))}
    //         </div>
    //     </div>
    // </Container>;
};

export default LoginPageClientPart;