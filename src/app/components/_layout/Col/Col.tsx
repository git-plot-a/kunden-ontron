import React, { FC } from "react";
import clsx from "clsx";
import styles from "./col.module.scss"

type Props = {
    children?: React.ReactNode,
    span: number,
    classes?: string,
    sm?: number,
    xs?: number 

}

const Col: FC<Props> = ({children, span = 1, classes = "", sm = 0, xs = 0}) => {
    return <div className={clsx(styles.column, styles[`column-span-${span}`], sm ? styles[`column-span-sm-${sm}`] : '', xs ? styles[`column-span-xs-${xs}`] : '', classes )}>
        {children}
    </div>
}

export default Col 