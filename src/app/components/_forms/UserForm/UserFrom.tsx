"use client"

import { Formik, Form, Field, } from 'formik';
import React, { useEffect } from "react"
import actions from "../../../actions"
import utils from "../../../utils"
import constants from './constants';

type Props = {
    fields: FiledList,
    handler: (props: { [key: string]: string | boolean | undefined }) => void,
    buttonTitle: string,
    verificationSheme: object
}

const UserFrom: React.FC<Props> = ({ fields, handler, buttonTitle = constants.DEFAULT_SUBMIT_TEXT, verificationSheme }) => {

    useEffect(() => {
        if (utils.user.getToken()) {
            actions.navigate("/")
        }
    }, [])

    return <><h2>User form</h2>
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
                        <div key={key}>
                            <Field
                                id={field.name}
                                name={field.name}
                                type={
                                    field.type
                                }
                                // value={field.value}
                                // checked={field.type == 'checkbox' ? field.value : undefined}
                                placeholder={field.placeholder}
                            />
                            {field.type == 'checkbox' &&
                                (<label>{field.placeholder}</label>)
                            }
                            {props.errors[field.name] ? (
                                <div>
                                    <span>{props.errors[field.name]}</span>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    ))}
                    <input
                        type="submit"
                        value={buttonTitle}
                    />
                </Form>
            }}
        </Formik>
    </>
}
export default UserFrom