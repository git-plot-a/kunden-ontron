import React, { FC } from "react";
import clsx from "clsx";
import styles from "./row.module.scss"

type Props = {
    children?: React.ReactNode;
    classes?: string
}

const Row: FC<Props> = ({children, classes = ""}) => {
    return <div className={clsx(styles.row, classes)}>
        {children}
    </div>
}

export default Row 