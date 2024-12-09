"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "../components/_sections/Header/Header"
import Footer from "../components/_sections/Footer/Footer"
import TopOfferSubPages from "../components/_sections/TopOfferSubPages/TopOfferSubPages"
import Container from "../components/_layout/Container/Container"
import Row from "../components/_layout/Row/Row"
import Col from "../components/_layout/Col/Col"
import TaskList from "../components/_sections/TasksList/TaskList"
import utils from "../utils"

const TaskTrackingPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true)
    const [tickets, setTickets] = useState<Array<Ticket>>([])
    const [usedTickets, setUsedTickets] = useState<Array<Ticket>>([])
    const [currentSort, setCurrentSort] = useState<string>('')

    useEffect(() => {
        console.log(utils.user.getToken())
        if (!utils.user.getToken()) {
            utils.user.resetAllData()
            router.push('/login')
        }
    }, [])


    useEffect(() => {
        setLoading(true)
        const params = new URL(window.location.href).searchParams
        const ticketsLoading = async () => {
            const userData = utils.user.getUserData();
            let email = '';
            const includesPrivilagedRoles = utils.culculations.checkRoles()

            if (!includesPrivilagedRoles) {
                email = utils.user.getUserData()?.user_email
            }

            const data: object = {
                userEmail: email,
                project: userData.project
            }

            const result = await utils.jira.apiRequest(data, "GET")
            setTickets(result?.issues)
            setUsedTickets(result?.issues)
            filterTicketsList(result?.issues, params)
            setLoading(false)
        }

        ticketsLoading();
    }, [])


    const sortingFunction = (val: string, newTicketsArray: Ticket[] | null = null) => {
        const newTicketsList: Array<Ticket> = newTicketsArray ? newTicketsArray.map(items => items) : usedTickets.map(item => item)
        setCurrentSort(val)
        switch (val) {
            case 'date':
                newTicketsList.sort((a, b) => {
                    const dateA = new Date(a.fields.created as string).getTime();
                    const dateB = new Date(b.fields.created as string).getTime();
                    return dateB - dateA;
                });
                console.log(newTicketsList)
                break;
            case 'proiroty':
                const priorityOrder = ["Highest", "High", "Normal", "Medium", "Low", "Lowest"];
                newTicketsList.sort((a, b) => {
                    const priorityA = a.fields?.priority?.name;
                    const priorityB = b.fields?.priority?.name;

                    const indexA = priorityOrder.indexOf(priorityA);
                    const indexB = priorityOrder.indexOf(priorityB);

                    return indexA - indexB;
                });
                break;
            case 'author':
                newTicketsList.sort((a, b) => {
                    const currentUserEmail = utils.user.getUserData()?.user_email;
                    const emailA = a.fields.customfield_10244?.toLowerCase();
                    const emailB = b.fields.customfield_10244?.toLowerCase();

                    const isCurrentUserA = emailA === currentUserEmail.toLowerCase();
                    const isCurrentUserB = emailB === currentUserEmail.toLowerCase();

                    if (isCurrentUserA && !isCurrentUserB) return -1;
                    if (!isCurrentUserA && isCurrentUserB) return 1;

                    return emailA?.localeCompare(emailB);
                });
                break;
        }
        setUsedTickets(newTicketsList)

    }

    const filterTicketsList = (originTickets: Ticket[], params: URLSearchParams) => {
        let newTickets: Ticket[] = originTickets.map(ticket => ticket)

        const period = params.get('period')
        if (period) {
            const startDate: Date | null = utils.culculations.getStartDate(period)
            console.log(startDate)
            newTickets = newTickets.reduce((res: Ticket[], item: Ticket) => {
                const createdDate = new Date(item.fields?.created as string)
                if (startDate && createdDate >= startDate) {
                    res.push(item)
                }
                return res
            }, [])
        }
        const sort = params.get('sort')
        if (sort) {
            newTickets = newTickets.reduce((res: Ticket[], item: Ticket) => {
                switch (sort) {
                    case 'all':
                        res.push(item);
                        break;
                    case 'resolved':
                        if (item.fields?.resolutiondate) {
                            res.push(item)
                        }
                        break;
                    case 'in_process':
                        if (utils.culculations.firstResponceTimeInMilliseconds(item as NestedObject) > 0 && !item.fields?.resolutiondate) {
                            res.push(item)
                        }
                        break;
                    case 'waiting':
                        if (item.fields?.customfield_10228?.completedCycles?.length == 0) {
                            res.push(item)
                        }
                        break;
                    case 'opened':
                        if (item.fields?.customfield_10228?.completedCycles?.length == 0 || (utils.culculations.firstResponceTimeInMilliseconds(item as NestedObject) > 0 && !item.fields?.resolutiondate)) {
                            res.push(item)
                        }
                        break;
                }
                return res
            }, [])

        }

        sortingFunction(currentSort, newTickets)
    }

    const filter = (val: string, param: string) => {
        const url = new URL(window.location.href);
        if (val != 'all') {
            url.searchParams.set(param, val);
        } else {
            url.searchParams.delete(param)
        }

        window.history.pushState({}, '', url.toString());
        filterTicketsList(tickets, url.searchParams)
    }


    const getParam = (paramName: string) => {
        const url = new URL(window.location.href);
        return url.searchParams.get(paramName)
    }

    return <>
        {!loading && (<>
            <Header currentPage="task-tracking" />
            <section id="top-offer">
                <TopOfferSubPages title={<>Überblick Tickets Gesamt</>} imageUrl="/img/trackingOffer.png" />
            </section>
            <section style={{ paddingBottom: '224px' }}>
                <Container>
                    <Row>
                        <Col span={24}>
                            <TaskList loading={loading} tickets={usedTickets ? usedTickets : []} sortingFunction={sortingFunction} filterFunc={filter} sort={getParam('sort') ? getParam('sort') : null} period={getParam('period') ? getParam('period') : null}/>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>)}
    </>
}

export default TaskTrackingPage