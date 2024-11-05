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
            const data: object = {
                userEmail: utils.user.getUserData()?.user_email
            }
            const result = await utils.jira.apiRequest(data, "GET")
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
                        <TaskList tickets={tickets}/>    
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>)}
    </>
}

export default TaskTrackingPage