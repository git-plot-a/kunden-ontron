"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
    const [loading, setLoading] = useState(true)
    const [tickets, setTickets] = useState<Array<Ticket>>([])

    useEffect(() => {
        console.log(utils.user.getToken())
        if (!utils.user.getToken()) {
            utils.user.resetAllData()
            router.push('/login')
        } else {
            setLoading(false)
        }
    }, [])


    useEffect(() => {
        const ticketsLoading = async () => {
            const userData = utils.user.getUserData();
            let email = '';
            if (!Array.isArray(userData.roles) || (!userData.roles.includes("sla_manager") && !userData.roles.includes("administrator"))) {
                email = utils.user.getUserData()?.user_email
            }
            const data: object = {
                userEmail: email,
                project: userData.project
            }

            const result = await utils.jira.apiRequest(data, "GET")
            console.log(result)
            setTickets(result?.issues)
        }

        ticketsLoading();
    }, [])




    const sortingFunction = (val: string) => {
        const newTicketsList: Array<Ticket> = tickets.map(item => item)
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

        setTickets(newTicketsList)

    }

    return <>
        {!loading && (<>
            <Header currentPage="task-tracking" />
            <section id="top-offer">
                <TopOfferSubPages title={<>Dienstleistungsanfragen</>} imageUrl="/img/trackingOffer.png" />
            </section>
            <section style={{ paddingBottom: '224px' }}>
                <Container>
                    <Row>
                        <Col span={24}>
                            <TaskList tickets={tickets ? tickets : []} sortingFunction={sortingFunction} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>)}
    </>
}

export default TaskTrackingPage