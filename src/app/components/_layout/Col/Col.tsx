import React, { FC } from "react";
import clsx from "clsx";
import styles from "./col.module.scss"

type Props = {
    children?: React.ReactNode,
    span: number,
    classes?: string,
    sm?: number,
    xs?: number,
    style?: object

}

const Col: FC<Props> = ({children, span = 1, classes = "", sm = 0, xs = 0, style = undefined}) => {
    return <div className={clsx(styles.column, styles[`column-span-${span}`], sm ? styles[`column-span-sm-${sm}`] : '', xs ? styles[`column-span-xs-${xs}`] : '', classes )} style={style}>
        {children}
    </div>
}

export default Col 