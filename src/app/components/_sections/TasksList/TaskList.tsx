import React, { useState, useEffect } from "react"
import TicketItem from "../../TicketItem/TicketItem"
import constants from "./constants"
import styles from "./taskList.module.scss"



type Props = {
    tickets: Array<Ticket>,
    loading? : boolean
}

const TaskList: React.FC<Props> = ({ tickets, loading = true }) => {

    return <div>
        <h2 className={styles.tasksTitle}>{constants.TITLE}</h2>
        <div className={styles.tasksContainer}>
            {
                tickets.length > 0 ? tickets.map((ticket, key) => (
                    <TicketItem key={key} ticket={ticket}/> 
                ))

                    : (loading ? <div>{"Laden..."}</div> : <div>{constants.NO_TICKETS_TASK}</div>)
            }
        </div>
    </div>
}
export default TaskList