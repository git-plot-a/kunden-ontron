"use client" 

import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import styles from "./tile.module.scss"

type Props = {
    title: string,
    icon?: string,
    classes?: string,
    callback?: ()=>void
}

const Tile: React.FC<Props> = ({ title, icon, classes = '', callback = () => {} }) => {
    return <div className={clsx(styles.container, classes)} onClick={callback}>
        <div className={styles.icon}>
            {icon ? (
                <Image src={icon} alt={title} width={78} height={78} />
            ) : (
                <div className={styles.noImage}></div>
            )}
        </div>
        <h4 className={clsx(styles.title)}>{title}</h4>
    </div>
}

export default Tile