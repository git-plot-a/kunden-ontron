import React from "react"
import TicketItem from "../../TicketItem/TicketItem"
import constants from "./constants"
import styles from "./taskList.module.scss"
import DropDownList from "../../DropDownList/DropDownList"



type Props = {
    tickets: Array<Ticket>,
    loading?: boolean
}

const TaskList: React.FC<Props> = ({ tickets, loading = true }) => {

    const items: Array<DropDownList> = [
        {
            title: 'Nach dem Datum der Antragseinreichung',
            value: '1'
        },
        {
            title: 'Nach Priorität',
            value: '2'
        },
        {
            title: 'Eigene Anfragen zuerst ',
            value: '1'
        }
    ]

    return <div>
        <h2 className={styles.tasksTitle}>{constants.TITLE}</h2>
        {tickets.length > 0 && (
            <div className={styles.toolsSection}>
                <div className={styles.quantity}>{`${tickets.length} ${constants.QUANTITY_TITLE}`}</div>
                <DropDownList items={items} handler={()=>{}} def={0} classes={styles.sortList}/>
            </div>
        )}

        <div className={styles.tasksContainer}>
            {
                tickets.length > 0 ? tickets.map((ticket, key) => (
                    <TicketItem key={key} ticket={ticket} classes="animation-fade-in-top" style={{ transitionDelay: `${key * 0.2}s` }} />
                ))

                    : (loading ? <div>{"Laden..."}</div> : <div>{constants.NO_TICKETS_TASK}</div>)
            }
        </div>
    </div>
}
export default TaskList