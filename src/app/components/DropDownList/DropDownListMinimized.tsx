"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from "./dropdown.module.scss"
import clsx from 'clsx';

type Props = {
    items: Array<DropDownList>,
    handler: (newVal: string) => void,
    def?: number,
    classes?: string

}

const DropDownListMinimized: React.FC<Props> = ({ items, handler, def = undefined, classes = "" }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [openedList, setListOpened] = useState(false)
    const [currentChoice, setcurrentChoice] = useState(def ? def : 0)

    const itemClick = (key: number) => {
        changeOpening()
        setcurrentChoice(key)
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

    useEffect(() => {
        setcurrentChoice(0)
    }, [items])

    return <div className={clsx(styles.dropDownMiniContainer, styles.dropDownContainer, classes)} ref={ref}>
        <div className={clsx(styles.dropDownMiniElements, styles.dropDownElements, openedList && styles.opened)}>
            <div onClick={changeOpening} className={clsx(styles.dropDownSelectedItem, styles.dropDownMiniSelectedItem)}>
                <span>{items[currentChoice]?.title}</span>
                <div className={styles.dropDownMiniArrow}>
                    <Image src={'/img/drop_down_arrow.svg'} alt={'arrow'} width={24} height={24} className={clsx(styles.dropDownArrow, openedList && styles.opened)} />
                </div>
                <div className={styles.sizingElement}>
                    {items.length > 0 && items.map((item, key) => (
                        <div key={key} className={styles.item}>
                            <div>{item.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className={clsx(styles.dropDownList, styles.dropDownMiniList, openedList && styles.opened)}>
            {items.length > 0 && items.map((item, key) => (
                <div key={key} onClick={() => {
                    if (!item?.blocked) {
                        itemClick(key)
                    }
                }} className={clsx(styles.dropDownItem, item.blocked ? styles.blocked : '')}>
                    <div>{item.title}</div>
                </div>
            ))}
        </div>

    </div >
}

export default DropDownListMinimized