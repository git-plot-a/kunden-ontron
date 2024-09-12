"use client"

import { Formik, Form, Field, } from 'formik';
import clsx from 'clsx';
import React, { useEffect } from "react"
import actions from "../../../actions"
import utils from "../../../utils"
import constants from './constants';
import styles from "./userfrom.module.scss"
import Image from 'next/image';
import { SubmitFormButton } from '../../_buttons/SubmitFormButton/SubmitFormButton';


type Props = {
    fields: FiledList,
    handler: (props: { [key: string]: string | boolean | undefined }) => void,
    buttonTitle: string,
    verificationSheme: object
    changeFieldsList?: (fields: FiledList) => void
}

const UserFrom: React.FC<Props> = ({ fields, handler, buttonTitle = constants.DEFAULT_SUBMIT_TEXT, verificationSheme, changeFieldsList }) => {

    useEffect(() => {
        if (utils.user.getToken()) {
            actions.navigate("/")
        }
    }, [])

    const eyeVisibility: (field: FormField, key: number) => void = (field: FormField, key: number) => {
        if (field.type == "password" && typeof field?.eyeVisibility !== "undefined" && typeof changeFieldsList !== "undefined") {
            const updatedFields = fields.map((f, index) => {
                if (index === key) {
                    return {
                        ...f,
                        eyeVisibility: !f.eyeVisibility, // Меняем только свойство eyeVisibility
                    };
                }
                return f;
            });
            changeFieldsList(updatedFields)
        }
    }

    return <>
        <Formik
            initialValues={fields.reduce<{ [key: string]: string | boolean | undefined }>((res, field) => {
                res[field.name] = field.value
                return res
            }, {})}
            validationSchema={verificationSheme}
            onSubmit={handler}
        >
            {(props) => {

                return <Form>
                    {fields.map((field, key) => (
                        <div className={clsx(styles.fieldContainer, field.type == 'checkbox' ? styles.checkbox : '')} key={key}>
                            <Field
                                id={field.name}
                                name={field.name}
                                type={
                                    field.type == "password" && field.eyeVisibility ? 'text' : field.type
                                }
                                placeholder={field.placeholder}
                            />
                            {field.type == "password" && (
                                <div className={styles.eyes}>
                                    <Image
                                        src={'/img/eye_closed.svg'}
                                        width={24}
                                        height={24}
                                        alt={'eye closed'}
                                        className={field.eyeVisibility ? styles.hidden : ''}
                                        onClick={() => {
                                            eyeVisibility(field, key)
                                        }}
                                    />
                                    <Image
                                        src={'/img/eye_opened.svg'}
                                        width={24}
                                        height={24}
                                        alt={'eye opened'}
                                        className={field.eyeVisibility ? '' : styles.hidden}
                                        onClick={() => {
                                            eyeVisibility(field, key)
                                        }}
                                    />
                                </div>
                            )}
                            {field.type == 'checkbox' &&
                                <label htmlFor={field.name} className={styles.fieldLabel}>{field.placeholder}</label>
                            }
                            {props.errors[field.name] ? (
                                <div className={styles.error}>
                                    <span>{props.errors[field.name]}</span>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    ))}
                    <div className={styles.formButton}>
                        <SubmitFormButton title={buttonTitle} />
                    </div>
                </Form>
            }}
        </Formik>
    </>
}
export default UserFrom