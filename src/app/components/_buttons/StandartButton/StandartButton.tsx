

import React, { FC } from "react";
import clsx from "clsx";
import actions from "@/app/actions";
import styles from "./standartButton.module.scss"
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";


type Props = {
    classes?: string,
    link?: string | null,
    title: string | React.ReactNode,
    callback?: (args: unknown) => void | null | undefined,
    active: boolean,
    image?: string,
    blank?: boolean
}



const StandartButton: FC<Props> = ({ title, classes = "", link = null, callback = null, active = false, image = '', blank = false }) => {

    const buttonClick: (e: React.MouseEvent<HTMLDivElement>) => void | null = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (callback) {
            callback(e)
        } else {
            if (link) {
                actions.navigate(link)
            }
        }

    }

    return <>
        {!link ? (
            <div className={clsx(styles.container, active ? styles.active : '', classes)} onClick={buttonClick}>
                {image && (<Image src={image} alt={title as string} width={24} height={24} />)}
                <span dangerouslySetInnerHTML={{ __html: title as string}}/>
            </div>

        ) : (
            <Link className={clsx(styles.container, active ? styles.active : '', classes)} href={link as Url} target={blank ? "_blank" : "_self"}>
                {image && (<Image src={image} alt={title as string} width={24} height={24} />)}
                <span dangerouslySetInnerHTML={{ __html: title as string}}/>
            </Link>
        )}
    </>
}

export { StandartButton }