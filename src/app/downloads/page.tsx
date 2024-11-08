"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/_sections/Header/Header"
import TopOfferSubPages from "../components/_sections/TopOfferSubPages/TopOfferSubPages"
import FilesDownload from "../components/_sections/FilesDownload/FilesDownload"
import Container from "../components/_layout/Container/Container"
import Row from "../components/_layout/Row/Row"
import Col from "../components/_layout/Col/Col"
import Footer from "../components/_sections/Footer/Footer"
import api from "@/app/api/crud"
import utils from "../utils"
import useSendQuery from "../hooks/sendQuery/sendQuery"
import useAnimation from "../hooks/Animation/Animation"



const DownloadsPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [fileLists, setFileLists] = useState(Array<FileListCustom>)
    const { fetchData } = useSendQuery()
    const acticateAnimation = useAnimation();

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
        const tocken = utils.user.getToken()
        const getPreviewServices = async () => {
            const servicesRes: Array<FileListCustom> = await fetchData(`${api.custom.DOCUMENTATION_LIST}`, "GET", {}, null, true)
            setFileLists(servicesRes)
        }

        if (tocken) {
            getPreviewServices()
        } else {
            utils.user.resetAllData()
            router.push('/login')
        }
    }, [])

    useEffect(() => {
        acticateAnimation();
    }, [fileLists])


    return <>
        {!loading && (
            <>
                <Header currentPage={"downloads"} />
                <section id="dowload-top-offer">
                    <TopOfferSubPages title={"Dienstleistungsanfragen"} imageUrl={'/img/downoloads_offer_image.png'} />
                </section>
                <section id="files-list">
                    <Container>
                        <Row>
                            <Col span={24}>
                                {
                                    fileLists.length > 0 && fileLists.map((item, key) => (<FilesDownload key={key} fileList={item} />))
                                }
                            </Col>
                        </Row>
                    </Container>
                </section>
                <Footer />
            </>
        )}
    </>
}

export default DownloadsPage