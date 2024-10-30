import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import styles from "./fileDownload.module.scss"
import constants from './constants';
// import { Button } from '../../_buttons/Button/Button';
import { StandartButton } from '../../_buttons/StandartButton/StandartButton';

type File = {
    title: string,
    link: string,
    date: string,
}

type Props = {
    item: Service,
    files: Array<File>
}

const FilesDownload: React.FC<Props> = ({ item, files }) => {

    return <div className={styles.container}>
        <div className={clsx(styles.serviceInfo, 'animation-fade-in-top')}>
            <Image src={item.icon as string} alt={item.title} height={44} width={44} />
            <div className={styles.serviceTitle}>{item.title}</div>
        </div>
        <div className={styles.fileContainer}>
            {files.length > 0 && files.map((file, key) => {
                return (<div className={clsx(styles.fileItem, 'animation-fade-in')} style={{ transitionDelay: `${key * 0.2}s` }} key={key}>
                    <div className={styles.text}>{file.title}</div>
                    <div className={styles.data}>{file.date}</div>
                    <div className={styles.loadButton}>
                        <StandartButton title={constants.DOWNLOAD_TEXT} active={false} image='/img/download.svg' classes={styles.button} link={file.link} />
                    </div>
                </div>)
            })}
        </div>
    </div>
}

export default FilesDownload