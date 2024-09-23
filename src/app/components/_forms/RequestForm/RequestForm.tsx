"use client"

import React from "react"
import { Formik, Form, Field } from "formik"
import { SubmitFormButton } from "../../_buttons/SubmitFormButton/SubmitFormButton"
import Row from "../../_layout/Row/Row"
import Col from "../../_layout/Col/Col"
import DropDownList from "../../DropDownList/DropDownList"
import { sendRequestFormSchems } from "../../../schemes"
import constants from "./constants"
import utils from "@/app/utils"
import styles from "./request.form.module.scss"

type Props = {
    handler: (res: boolean) => void
}

const RequestForm: React.FC<Props> = ({ handler }) => {
    //values: object
    const submitHandler = async (values: { requestTypeId: string, summary: string, description: string }) => {
        const user = utils.user.getUserData();
        console.log(user)
        if (user) {
            const requestData = {
                "type": String(values.requestTypeId),
                "summary": values.summary, // parse from the form
                "description": values.description, // parse from the form,
                "userEmail": user.user_email // we need to parse the email of the user
            }
            console.log(requestData)
            const result: Response | unknown = await utils.jira.apiRequest(requestData)
            if ((result as Response)?.ok) {
                handler(true)
                return
            }

            handler(false)
        } else {
            handler(false)
            return
        }
    }



    return <div className={styles.formContainer}>
        <Formik
            initialValues={{
                requestTypeId: "8",
                summary: '',
                description: ''
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
                    </Col>
                    {/* <Col span={12}>
                        <Field name="category" id="category" type="text" className={styles.hidden} />
                        <DropDownList items={constants.CATEGORIES} handler={()=>{}}></DropDownList>
                        {typeof props.errors["category"] != "undefined" && (
                            <div className={styles.messages}>
                                <span>{props.errors["category"]}</span>
                            </div>
                        )}
                    </Col> */}
                </Row>
                <Row>
                    <Col span={24}>
                        <Field name="summary" id="summary" placeholder="Problem Title" className={styles.fieldText} />
                        {typeof props.errors["summary"] != "undefined" && (
                            <div className={styles.messages}>
                                <span>{props.errors["summary"]}</span>
                            </div>
                        )}
                    </Col>
                    <Col span={24}>
                        <Field name="description" id="description" placeholder="Description*" as="textarea" className={styles.fieldText} />
                        {typeof props.errors["description"] != "undefined" && (
                            <div className={styles.messages}>
                                <span>{props.errors["description"]}</span>
                            </div>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className={styles.sendConatiner}>
                            <SubmitFormButton title={constants.BUTTON_TEXT} classes={styles.sendButton} />
                        </div>
                    </Col>
                </Row>
            </Form>
        }}</Formik>
    </div>
}
export default RequestForm