import React from 'react';
import clsx from 'clsx';
import styles from "./container.module.scss"

type Props = {
    fullScreen?: boolean,
    children: React.ReactNode,
    classes?: string
}

const Container: React.FC<Props> = ({ fullScreen = false, children, classes }) => {
    return <div className={clsx(fullScreen ? styles.fullScreen : '', styles.container, classes)}>
        {children}
    </div>
} 
export default Container