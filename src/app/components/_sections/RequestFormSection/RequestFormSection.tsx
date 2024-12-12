"use client"

import React, { useState, useEffect } from "react";
import { useRef } from "react";
import clsx from "clsx";
import Container from "../../_layout/Container/Container";
import Row from "../../_layout/Row/Row";
import Col from "../../_layout/Col/Col";
import RequestForm from "../../_forms/RequestForm/RequestForm";
import Image from "next/image";
import api from "../../../api/crud"
import utils from "@/app/utils";
import useAnimation from "@/app/hooks/Animation/Animation";
// import LottieAnimation from "../../LottieAnimation/LottieAnimation";
// import sentAnimation from "./animations/Robo_email_v002.json"
// import questionAnimation from "./animations/Robo_question_v002.json"
// import technicalAnimation from "./animations/Robo_technical_v002.json"
// import errorAnimation from "./animations/Robo_error_v002.json"
import constants from "./constants";
import styles from "./request.form.section.module.scss"



const RequestFormSection = () => {
    const [result, setResult] = useState<formSendResult | null>(null)
    const resultItem = useRef<HTMLDivElement | null>(null)
    const [services, setServices] = useState<Preview[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [chosenServiceId, setChosenServiceId] = useState<string | null>(null)
    const activateAnimaiton = useAnimation()

    const handler = async (result: boolean) => {
        const res = constants.RESULTS.reduce((r: formSendResult | null, item) => (item.success === result ? item : r), null)
        setResult(res)
    }

    useEffect(() => {
        if (resultItem.current) {
            resultItem.current.classList.add("animation-visible")
        }
    }, [result])

    useEffect(() => {
        setLoading(true)
        const getServices = async () => {
            const res: Preview[] = await utils.api.fetchData(api.custom.PREVIEW_CARDS, 'GET', {}, null, true);
            console.log(res)
            if (res) {
                setServices(res)
                if(res.length > 0) {
                    setChosenServiceId(res[0].related_entity?.id as string)
                }
            }
            setLoading(false)
            setTimeout(() => {
                activateAnimaiton()
            }, 300)
        }

        getServices()
    }, [])

    const processSupportLvel = (serviceCode: string) => {
        const serviceItem = services?.filter(service => serviceCode == service.related_entity.id)
        if (serviceItem && serviceItem.length > 0 && serviceItem[0].levels?.label) {
            return utils.culculations.processTarif(serviceItem[0].levels?.label, constants.ADITIONAL_INFO, true)
        }
        return constants.ADITIONAL_INFO
    }
    const processSupportText = (serviceCode: string, resText: string) => {
        const serviceItem = services?.filter(service => serviceCode == service.related_entity.id)
        if (serviceItem && serviceItem.length > 0 && serviceItem[0].responce_time) {
            return utils.culculations.processResponceTime(serviceItem[0].responce_time as number, resText)
        }
        return resText
    }

    return <>{!loading &&
        (<Container>
            <div className={clsx(styles.formContainer, result ? styles.resultingBack : styles.usualBlack)} ref={resultItem}>
                {/* <div className={clsx(styles.formContainer, !result ? styles.resultingBack : styles.usualBlack)}> */}
                <Row>
                    {result ?
                        (
                            <Col span={24}>
                                <div className={clsx(styles.formTitleBlock, styles.fullSize)}>
                                    <div className={styles.formTitleImage}>
                                        {/* <LottieAnimation animation={sentAnimation}/>
                                    <LottieAnimation animation={questionAnimation}/>
                                    <LottieAnimation animation={technicalAnimation}/>
                                    <LottieAnimation animation={errorAnimation}/> */}
                                        {/* <Image className={"animation-fade-in-top"} src={constants.RESULTS[0].img as string} alt={'result image'} height={340} width={560} /> */}
                                        <Image src={result.img as string} alt={'result image'} height={150} width={322}  style={{marginTop: '60px', marginBottom: '60px'}}/>
                                    </div>
                                    <div className={styles.formTitle} dangerouslySetInnerHTML={{ __html: processSupportText(chosenServiceId as string, result.text) }} />
                                    {chosenServiceId && (<div className={styles.aditionalInfo} dangerouslySetInnerHTML={{ __html: processSupportLvel(chosenServiceId) }} />)}
                                </div>
                            </Col>
                        )
                        : (
                            <>
                                <Col span={10}>
                                    <div className={clsx(styles.decoreElement, styles.small)}>
                                        <Image src={'/img/big_romb_1.svg'} alt={'Decore romb 1'} width={39.2} height={45} />
                                    </div>
                                    <div className={clsx(styles.decoreElement, styles.big)}>
                                        <Image src={'/img/big_romb_1.svg'} alt={'Decore romb 2'} width={53.7} height={61} />
                                    </div>
                                    <div className={styles.formTitleBlock} >
                                        <div className={styles.formTitleContiner}>
                                            <div className={clsx(styles.formTitle, "animation-fade-in long-duration")} dangerouslySetInnerHTML={{ __html: constants.TITLE }} style={{ transitionDelay: '0.2s' }} />
                                            <div className={clsx(styles.formTitleImage, "animation-fade-in long-duration")} style={{ transitionDelay: '0.4s' }}>
                                                <Image src={'/img/decore1.svg'} alt="send a request" width={322} height={200} style={{marginLeft: '68px'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={14}>
                                    <RequestForm handler={handler} services={services} setChosenServiceId={setChosenServiceId} />
                                </Col>
                            </>
                        )}
                </Row>
            </div>
        </Container>)}</>
}

export default RequestFormSection