"use client"

import React, { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import constants from './constants'
import styles from "./miniTile.module.scss"
import ServiceTarif from '../../ServiceTarif/ServiceTarif'

type Props = {
    service: Service,
    currentStyle?: object

}

const MiniTile: React.FC<Props> = ({ service, currentStyle = {} }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const onMouseOver = () => {
        setIsFlipped(true); // Переключаем состояние при клике
    };
    const onMouseLeave = () => {
        setIsFlipped(false);
    }

    return <div className={clsx(styles.container, "animation-fade-in-bottom")} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} style={currentStyle}>
        <div className={clsx(styles.flippInner, isFlipped ? styles.flipped : '')}>
            <div className={styles.frontSide}>

                <div className={styles.statusContainer}>
                    {/* {service.status && service.status?.title && ( */}
                        <div className={styles.statusItem}>
                            <div>{constants.DENGER_LVL[0]}</div>
                            <div className={clsx(styles[constants.DENGER_LVL[0].toLowerCase()], styles.indicator)}></div>
                        </div>
                    {/* )} */}
                </div>
                <div className={styles.serviceContainer}>
                    <div className={styles.serviceIcon}>
                        {service.icon && (<Image src={service.icon} alt={service.title} width={70} height={70} />)}
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
                    <ServiceTarif serviceLevels={service.serviceLevels}/>
                </div>
            </div>
        </div>
    </div>
}

export default MiniTile