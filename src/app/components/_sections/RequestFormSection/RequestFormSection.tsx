"use client"

import React, { useState } from "react";
import clsx from "clsx";
import Container from "../../_layout/Container/Container";
import Row from "../../_layout/Row/Row";
import Col from "../../_layout/Col/Col";
import RequestForm from "../../_forms/RequestForm/RequestForm";
import Image from "next/image";
import constants from "./constants";
import styles from "./request.form.section.module.scss"


const RequestFormSection = () => {
    const [result, setResult] = useState<formSendResult | null>(null)

    const handler = async (result: boolean) => {
        const res = constants.RESULTS.reduce((r: formSendResult | null, item) => (item.success === result ? item : r), null)
        setResult(res)
    }

    return <Container>
        <div className={clsx(styles.formContainer, result ? styles.resultingBack : styles.usualBlack)}>
            <Row>
                {result ?
                    (
                        <Col span={24}>
                            <div className={clsx(styles.formTitleBlock, styles.fullSize)}>
                                <div className={styles.formTitleImage}>
                                    <Image src={result.img as string} alt={'result image'} height={340} width={560} />
                                </div>
                                <div className={styles.formTitle} dangerouslySetInnerHTML={{ __html: result.text }} />
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
                                <div className={styles.formTitleBlock}>
                                    <div className={styles.formTitleContiner}>
                                        <div className={styles.formTitle}>
                                            {constants.TITLE}
                                        </div>
                                        <div className={styles.formTitleImage}>
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