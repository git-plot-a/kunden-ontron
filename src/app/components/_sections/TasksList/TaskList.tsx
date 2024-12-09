import React, { useEffect } from "react"
import TicketItem from "../../TicketItem/TicketItem"
import constants from "./constants"
import styles from "./taskList.module.scss"
import DropDownList from "../../DropDownList/DropDownList"



type Props = {
    tickets: Array<Ticket>,
    loading?: boolean,
    sortingFunction: (val: string) => void
    filterFunc: (val: string, param: string) => void,
    sort?: string | null,
    period?: string | null
}

const TaskList: React.FC<Props> = ({ tickets, loading = true, sortingFunction = () => { }, filterFunc = () => { }, sort = null, period = null }) => {

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
        {
            title: 'Offene',
            value: 'opened'
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

    const getindex =  (list: Array<DropDownListItems>, val: string) => {
        return list.reduce((index, item, key) => item.value == val ? key : index, -1)
    }


    return <div>
        <h2 className={styles.tasksTitle}>{constants.TITLE}</h2>
        <div className={styles.toolsSection}>
            <div className={styles.quantity}>{`${tickets.length} ${constants.QUANTITY_TITLE}`}</div>
            <div className={styles.drowDownListsArea}>
                <DropDownList items={filterItems} handler={selectFilter} classes={styles.sortList} def={sort && getindex(filterItems, sort) > -1 ? getindex(filterItems, sort) : 0 }/>
                <DropDownList items={periodItems} handler={selectPeriod} classes={styles.sortList} def={period && getindex(periodItems, period) > -1 ? getindex(periodItems, period) : 0 }/>
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