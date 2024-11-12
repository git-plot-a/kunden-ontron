import React, { useState, useEffect } from "react"
import { useRef } from "react"
import clsx from "clsx"
import Image from "next/image"
import constants from "./constants"
import styles from "./ticketItem.module.scss"
import utils from "@/app/utils"

type Props = {
    ticket: Ticket,
    classes?: string,
    style?: object
}

const TicketItem: React.FC<Props> = ({ ticket, classes = "", style = {} }) => {
    const [isOpened, setIsOpened] = useState(false)
    const [popUpVisible, setPopupVisible] = useState(false)
    const estimationLink = useRef<HTMLDivElement | null>(null)
    const animatedElement = useRef<HTMLDivElement | null>(null)

    function formatDate(dateString: string): string {
        const date = new Date(dateString);

        const options: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        };

        return date.toLocaleString("en-US", options);
    }

    function removeSpaces(str: string): string {
        return str.replace(/\s+/g, '');
    }

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
        // setPopupVisible(!popUpVisible)
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

    useEffect(() => {
        if(animatedElement.current){
            animatedElement.current.classList.add("animation-visible")
        }
    }, [isOpened])


    const AuthorProcess = (author: string)=>{
        const curreUser = utils.user.getUserData();
        return curreUser.user_email && curreUser.user_email == author ? "Sie" : author
    }

    const updatePriorityName = (priorityName: string) => {
        const name = constants.PRIORITIES[priorityName.toLowerCase()] 
        return name ? name : priorityName
    }

    return <div className={clsx(styles.tasksItem, isOpened ? styles.opened : '', classes)} style={style} ref={animatedElement}>
        <div className={clsx(styles.ticketTop, isOpened ? styles.opened : '')} onClick={showInfo}>
            <div className={styles.title}>
                <div className={styles.arrow}><Image src={'/img/arrow_right.svg'} alt="arrow" height={36} width={36} /></div>
                <div className={styles.key}>{ticket.key}</div>
                <div className={styles.text}>{ticket.fields?.summary}</div>
            </div>
            <div className={clsx(styles.status, getStatusStyle(ticket.fields?.status?.name))}>{constants.STYLES[removeSpaces(ticket.fields?.status?.name.toLowerCase())] ? constants.STYLES[removeSpaces(ticket.fields?.status?.name?.toLowerCase())] : constants.STYLES['todo']}</div>
        </div>
        <div className={clsx(styles.ticketContentSection, isOpened ? styles.opened : '')}>
            <div className={styles.contentTopContainer}>
                <div className={styles.line}>
                    <div className={styles.lineTitle}>{"Expected resolution time"}</div>
                    <div className={clsx(styles.lineData, styles.bold)}>
                        <div className={styles.value}>{"Oct 31, 11:30 AM"}</div>
                        <div className={styles.estimation} ref={estimationLink} onClick={showPopup}>
                            <span>{"Erste Antwort innerhalb von 8 Stunden"}</span>
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
                {ticket.fields?.created && (
                    <div className={styles.line}>
                        <div className={styles.lineTitle}>{"Request submitted"}</div>
                        <div className={styles.lineData}>{formatDate(ticket.fields?.created)}</div>
                    </div>
                )}
                {ticket.fields?.customfield_10244 && (
                    <div className={styles.line}>
                        <div className={styles.lineTitle}>{"Autor"}</div>
                        <div className={clsx(styles.lineData)}>
                            <span>{AuthorProcess(ticket.fields?.customfield_10244)}</span>
                        </div>
                    </div>
                )}
                {ticket.fields?.priority.name && (
                    <div className={styles.line}>
                        <div className={styles.lineTitle}>{"Priorität"}</div>
                        <div className={clsx(styles.lineData, styles.bold)}>
                            {ticket.fields?.priority?.iconUrl && (<Image src={ticket.fields?.priority?.iconUrl} alt={"status"} height={32} width={12} />)}
                            <span>{updatePriorityName(ticket.fields?.priority?.name)}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.contentBottomContainer}>
                <div className={styles.title}>
                    {constants.TITLE}
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
    </div>
}

export default TicketItem