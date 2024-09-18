"use client"

import React, { useState } from "react";
import Container from "../../_layout/Container/Container";
import Row from "../../_layout/Row/Row";
import Col from "../../_layout/Col/Col";
import RequestForm from "../../_forms/RequestForm/RequestForm";
import Image from "next/image";
import constants from "./constants";
import styles from "./request.form.section.module.scss"
import clsx from "clsx";


const RequestFormSection = () => {
    const [result, setResult] = useState<null | formSendResult>(null)

    const handler = (result: boolean) => {
        const res: null | formSendResult = constants.RESULTS.reduce((status: null | formSendResult, item) => (item.success == result ? item : status), null);
        setResult(res)
    }

    return <Container>
        <div className={styles.formContainer}>
            <Row>
                {result ?
                    <Col span={24}>
                        <div className={clsx(styles.formTitleBlock, styles.fullSize)}>
                            <div className={styles.formTitleImage}>
                                <Image src={result.img as string} alt={'result image'} height={103} width={500}/>
                            </div>
                            <div className={styles.formTitle} dangerouslySetInnerHTML={{ __html: result.text }} />
                            <div className={styles.aditionalInfo} dangerouslySetInnerHTML={{__html: constants.ADITIONAL_INFO}}/>
                        </div>
                    </Col>
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
                                <RequestForm handler={handler} />
                            </Col>
                        </>
                    )}
            </Row>
        </div>
    </Container>
}

export default RequestFormSection