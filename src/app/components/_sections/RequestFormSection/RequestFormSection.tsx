import React from "react";
import Container from "../../_layout/Container/Container";
import Row from "../../_layout/Row/Row";
import Col from "../../_layout/Col/Col";
import RequestForm from "../../_forms/RequestForm/RequestForm";
import Image from "next/image";
import constants from "./constants";
import styles from "./request.form.section.module.scss"


const RequestFormSection = () => {
    return <Container>
        <div className={styles.formContainer}>
            <Row>
                <Col span={10}>
                    {/* <div className={styles.formTitleBlockContainer}> */}
                        <div className={styles.formTitleBlock}>
                            <div className={styles.formTitle}>
                                {constants.TITLE}
                            </div>
                            <div className={styles.formTitleImage}>
                                <Image src={'/img/firts_stage_request_image.svg'} alt="send a request" width={145} height={62} />
                            </div>
                        </div>
                    {/* </div> */}
                </Col>
                <Col span={14}>
                    <RequestForm />
                </Col>
            </Row>
        </div>
    </Container>
}

export default RequestFormSection