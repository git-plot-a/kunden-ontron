import React from 'react';
import Image from 'next/image';
import styles from "./tile.module.scss"
type Props = {
    title: string,
    icon?: string
}

const Tile: React.FC<Props> = ({ title, icon }) => {
    return <div className={styles.container}>
        <div className={styles.icon}>
            {icon ? (
                <Image src={icon} alt={title} width={78} height={78} />
            ) : (
                <div className={styles.noImage}></div>
            )}
        </div>
        <h4 className={styles.title}>{title}</h4>
    </div>
}

export default Tile