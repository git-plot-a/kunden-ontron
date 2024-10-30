import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import styles from "./fileDownload.module.scss"
import constants from './constants';
// import { Button } from '../../_buttons/Button/Button';
import { StandartButton } from '../../_buttons/StandartButton/StandartButton';


type Props = {
    fileList: FileListCustom
}

const FilesDownload: React.FC<Props> = ({fileList}) => {

    return <div className={styles.container}>
        <div className={clsx(styles.serviceInfo, 'animation-fade-in-top')}>
            <Image src={fileList.item.icon as string} alt={fileList.item.title} height={44} width={44} />
            <div className={styles.serviceTitle}>{fileList.item.title}</div>
        </div>
        <div className={styles.fileContainer}>
            {fileList.files.length > 0 && fileList.files.map((file, key) => {
                return (<div className={clsx(styles.fileItem, 'animation-fade-in')} style={{ transitionDelay: `${key * 0.2}s` }} key={key}>
                    <div className={styles.text}>{file.title}</div>
                    <div className={styles.data}>{file.data}</div>
                    <div className={styles.loadButton}>
                        <StandartButton title={constants.DOWNLOAD_TEXT} active={false} image='/img/download.svg' classes={styles.button} link={file.link} />
                    </div>
                </div>)
            })}
        </div>
    </div>
}

export default FilesDownload