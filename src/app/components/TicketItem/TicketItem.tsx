import React, { useState, useEffect } from "react"
import { useRef } from "react"
import clsx from "clsx"
import Image from "next/image"
import constants from "./constants"
import styles from "./ticketItem.module.scss"
import useSendQuery from "@/app/hooks/sendQuery/sendQuery"
import utils from "@/app/utils"
import api from "../../api/crud"

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
    const { fetchData } = useSendQuery()

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
        const getTarifInfo = async () => {

            const jira_id = ticket.fields?.customfield_10251?.id
            console.log(jira_id)
            if (jira_id) {
                const res = await fetchData(`${api.custom.PREVIEW_CARDS}/${jira_id}`, 'GET', {}, null, true)
                if (res && res.length > 0) {
                    let requestType: number = ((((ticket.fields as NestedObject)?.customfield_10227 as NestedObject)?.ongoingCycle as NestedObject)?.goalDuration as NestedObject)?.millis as number
                    if (!requestType) {
                        const completedCercles: NestedObject[] = (((ticket.fields as NestedObject)?.customfield_10227 as NestedObject)?.ongoingCycle as NestedObject)?.completedCycles as NestedObject[]
                        requestType = completedCercles.reduce((timeValue: number, item: NestedObject) => {
                            if ((item.goalDuration as NestedObject)?.millis) {
                                return (((item.goalDuration as NestedObject)?.millis as number) / (1000 * 60 * 60))
                            }
                            return timeValue
                        }, 0)
                        if (requestType) {
                            setTarifData({ ...res[0], responce_time: requestType })
                        } else {
                            if (res[0].responce_time) {
                                setTarifData({ ...res[0], responce_time: res[0].responce_time })
                            }
                        }
                    } else {
                        setTarifData({ ...res[0], responce_time: (requestType / (1000 * 60 * 60)) })
                    }
                }
            }
        }

        if (!tarifData && isOpened) {
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


    const AuthorProcess = (author: string) => {
        const curreUser = utils.user.getUserData();
        return curreUser.user_email && curreUser.user_email == author ? "Sie" : author
    }

    const updatePriorityName = (priorityName: string) => {
        const name = constants.PRIORITIES[priorityName.toLowerCase()]
        return name ? name : priorityName
    }

    const firstReactionCulculation = (firstReaction: number) => {
        if (ticket?.fields?.created) {
            const createdDate = new Date(ticket?.fields?.created)
            const reactionDate = new Date(createdDate.getTime() + firstReaction * 60 * 60 * 1000);

            const WORK_START_HOUR = 8;
            const WORK_END_HOUR = 17;

            while (reactionDate.getHours() < WORK_START_HOUR || reactionDate.getHours() >= WORK_END_HOUR) {
                if (reactionDate.getHours() < WORK_START_HOUR) {
                    reactionDate.setHours(WORK_START_HOUR, 0, 0, 0);
                } else {
                    reactionDate.setDate(reactionDate.getDate() + 1);
                    reactionDate.setHours(WORK_START_HOUR, 0, 0, 0);
                }
            }


            const options: Intl.DateTimeFormatOptions = {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            const formattedReactionDate = reactionDate.toLocaleString('en-US', options)

            return formattedReactionDate;
        } else {
            return null;
        }

    }

    const processText = (content: DescriptionSection) => {
        let description: string = "" as string
            (content.content as NestedObject[]).forEach((line:NestedObject)=> {
                if (line.type == 'text') {
                    description += `<p><span>${line.text}</span></p>`
                }
            })
        return description
    }

    const processBulletList = (section: DescriptionSection) => {
        let description: string = ''
        description += "<ul>" as string
        section.content.forEach(line => {
            if (line.type == "listItem" && line.content && (line.content as NestedObject[]).length > 0) {
                description += "<li>" as string
                (line.content as NestedObject[]).forEach(bulletItem => {
                    if (bulletItem.type === 'paragraph' && (bulletItem.content as NestedObject[]).length > 0) {
                        description+= processText(bulletItem as DescriptionSection)
                    }
                    if (bulletItem.type === "bulletList" && bulletItem.content && (bulletItem.content as NestedObject[]).length > 0) {
                        description += processBulletList(bulletItem as DescriptionSection)
                    }
                })
                 description += "</li>"

            }
        })
        description += "</ul>"
        return description
    }

    //Only text is processed
    const descriptionProcess = (content: Array<DescriptionSection>) => {
        let description: string = ''
        console.log(content)
        content.forEach(section => {
            if (section.type == "paragraph" && section.content && Array.isArray(section.content) && section.content.length > 0) {
                description += processText(section)
            }
            if (section.type == "bulletList" && section.content && (section.content as NestedObject[]).length > 0) {
                description += processBulletList(section)
            }
        })
        return description
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
                {!ticket?.fields?.resolutiondate && tarifData && (
                    <div className={styles.line}>
                        <div className={styles.lineTitle}>{constants.EXPECTED_REOLUTION_DATE}</div>
                        <div className={clsx(styles.lineData, styles.bold)}>
                            <div className={styles.value}>{firstReactionCulculation(tarifData?.responce_time as number)}</div>
                            <div className={styles.estimation} ref={estimationLink} onMouseOver={showPopup}>
                                <span dangerouslySetInnerHTML={{ __html: utils.culculations.processResponceTime(tarifData?.responce_time as number, constants.FIRST_RESPONCE) }} />
                                {popUpVisible && (
                                    <div className={clsx(styles.popup, popUpVisible ? styles.opened : '')} ref={popup}>
                                        <div className={clsx(styles.image, styles[tarifData.levels.label])}>
                                            <Image src={`/img/support_lvl_${tarifData.levels.label}.svg`} alt="support level" height={81} width={81} />
                                        </div>
                                        <div className={styles.text} dangerouslySetInnerHTML={{ __html: utils.culculations.processTarif(tarifData?.levels.label as string, constants.SUPPORT_LEVEL) }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {ticket.fields?.created && (
                    <div className={styles.line}>
                        <div className={styles.lineTitle}>{constants.CREATED}</div>
                        <div className={styles.lineData}>{formatDate(ticket.fields?.created)}</div>
                    </div>
                )}
                {ticket.fields?.customfield_10244 && (
                    <div className={styles.line}>
                        <div className={styles.lineTitle}>{constants.AUTHOR}</div>
                        <div className={clsx(styles.lineData)}>
                            <span>{AuthorProcess(ticket.fields?.customfield_10244)}</span>
                        </div>
                    </div>
                )}
                {ticket.fields?.priority.name && (
                    <div className={styles.line}>
                        <div className={styles.lineTitle}>{constants.PIORITY}</div>
                        <div className={clsx(styles.lineData, styles.bold)}>
                            {ticket.fields?.priority?.iconUrl && (<Image src={ticket.fields?.priority?.iconUrl} alt={"status"} height={32} width={12} />)}
                            <span>{updatePriorityName(ticket.fields?.priority?.name)}</span>
                        </div>
                    </div>
                )}
                {ticket.fields?.description?.content && ticket.fields?.description?.content.length > 0 && descriptionProcess(ticket.fields?.description?.content as Array<DescriptionSection>) && (
                    <div className={styles.line}>
                        <div className={clsx(styles.lineTitle, styles.pinchTop)}>{constants.DESCRIPTION}</div>
                        <div className={clsx(styles.lineData, styles.paragraphs)} dangerouslySetInnerHTML={{ __html: descriptionProcess(ticket.fields?.description?.content as Array<DescriptionSection>) }} />
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

                    </div>
                </div>
            )}
        </div>
    </div>
}

export default TicketItem