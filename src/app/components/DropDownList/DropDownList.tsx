"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from "./dropdown.module.scss"
import clsx from 'clsx';

type Props = {
    items: Array<DropDownList>,
    handler: () => void
}

const DropDownList: React.FC<Props> = ({ items, handler }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [openedList, setListOpened] = useState(false)
    const [currentChoice, setcurrentChoice] = useState(0)

    const itemClick = (key: number) => {
        changeOpening()
        setcurrentChoice(key)
        handler()
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

    return <div className={styles.dropDownContainer} ref={ref}>
        <div onClick={changeOpening} className={styles.dropDownSelectedItem}>
            <span>{items[currentChoice].title}</span>
            <Image src={'/img/drop_down_arrow.svg'} alt={'arrow'} width={24} height={24} className={clsx(styles.dropDownArrow, openedList && styles.opened)} /></div>
        <div className={clsx(!openedList && styles.closed, styles.dropDownList)}>
            {items.map((item, key) => (
                <div key={key} onClick={() => { itemClick(key) }} className={styles.dropDownItem}>
                    <div>{item.title}</div>
                </div>
            ))}
        </div>

    </div>
}

export default DropDownList