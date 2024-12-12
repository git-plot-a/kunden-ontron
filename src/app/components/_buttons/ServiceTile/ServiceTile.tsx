"use client"

import React from "react"
import clsx from "clsx"
import Image from "next/image"
import styles from "./servicetile.module.scss"

interface ExtendedService extends Service {
    id: string | number
}

type Props = {
    service: ExtendedService,
    subtitle?: string | undefined,
    classes?: string | undefined
}

const ServiceTile: React.FC<Props> = ({ service, subtitle = undefined, classes = ''}) => {
    
    const callback = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.add(styles.noTransitionDelay);
        target.classList.add(styles.active);
        setTimeout(() => {
            target.classList.remove(styles.active);
        }, 200);
        setTimeout(() => {
            target.classList.remove(styles.noTransitionDelay);
        }, 400);
    }

    return <div className="animation-fade-in-left">
        <div className={clsx(styles.productItem, classes)} onClick={callback}>
            <div className={styles.Image}><Image src={service.icon as string} alt={service.title} width={40} height={40} /></div>
            <div className={styles.text}>
                <div className={styles.title}>{service.title}</div>
                {subtitle && (<div className={styles.subtitle}>
                    {subtitle}
                </div>)}
            </div>
        </div>
    </div>
}

export default ServiceTile