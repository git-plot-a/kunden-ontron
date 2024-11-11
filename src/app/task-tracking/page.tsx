"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/_sections/Header/Header"
import Footer from "../components/_sections/Footer/Footer"
import TopOfferSubPages from "../components/_sections/TopOfferSubPages/TopOfferSubPages"
import useSendQuery from "../hooks/sendQuery/sendQuery"
import Container from "../components/_layout/Container/Container"
import Row from "../components/_layout/Row/Row"
import Col from "../components/_layout/Col/Col"
import TaskList from "../components/_sections/TasksList/TaskList"
import api from "../api/crud"
import utils from "../utils"

const TaskTrackingPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [tickets, setTickets] = useState<Array<Ticket>>([])
    const { fetchData } = useSendQuery()

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
            let email_list = Array<string>();
            if (Array.isArray(userData.roles) && (userData.roles.includes("sla_manager") || userData.roles.includes("administrator"))) {
                const users_res: Array<string> = await fetchData(api.custom.COMPANY_USERS, "GET", {}, null, true)
                if (Array.isArray(users_res) && users_res.length > 0) {
                    email_list = users_res
                }
            } else {
                email_list.push(utils.user.getUserData()?.user_email)
            }
            const data: object = {
                userEmails: email_list
            }

            const result = await utils.jira.apiRequest(data, "GET")
            console.log(result)
            setTickets(result?.issues)
        }

        ticketsLoading();
    }, [])


    return <>
        {!loading && (<>
            <Header currentPage="task-tracking" />
            <section id="top-offer">
                <TopOfferSubPages title={<>Dienstleistungsanfragen</>} imageUrl="/img/trackinPageTopOffer.png" />
            </section>
            <section>
                <Container>
                    <Row>
                        <Col span={24}>
                            <TaskList tickets={tickets ? tickets : []} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>)}
    </>
}

export default TaskTrackingPage