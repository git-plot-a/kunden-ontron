import React from "react"
import TicketItem from "../../TicketItem/TicketItem"
import constants from "./constants"
import styles from "./taskList.module.scss"
import DropDownList from "../../DropDownList/DropDownList"
import utils from "@/app/utils";
import { Ticks } from "chart.js";



type Props = {
    tickets: Array<Ticket>,
    loading?: boolean,
    sortingFunction: (val: string) => void
    filterFunc: (val: string, param: string) => void
}

const TaskList: React.FC<Props> = ({ tickets, loading = true, sortingFunction = () => { }, filterFunc = () => { } }) => {

    const items: Array<DropDownListItems> = [
        {
            title: 'Datum der Einreichung (neu zuerst)',
            value: 'all'
        },
        {
            title: 'Priorität (anfangs hoch)',
            value: 'proiroty'
        },
        {
            title: 'Autor (eigene zuerst) ',
            value: 'author'
        },
    ]

    const filterItems: Array<DropDownListItems> = [
        {
            title: 'Alle',
            value: 'all'
        },
        {
            title: 'Gelöst',
            value: 'resolved'
        },
        {
            title: 'In Arbeit',
            value: 'in_process'
        },
        {
            title: 'Anhängig',
            value: 'waiting'
        },
    ]

    const periodItems: Array<DropDownListItems> = [...[{ value: 'all', title: 'Ganze Zeit' }], ...constants.PERIOD_TYPES.map(item => { return { value: item.slug, title: item.title } })]

    const dropDownHandler = (val: string) => {
        if (window) {
            const ticketsList = document.querySelectorAll(".ticket");
            ticketsList.forEach(item => {
                item.classList.remove('animation-visible')
                item.classList.add(styles.noAnimation)
            })
        }
        sortingFunction(val)
        if (window) {
            setTimeout(() => {
                const ticketsList = document.querySelectorAll(".ticket");
                ticketsList.forEach(item => {
                    item.classList.add('animation-visible')
                    item.classList.remove(styles.noAnimation)
                })
            }, 100)
        }
    }

    const selectPeriod = (val: string) => {
        const listExisting = periodItems.filter((period) => period.value == val)
        if (listExisting) {
            return filterFunc(val, 'period')
        } else {
            return tickets
        }
    }

    const selectFilter = (val: string) => {
        const listExisting = filterItems.filter((filter) => filter.value == val)
        if (listExisting) {
            return filterFunc(val, 'sort')
        } else {
            return tickets
        }
    }

    return <div>
        <h2 className={styles.tasksTitle}>{constants.TITLE}</h2>
        <div className={styles.toolsSection}>
            <div className={styles.quantity}>{`${tickets.length} ${constants.QUANTITY_TITLE}`}</div>
            <div className={styles.drowDownListsArea}>
                <DropDownList items={filterItems} handler={selectFilter} classes={styles.sortList} />
                <DropDownList items={periodItems} handler={selectPeriod} classes={styles.sortList} />
                <DropDownList items={items} handler={dropDownHandler} def={0} classes={styles.sortList} />
            </div>
        </div>
        <div className={styles.tasksContainer}>
            {
                tickets.length > 0 ? tickets.map((ticket, key) => (
                    <TicketItem key={key} ticket={ticket} classes="animation-fade-in-top ticket" style={{ transitionDelay: `${key * 0.2}s` }} />
                ))
                    : (loading ? <div>{"Laden..."}</div> : <div>{constants.NO_TICKETS_TASK}</div>)
            }
        </div>
    </div>
}
export default TaskList