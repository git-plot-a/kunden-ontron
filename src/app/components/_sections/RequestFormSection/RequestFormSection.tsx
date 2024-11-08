"use client"

import React, { useState } from "react";
import clsx from "clsx";
import Container from "../../_layout/Container/Container";
import Row from "../../_layout/Row/Row";
import Col from "../../_layout/Col/Col";
import RequestForm from "../../_forms/RequestForm/RequestForm";
import Image from "next/image";
// import LottieAnimation from "../../LottieAnimation/LottieAnimation";
// import sentAnimation from "./animations/Robo_email_v002.json"
// import questionAnimation from "./animations/Robo_question_v002.json"
// import technicalAnimation from "./animations/Robo_technical_v002.json"
// import errorAnimation from "./animations/Robo_error_v002.json"
import constants from "./constants";
import styles from "./request.form.section.module.scss"



const RequestFormSection = () => {
    const [result, setResult] = useState<formSendResult | null>(null)

    const handler = async (result: boolean) => {
        const res = constants.RESULTS.reduce((r: formSendResult | null, item) => (item.success === result ? item : r), null)
        setResult(res)
    }

    return <Container>
        <div className={clsx(styles.formContainer, result ? styles.resultingBack : styles.usualBlack, "animation-fade-in-top")}>
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
                                {/* <Image src={constants.RESULTS[0].img as string} alt={'result image'} height={340} width={560} /> */}
                                    <Image src={result.img as string} alt={'result image'} height={340} width={560} />
                                </div>
                                <div className={styles.formTitle} dangerouslySetInnerHTML={{ __html: result.text }} />
                                {/* <div className={styles.formTitle} dangerouslySetInnerHTML={{ __html: constants.RESULTS[0].text }} /> */}
                                <div className={styles.aditionalInfo} dangerouslySetInnerHTML={{ __html: constants.ADITIONAL_INFO }} />
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
                                        <div className={clsx(styles.formTitle, "animation-fade-in long-duration")} dangerouslySetInnerHTML={{__html: constants.TITLE}} style={{transitionDelay: '0.2s'}}/>
                                        <div className={clsx(styles.formTitleImage, "animation-fade-in long-duration")} style={{transitionDelay: '0.4s'}}>
                                            <Image src={'/img/decore1.svg'} alt="send a request" width={426} height={351} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={14}>
                                <RequestForm handler={handler}  />
                            </Col>
                        </>
                    )}
            </Row>
        </div>
    </Container>
}

export default RequestFormSection