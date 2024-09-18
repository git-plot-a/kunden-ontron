"use client"

import React from "react"
import { Formik, Form, Field } from "formik"
import { SubmitFormButton } from "../../_buttons/SubmitFormButton/SubmitFormButton"
import Row from "../../_layout/Row/Row"
import Col from "../../_layout/Col/Col"
import DropDownList from "../../DropDownList/DropDownList"
import { sendRequestFormSchems } from "../../../schemes"
import styles from "./request.form.module.scss"
import constants from "./constants"

const RequestForm: React.FC = () => {
    // const [currentType, setCurrentType] = useState(constants.REQUEST_TYPES[0].value)
    // const [currentCategory, setCurrentCategory] = useState(constants.CATEGORIES[0].value)

    const handler = () => { }

    return <div className={styles.formContainer}>
        <Formik
            initialValues={{
                requestTypeId: 6,
                summary: '',
                description: ''
            }}
            validationSchema={sendRequestFormSchems}
            onSubmit={handler}
        >{(props) => {
            return <Form>
                <Row>
                    <Col span={24}>
                        <Field type="number" name="requestTypeId" id="requestTypeId" className={styles.hidden} />
                        <DropDownList items={constants.REQUEST_TYPES} handler={() => { }}></DropDownList>
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