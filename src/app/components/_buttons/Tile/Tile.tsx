"use client"

import React, { useState } from 'react';
import { useRef } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import styles from "./tile.module.scss"

type Props = {
    title: string,
    icon?: string,
    classes?: string,
    callback?: () => void
}

const Tile: React.FC<Props> = ({ title, icon, classes = '', callback = () => { } }) => {
    // const [hovered, setHovered] = useState(false)
    const tile = useRef<HTMLDivElement | null>(null)

    const click = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.add(styles.noTransitionDelay);
        target.classList.add(styles.active);
        setTimeout(() => {
            target.classList.remove(styles.active);
        }, 200);
        setTimeout(() => {
            target.classList.remove(styles.noTransitionDelay);
        }, 400);
        callback();
    }

    const mouseOver = () => {
        tile.current?.classList.remove(styles.paused)
    }

    const mouseLeave = () => {
        tile.current?.classList.add(styles.paused)
    }

    return <div ref={tile} className={clsx(styles.container, classes, styles.paused)} onClick={click} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
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