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
             {/* {JSON.stringify(result)} */}
        <div className={styles.formContainer}>
            <Row>
                {result && result?.success ?
                    (
                        <Col span={24}>
                            <div className={clsx(styles.formTitleBlock, styles.fullSize)}>
                                <div className={styles.formTitleImage}>
                                    <Image src={result.img as string} alt={'result image'} height={103} width={500} />
                                </div>
                                <div className={styles.formTitle} dangerouslySetInnerHTML={{ __html: result.text }} />
                                <div className={styles.aditionalInfo} dangerouslySetInnerHTML={{ __html: constants.ADITIONAL_INFO }} />
                            </div>
                        </Col>
                    )
                    : (
                        <>
                            <Col span={10}>
                                <div className={styles.formTitleBlock}>
                                    <div className={styles.formTitle}>
                                        {constants.TITLE}
                                    </div>
                                    <div className={styles.formTitleImage}>
                                        <Image src={'/img/firts_stage_request_image.svg'} alt="send a request" width={145} height={62} />
                                    </div>
                                </div>
                            </Col>
                            <Col span={14}>
                                <RequestForm handler={handler} resultingText={result?.text}/>
                            </Col>
                        </>
                    )}
            </Row>
        </div>
    </Container>
}

export default RequestFormSection