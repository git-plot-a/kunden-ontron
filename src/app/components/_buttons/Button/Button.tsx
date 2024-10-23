import React, { FC } from "react";
import clsx from "clsx";
import styles from "./button.module.scss"

type Props = {
    classes?: string,
    title: string,
    callback: (e: React.MouseEvent<HTMLDivElement>) => void,
}



const Button: FC<Props> = ({ title, classes = "", callback }) => {

    const buttonClick: (e: React.MouseEvent<HTMLDivElement>) => void | null = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.add(styles.noTransitionDelay);
        target.classList.add(styles.active);
        setTimeout(() => {
            target.classList.remove(styles.active);
        }, 200);
        setTimeout(() => {
            target.classList.remove(styles.noTransitionDelay);
        }, 400);
        callback(e)
    }

    return <>

        <div className={clsx(styles.container, classes)} onClick={buttonClick}>
            <span>{title}</span>
        </div>


    </>
}

export { Button }