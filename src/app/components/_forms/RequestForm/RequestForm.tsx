"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Formik, Form, Field } from "formik"
import { SubmitFormButton } from "../../_buttons/SubmitFormButton/SubmitFormButton"
import Row from "../../_layout/Row/Row"
import Col from "../../_layout/Col/Col"
import DropDownList from "../../DropDownList/DropDownList"
import useSendQuery from "@/app/hooks/sendQuery/sendQuery"
import { sendRequestFormSchems } from "../../../schemes"
import api from "../../../api/crud"
import constants from "./constants"
import utils from "@/app/utils"
import styles from "./request.form.module.scss"
import { object } from "yup"

type Props = {
    handler: (res: boolean) => void,
}

const RequestForm: React.FC<Props> = ({ handler }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { fetchData } = useSendQuery()

    const submitHandler = async (values: { requestTypeId: string, summary: string, description: string, priority: string }) => {
        setLoading(true)
        const user = utils.user.getUserData();
        if (user) {
            const requestData = {
                "type": String(values.requestTypeId),
                "summary": values.summary,
                "description": values.description,
                "userEmail": user.user_email,
                "priority": { "id": String(values.priority) }
            }
            const result: { [key: string]: string } = await utils.jira.apiRequest(requestData)
            setLoading(false)
            if (result?.issueId) {
                handler(true)
                try {
                    const body = {
                        title: values.summary,
                        content: values.description,
                        priority: String(values.priority)
                    }
                    const resultWP: { data: { status: string }, message?: string } = await fetchData(api.custom.ADD_WP_REQUEST, "POST", { "Content-Type": "application/json" }, JSON.stringify(body), true)
                    if (resultWP.data?.status != "200") {
                        console.log(result.message)
                    } else {
                        console.log(resultWP)
                    }
                } catch (err) {

                }
                return
            }
            handler(false)
        } else {
            handler(false)
            console.log('logged out')
            utils.user.resetAllData();
            router.push('/login')
            return
        }
    }



    return <div className={styles.formContainer}>
        <Formik
            initialValues={{
                requestTypeId: "15",
                summary: '',
                description: '',
                priority: "3"
            }}
            validationSchema={sendRequestFormSchems}
            onSubmit={submitHandler}
        >{(props) => {
            return <Form>
                <Row>
                    <Col span={24}>
                        <Field type="string" name="requestTypeId" id="requestTypeId" className={styles.hidden} />
                        <DropDownList items={constants.REQUEST_TYPES} handler={(newVal: string) => { props.setFieldValue("requestTypeId", newVal) }}></DropDownList>
                        {typeof props.errors["requestTypeId"] != "undefined" && (
                            <div className={styles.messages}>
                                <span>{props.errors["requestTypeId"]}</span>
                            </div>
                        )}
                        {/* </Col> */}
                        {/* <Col span={12}>
                        <Field name="category" id="category" type="text" className={styles.hidden} />
                        <DropDownList items={constants.CATEGORIES} handler={()=>{}}></DropDownList>
                        {typeof props.errors["category"] != "undefined" && (
                            <div className={styles.messages}>
                                <span>{props.errors["category"]}</span>
                            </div>
                        )}
                    </Col> */}
                        {/* </Row>
                <Row>
                    <Col span={24} classes="animation-fade-in-top" style={{transitionDelay: '0.2s'}}> */}
                        <Field name="summary" id="summary" placeholder="Problembezeichnung" className={styles.fieldText} />
                        {typeof props.errors["summary"] != "undefined" && (
                            <div className={styles.messages}>
                                <span>{props.errors["summary"]}</span>
                            </div>
                        )}
                        {/* </Col>
                    <Col span={24} classes="animation-fade-in-top" style={{transitionDelay: '0.4s'}}> */}
                        <Field type="number" name="priority" id="priority" className={styles.hidden} />
                        <DropDownList items={constants.PRORITIES as Array<DropDownList>} handler={(newVal: string) => { props.setFieldValue("priority", newVal) }} def={2}></DropDownList>
                        {typeof props.errors["requestTypeId"] != "undefined" && (
                            <div className={styles.messages}>
                                <span>{props.errors["requestTypeId"]}</span>
                            </div>
                        )}
                        {/* </Col>
                    <Col span={24} classes="animation-fade-in-top" style={{transitionDelay: '0.6s'}}> */}
                        <Field name="description" id="description" placeholder="Beschreibung*" as="textarea" className={styles.fieldText} />
                        {typeof props.errors["description"] != "undefined" && (
                            <div className={styles.messages}>
                                <span>{props.errors["description"]}</span>
                            </div>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col span={24} classes="animation-fade-in-top" style={{ transitionDelay: '0.8s' }}>
                        <div className={styles.sendConatiner}>
                            <SubmitFormButton title={constants.BUTTON_TEXT} classes={styles.sendButton} blocked={loading} />
                        </div>
                    </Col>
                </Row>
            </Form>
        }}</Formik>
    </div>
}
export default RequestForm