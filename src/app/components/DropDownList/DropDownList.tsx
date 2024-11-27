"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from "./dropdown.module.scss"
import clsx from 'clsx';

type Props = {
    items: Array<DropDownList>,
    handler: (newVal: string) => void,
    def?: number,
    classes?: string,
    style?: object
}

const DropDownList: React.FC<Props> = ({ items, handler, def = undefined, classes = "", style = undefined}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [openedList, setListOpened] = useState(false)
    const [currentChoice, setcurrentChoice] = useState(def ? def: 0)

    const itemClick = (key: number) => {
        changeOpening()
        setcurrentChoice(key)
        console.log(items[key].value)
        handler(items[key].value)
    }

    const changeOpening = () => {
        setListOpened(!openedList);
    }

    useEffect(() => {
        const outsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node))
                setListOpened(false)
        }

        document.addEventListener('mousedown', outsideClick)

        return () => {
            document.removeEventListener('mousedown', outsideClick)
        }
    }, [])

    return <div className={clsx(styles.dropDownContainer, classes)} ref={ref} style={style}>
        <div className={clsx(styles.dropDownElements, !openedList && styles.closed)}>
            <div onClick={changeOpening} className={styles.dropDownSelectedItem}>
                <span>{items[currentChoice]?.title}</span>
                <Image src={'/img/drop_down_arrow.svg'} alt={'arrow'} width={24} height={24} className={clsx(styles.dropDownArrow, openedList && styles.opened)} /></div>
            <div className={styles.dropDownList}>
                {items.length>0 && items.map((item, key) => (
                    <div key={key} onClick={() => { itemClick(key) }} className={styles.dropDownItem}>
                        <div>{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default DropDownList