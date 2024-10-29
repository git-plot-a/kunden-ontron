"use client"
import React from 'react';
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
        <div className={styles.serviceInfo}>
            <Image src={item.icon as string} alt={item.title} height={44} width={44} />
            <div className={styles.serviceTitle}>{item.title}</div>
        </div>
        <div className={styles.fileContainer}>
            {files.length > 0 && files.map((file, key) => {
                return (<div className={styles.fileItem} key={key}>
                    <div className={styles.text}>{file.title}</div>
                    <div className={styles.data}>{file.date}</div>
                    <div className={styles.loadButton}>
                        <StandartButton title={constants.DOWNLOAD_TEXT} active={false} image='/img/download.svg' classes={styles.button} link={file.link} />
                        {/* <Button callback={callback} title={constants.DOWNLOAD_TEXT} image='/img/download.svg' classes={styles.button} /> */}
                    </div>
                </div>)
            })}
        </div>
    </div>
}

export default FilesDownload