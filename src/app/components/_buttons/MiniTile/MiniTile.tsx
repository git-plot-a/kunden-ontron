"use client"

import React, { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import constants from './constants'
import styles from "./miniTile.module.scss"

type Props = {
    service: Service,
    currentStyle?: object

}

const MiniTile: React.FC<Props> = ({ service, currentStyle = {} }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped); // Переключаем состояние при клике
    };

    return <div className={clsx(styles.container, "animation-fade-in-bottom")} onClick={handleFlip} style={currentStyle}>
        <div className={clsx(styles.flippInner, isFlipped ? styles.flipped : '')}>
            <div className={styles.frontSide}>

                <div className={styles.statusContainer}>
                    {service.status && service.status?.title && (
                        <div className={styles.statusItem}>
                            <div>{service.status?.title}</div>
                            <div className={clsx(styles[constants.DENGER_LVL[typeof service.status?.denger_level !== "undefined" ? service.status?.denger_level : 2]], styles.indicator)}></div>
                        </div>
                    )}
                </div>
                <div className={styles.serviceContainer}>
                    <div className={styles.serviceIcon}>
                        {service.icon && (<Image src={service.icon} alt={service.title} width={48} height={48} />)}
                    </div>

                    <div className={styles.serviceText}>
                        <h5>{service.title}</h5>
                        {service.contractEndData && typeof service.contractEndData == 'string' && (
                            <div className={styles.updated}>{service.contractEndData}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.backSide}>
                <div className={styles.serviceText}>
                    <h5>{constants.SERVICE_LEVEL_TEXT}</h5>
                    {service.serviceLevels.length > 0 && service.serviceLevels.map((service, key) => (
                        <div className={styles.lvlContainer} key={key}>
                            <div className={styles.lvlTitle}>{`${service.type}: `}</div>
                            <div className={clsx(styles.lvlValue, styles[service.value])}>{service.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
}

export default MiniTile