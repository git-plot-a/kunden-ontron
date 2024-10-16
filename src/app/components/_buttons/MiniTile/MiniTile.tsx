import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import constants from './constants'
import styles from "./miniTile.module.scss"

type Props = {
    service: Service

}

const MiniTile: React.FC<Props> = ({ service }) => {
    return <div className={styles.container}>
        <div className={styles.statusContainer}>
            <div className={styles.statusItem}>
                <div>{service.status?.title}</div>
                <div className={clsx(styles[constants.DENGER_LVL[typeof service.status?.denger_level !== "undefined" ? service.status?.denger_level : 2]], styles.indicator)}></div>
            </div>
        </div>
        <div className={styles.serviceContainer}>
            <div className={styles.serviceIcon}>
                {service.icon && (<Image src={service.icon} alt={service.title} width={48} height={48} />)}
            </div>
            <div className={styles.serviceText}>
                <h5>{service.title}</h5>
                <div className={styles.updated}>{service.updateData}</div>
            </div>
        </div>
        {/* <MiniTile service={service}/> */}
    </div>
}

export default MiniTile