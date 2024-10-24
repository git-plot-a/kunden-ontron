import React from "react"
import clsx from "clsx"
import styles from "./servicetarif.module.scss"

type Props = {
    serviceLevels: Array<ServiceAgreement> | undefined
}

const ServiceTarif: React.FC<Props> = ({ serviceLevels }) => {
    return <>
        {serviceLevels && serviceLevels.length && serviceLevels?.map((service, key) => (
            <div className={styles.lvlContainer} key={key}>
                <div className={styles.lvlTitle}>{`${service.type}: `}</div>
                <div className={clsx(styles.lvlValue, styles[service.value])}>{service.value}</div>
            </div>
        ))}
    </>
}

export default ServiceTarif