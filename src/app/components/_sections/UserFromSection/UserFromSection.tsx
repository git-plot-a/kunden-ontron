"use client"

import React from "react"
import clsx from "clsx";
import Image from "next/image";
import Container from "../../_layout/Container/Container";
import SceletonLoading from "../../SceletonLoading/SceletonLoading";
import UserFrom from "../../_forms/UserForm/UserFrom";
import constants from "./constants"
import styles from "./userForm.module.scss"

type Props = {
    fields: FiledList,
    handler: (props: { [key: string]: string | boolean | undefined }) => void,
    buttonTitle: string,
    verificationSheme: object
    changeFieldsList?: (fields: FiledList) => void,
    loading: boolean,
    links: Array<string>
    resultingText?: React.ReactNode | undefined
}

const UserFormSection: React.FC<Props> = ({ fields, handler, buttonTitle, verificationSheme, changeFieldsList, loading = true, links, resultingText }) => {
    return <Container fullScreen={true} classes={styles.background}>
        <div className={clsx(styles.userFormContainer, loading ? styles.smallHeight : '')}>
            <div className={styles.logo}>
                <Image alt={'ontron'} src={'/img/Logo_ontron.svg'} width={132} height={21} />
            </div>
            <div className={styles.descriptionText}>
                {constants.DESCRIPTION}
            </div>
            {
                !loading ?
                    <div>
                        <UserFrom handler={handler} fields={fields} buttonTitle={buttonTitle} verificationSheme={verificationSheme} changeFieldsList={changeFieldsList} />
                    </div> :
                    <SceletonLoading />
            }
            <div className={styles.linksArea}>
                {links.length > 0 && links.map((link, key) => (
                    <div className={styles.linkItem} key={key} dangerouslySetInnerHTML={{ __html: link }} />
                ))}
            </div>
            {resultingText &&
                <div className={styles.resultingText}>{resultingText}</div>
            }
        </div>
    </Container>;
}

export default UserFormSection