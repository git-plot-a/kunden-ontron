import React from "react"
import clsx from "clsx"
import styles from "./servicetarif.module.scss"

type Props = {
    serviceLevels: Array<ServiceAgreement> | undefined,
    size?: "small" | "medium" 
}

const ServiceTarif: React.FC<Props> = ({ serviceLevels, size = "small" }) => {

    return <>
        {serviceLevels && serviceLevels.length && serviceLevels?.map((service, key) => (
            <div className={clsx(styles.lvlContainer, styles[size])} key={key}>
                <div className={styles.lvlTitle}>{`${service.type}: `}</div>
                <div className={clsx(styles.lvlValue, styles[service.value])}>{service.value}</div>
                {service.contractEndData && (
                    <div className={styles.data}>{`bis ${service.contractEndData}`}</div>
                )}
            </div>
        ))}
    </>
}

export default ServiceTarif