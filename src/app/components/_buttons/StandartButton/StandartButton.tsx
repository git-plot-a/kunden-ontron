import React, { FC } from "react";
import clsx from "clsx";
import actions from "@/app/actions";
import styles from "./standartButton.module.scss"
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";


type Props = {
    classes?: string,
    link?: string | null,
    title: string,
    callback?: (args: unknown) => void | null | undefined
}



const StandartButton: FC<Props> = ({ title, classes = "", link = null, callback = null }) => {

    const buttonClick: (e: React.MouseEvent<HTMLDivElement>) => void | null = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (callback) {
            callback(e)
        } else {
            if (link) {
                // scrollToTop()
                actions.navigate(link)
            }
        }

    }

    return <>
        {!link ? (
            <div className={clsx(styles.container, classes)} onClick={buttonClick}>
                {(<span>{title}</span>)}
            </div>

        ) : (
            <Link className={clsx(styles.container, classes)} href={link as Url}>
                <span>{title}</span>
            </Link>
        )}
    </>
}

export { StandartButton }