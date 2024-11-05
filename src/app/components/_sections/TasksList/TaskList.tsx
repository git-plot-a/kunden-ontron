import React, { useState, useEffect, useRef } from "react"
import clsx from "clsx"
import Image from "next/image"
import constants from "./constants"
import styles from "./taskList.module.scss"

type Ticket = {
    key: string,
    fields: {
        summary: string,
        status: {
            name: string
        },
        resolutiondate: string | null,
        created: string | null,
        priority: {
            iconUrl: string | null,
            name: string
        },
        timetracking: Array<object>
    }
}

type Props = {
    tickets: Array<Ticket>
}

const TaskList: React.FC<Props> = ({ tickets }) => {
    const [isOpened, setIsOpened] = useState(false)
    const estimationLink = useRef<HTMLDivElement | null>(null)
    const [popUpVisible, setPopupVisible] = useState(false)

    const getStatusStyle = (status: string) => {
        let style = styles.toDo;
        switch (status.toLowerCase()) {
            case 'to do':
                style = styles.toDo;
                break;
            case 'done':
                style = styles.done;
                break;
            case 'in progress':
                style = styles.inProgress;
                break;
            case 'blocked':
                style = styles.blocked;
                break;
            default:
                style = styles.toDo;
                break;
        }
        return style
    }

    const showInfo = () => {
        setIsOpened(!isOpened);
    }

    const showPopup = () => {
        setPopupVisible(!popUpVisible)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (estimationLink.current && !estimationLink.current.contains(event.target as Node) && popUpVisible) {
                setPopupVisible(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])

    function formatDate(dateString: string): string {
        const date = new Date(dateString);

        const options: Intl.DateTimeFormatOptions = {
            month: "short",    // Месяц в коротком формате (e.g., "Nov")
            day: "numeric",    // День (e.g., "5")
            hour: "numeric",   // Часы
            minute: "2-digit", // Минуты с ведущим нулем
            hour12: true       // 12-часовой формат (AM/PM)
        };

        return date.toLocaleString("en-US", options);
    }

    return <div>
        <h2 className={styles.tasksTitle}>{constants.TITLE}</h2>
        <div className={styles.tasksContainer}>
            {
                tickets.length > 0 ? tickets.map((task, key) => (<div className={styles.tasksItem} key={key}>
                    <div className={styles.ticketTop} onClick={showInfo}>
                        <div className={styles.title}>
                            <div className={styles.key}>{task.key}</div>
                            <div className={styles.text}>{task.fields?.summary}</div>
                        </div>
                        <div className={clsx(styles.status, getStatusStyle(task.fields?.status?.name))}>{task.fields?.status?.name}</div>
                    </div>
                    <div className={clsx(styles.ticketContentSection, isOpened ? styles.opened : '')}>
                        <div className={styles.contentTopContainer}>
                            <div className={styles.line}>
                                <div className={styles.lineTitle}>{"Expected resolution time"}</div>
                                <div className={clsx(styles.lineData, styles.bold)}>
                                    <div className={styles.value}>{"Oct 31, 11:30 AM"}</div>
                                    <div className={styles.estimation} ref={estimationLink} onClick={showPopup}>
                                        <span>{"Time to first response within 8h"}</span>
                                        {popUpVisible && (
                                            <div className={clsx(styles.popup, popUpVisible ? styles.opened : '')}>
                                                <div className={styles.image}>
                                                    <Image src={'/img/support_lvl_bronze.svg'} alt="support level" height={81} width={81} />
                                                </div>
                                                <div className={styles.text}>
                                                    Your current support level is     Bronze. To get solutions faster, consider upgrading to a higher support level Learn more
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* {task.fields?.resolutiondate && (
                                <div className={styles.line}>
                                    <div className={styles.lineTitle}>{"Expected resolution time"}</div>
                                    <div className={clsx(styles.lineData, styles.bold)}>{formatDate(task.fields?.resolutiondate)}</div>
                                </div>
                            )} */}
                            {task.fields?.created && (
                                <div className={styles.line}>
                                    <div className={styles.lineTitle}>{"Request submitted"}</div>
                                    <div className={styles.lineData}>{formatDate(task.fields?.created)}</div>
                                </div>
                            )}
                            {task.fields?.priority.name && (
                                <div className={styles.line}>
                                    <div className={styles.lineTitle}>{"Priority"}</div>
                                    <div className={clsx(styles.lineData, styles.bold)}>
                                        {task.fields?.priority?.iconUrl && (<Image src={task.fields?.priority?.iconUrl} alt={"status"} height={32} width={12} />)}
                                        <span>{task.fields?.priority?.name}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.contentBottomContainer}>
                            <div className={styles.title}>
                                {"Tracking Details:"}
                            </div>
                            <div className={styles.eventList}>
                                <div className={styles.event}>
                                    <div className={styles.time}>{"Oct 30, 4:00 PM "}</div>
                                    <div className={styles.dexcription}>{"Ticket update description"}</div>
                                </div>
                                <div className={styles.event}>
                                    <div className={styles.time}>{"Oct 30, 4:00 PM "}</div>
                                    <div className={styles.dexcription}>{"Ticket update description"}</div>
                                </div>
                                <div className={styles.event}>
                                    <div className={styles.time}>{"Oct 30, 4:00 PM "}</div>
                                    <div className={styles.dexcription}>{"Ticket update description"}</div>
                                </div>
                                <div className={styles.event}>
                                    <div className={styles.time}>{"Oct 30, 4:00 PM "}</div>
                                    <div className={styles.dexcription}>{"Ticket update description"}</div>
                                </div>
                            </div>
                        </div>
                        {/* {Array.isArray(task.fields?.timetracking) && task.fields?.timetracking.length > 0 &&  */}

                        {/* } */}
                    </div>
                </div>))

                    : <div>{constants.NO_TICKETS_TASK}</div>
            }
        </div>
    </div>
}
export default TaskList