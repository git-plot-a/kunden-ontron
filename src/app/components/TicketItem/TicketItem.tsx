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

type Event = {
    title: string,
    date: string
}
const TicketItem: React.FC<Props> = ({ ticket, classes = "", style = {} }) => {
    const [isOpened, setIsOpened] = useState(false)
    const [popUpVisible, setPopupVisible] = useState(false)
    const estimationLink = useRef<HTMLDivElement | null>(null)
    const animatedElement = useRef<HTMLDivElement | null>(null)
    const popup = useRef<HTMLDivElement | null>(null)
    const [tarifData, setTarifData] = useState<Preview | null>(null)
    const [eventsList, setEventsList] = useState<Event[]>([])

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
        setPopupVisible(true)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (estimationLink.current && !estimationLink.current.contains(event.target as Node) && popup.current && !popup.current.contains(event.target as Node) && popUpVisible) {
                setPopupVisible(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [popUpVisible])


    useEffect(() => {
        const getTarifInfo = () =>{
            setTarifData(null)
        }

        if(!tarifData){
            getTarifInfo()
        }

        if (animatedElement.current) {
            animatedElement.current.classList.add("animation-visible")
        }
    }, [isOpened])


    useEffect(() => {
        const list: Event[] = []
        if (ticket.fields?.created) {
            list.push({ title: constants.CREATED_TITLE, date: ticket.fields?.created })
        }
        if (ticket.changelog?.histories && ticket.changelog?.histories?.length > 0) {
            ticket.changelog?.histories?.forEach((history) => {
                const created = history?.created
                console.log(created)
                if (history.items && history.items?.length > 0) {
                    history?.items.forEach((item) => {
                        list.push({ title: `Feld ${item.field} wurde geändert${item.fromString || item.toString ? ':' : ''} ${item.fromString ? 'von ' + item.fromString : ''} ${item.toString ? 'in ' + item.toString : ''}.`, date: created })
                    })
                }
            })
        }

        const resolution: Event[] = []
        if (ticket.fields?.resolutiondate) {
            resolution.push({ title: constants.RESOLUTION_DATE, date: ticket.fields?.resolutiondate })
        }

        list.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });

        setEventsList([...resolution, ...list])
    }, [])

    const ServiceLevelImage = () =>{
        return 'support_lvl_bronze.svg'
    }

    const AuthorProcess = (author: string) => {
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
                {!ticket?.fields?.resolutiondate && (
                    <div className={styles.line}>
                        <div className={styles.lineTitle}>{constants.EXPECTED_REOLUTION_DATE}</div>
                        <div className={clsx(styles.lineData, styles.bold)}>
                            <div className={styles.value}>{"Oct 31, 11:30 AM"}</div>
                            <div className={styles.estimation} ref={estimationLink} onMouseOver={showPopup}>
                                <span dangerouslySetInnerHTML={{__html:constants.FIRST_RESPONCE }}/>
                                {popUpVisible && (
                                    <div className={clsx(styles.popup, popUpVisible ? styles.opened : '')} ref={popup}>
                                        <div className={styles.image}>
                                            <Image src={`/img/${ServiceLevelImage()}`} alt="support level" height={81} width={81} />
                                        </div>
                                        <div className={styles.text} dangerouslySetInnerHTML={{__html: constants.SUPPORT_LEVEL}}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* {task.fields?.resolutiondate && (
                                <div className={styles.line}>
                                    <div className={styles.lineTitle}>{"Expected resolution time"}</div>
                                    <div className={clsx(styles.lineData, styles.bold)}>{formatDate(task.fields?.resolutiondate)}</div>
                                </div>
                            )} */}
                {ticket.fields?.created && (
                    <div className={styles.line}>
                        <div className={styles.lineTitle}>{"Antrag eingereicht"}</div>
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
            {eventsList.length > 0 && (
                <div className={styles.contentBottomContainer}>
                    <div className={styles.title}>
                        {constants.EVENT_LIST_TITLE}
                    </div>
                    <div className={styles.eventList}>
                        {eventsList.map((event, key) => (
                            <div className={styles.event} key={key}>
                                <div className={styles.time}>{formatDate(event.date)}</div>
                                <div className={styles.dexcription}>{event.title}</div>
                            </div>
                        ))}

                        {/* <div className={styles.event}>
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
                        </div> */}
                    </div>
                </div>
            )}
            {/* {Array.isArray(task.fields?.timetracking) && task.fields?.timetracking.length > 0 &&  */}

            {/* } */}
        </div>
    </div>
}

export default TicketItem