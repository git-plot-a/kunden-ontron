import React from "react"
import TicketItem from "../../TicketItem/TicketItem"
import constants from "./constants"
import styles from "./taskList.module.scss"
import DropDownList from "../../DropDownList/DropDownList"



type Props = {
    tickets: Array<Ticket>,
    loading?: boolean,
    sortingFunction: (val: string) => void
}

const TaskList: React.FC<Props> = ({ tickets, loading = true, sortingFunction = () => { } }) => {

    const items: Array<DropDownList> = [
        {
            title: 'Datum der Einreichung (neu zuerst)',
            value: 'date'
        },
        {
            title: 'Priorität (anfangs hoch)',
            value: 'proiroty'
        },
        {
            title: 'Autor (eigene zuerst) ',
            value: 'author'
        }
    ]

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

    return <div>
        <h2 className={styles.tasksTitle}>{constants.TITLE}</h2>
        {tickets.length > 0 && (
            <div className={styles.toolsSection}>
                <div className={styles.quantity}>{`${tickets.length} ${constants.QUANTITY_TITLE}`}</div>
                <DropDownList items={items} handler={dropDownHandler} def={0} classes={styles.sortList} />
            </div>
        )}

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