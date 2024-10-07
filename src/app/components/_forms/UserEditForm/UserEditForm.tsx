"use client"

import React, { ChangeEvent, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { SubmitFormButton } from '../../_buttons/SubmitFormButton/SubmitFormButton';
import Container from '../../_layout/Container/Container';
import Row from '../../_layout/Row/Row';
import Col from '../../_layout/Col/Col';
import Image from 'next/image';
import { editUserFromSchems, resetPasswordSchems } from "@/app/schemes"
import useLoadContent from "../../../hooks/loadContent/loadContent";
import global from '@/app/constants/global';
import constants from "./constants"
import styles from "./userEditForm.module.scss"
import clsx from 'clsx';

type Props = {
  [key: string]: string
}

const UserEditForm: React.FC<Props> = () => {
  const [avatar, setAvatar] = useState('/img/avatar.png');
  const [oldPassOpened, setOldPassOpened] = useState(false);
  const [newPassOpened, setNewPassOpened] = useState(false);
  const [resetPassOpened, setResetNewPassOpened] = useState(false);

  const updateUserData = (values: { [key: string]: string }) => {
    console.log(values)
  }

  const updateUserPasswd = (values: { [key: string]: string }) => {
    console.log(values)
  }

  const { prossessFileLoading, generalError: AvatarError } = useLoadContent();

  const avatarClick: () => void = () => {
    if (document) {
      const inputFile = document?.getElementById("avatar-image")
      inputFile?.click()
    }
  }

  const changeAvatarHandler = (e: ChangeEvent) => {
    if (e.target && (e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files?.length) {
      const imageFile = ((e.target as HTMLInputElement)?.files as FileList)[0];
      const callback = (e: Event) => {
        console.log(e.target)
        if ((e.target as FileReader)?.result) {
          console.log(e.target)
          setAvatar((e.target as FileReader)?.result as string);
        }
      };
      prossessFileLoading(imageFile, callback);
    }

  }


  const changeEye = (val: boolean, func: (str: boolean) => void) => {
    func(val)
  }

  return <div className={styles.container}>
    <Container>
      <Row>
        <Col span={8}>
          <h4>{"Change user data"}</h4>
          <div>
            <Formik
              initialValues={{
                username: '',
                email: ''
              }}
              validationSchema={editUserFromSchems}
              onSubmit={updateUserData}>
              {(props) => {
                return <Form>
                  <div className={styles.field}>
                    <Image
                      // className="avatar"
                      src={avatar}
                      alt={"user avatar"}
                      loading="lazy"
                      id={"user-avatar"}
                      width={100}
                      height={100}
                    />
                    <Image src="/img/pencil.svg" alt="avatar button" onClick={avatarClick} height={20} width={20} />
                    {AvatarError && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: AvatarError,
                        }}
                      />
                    )}
                    <input
                      type="file"
                      id="avatar-image"
                      accept={global.FILE_TYPES_FOR_IMAGES.join(',')}
                      onChange={changeAvatarHandler}
                      className={styles.invisible}
                    />
                  </div>
                  <div className={styles.field}>
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      placeholder={constants.USER_PLACEHOLDER}
                    />
                    {props.errors.username && (
                      <div>
                        {props.errors.username}
                      </div>)}
                  </div>
                  <div className={styles.field}>
                    <Field
                      type="text"
                      id="email"
                      name={"email"}
                      placeholder={constants.EMAIL_PLACEHOLDER}
                    />
                    {props.errors.email && (<div>
                      {props.errors.email}
                    </div>)}
                  </div>
                  <SubmitFormButton title={constants.SAVE_BUTTON} />
                </Form>
              }}
            </Formik>
          </div>
          <h4>{"Change password"}</h4>
          <div>
            <Formik
              initialValues={{
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: '',
              }}
              validationSchema={resetPasswordSchems}
              onSubmit={updateUserPasswd}>
              {(props) => {
                return <Form>
                  <div className={styles.field}>
                    <Field
                      type={oldPassOpened ? "text" : "password"}
                      name="oldPassword"
                      id="oldPassword"
                      placeholder={constants.OLD_PASSWORD}
                    />
                    <Image
                      src={"/img/eye_closed.svg"}
                      alt={"closed eye"} height={20}
                      width={20}
                      className={clsx(oldPassOpened ? styles.invisible : '')}
                      onClick={() => { changeEye(true, setOldPassOpened, "oldPassword") }} />
                    <Image
                      src={"/img/eye_opened.svg"}
                      alt={"closed eye"}
                      height={20}
                      width={20}
                      className={clsx(!oldPassOpened ? styles.invisible : '')}
                      onClick={() => { changeEye(false, setOldPassOpened, "oldPassword") }} />
                    {props.errors.oldPassword && (<div>
                      {props.errors.oldPassword}
                    </div>)}
                  </div>
                  <div className={styles.field}>
                    <Field
                      type={newPassOpened ? "text" : "password"}
                      id="newPassword"
                      name={"newPassword"}
                      placeholder={constants.NEW_PASSWORD}
                    />
                    <Image
                      src={"/img/eye_closed.svg"}
                      alt={"closed eye"} height={20}
                      width={20}
                      className={clsx(newPassOpened ? styles.invisible : '')}
                      onClick={() => { changeEye(true, setNewPassOpened, "newPassword") }} />
                    <Image
                      src={"/img/eye_opened.svg"}
                      alt={"closed eye"}
                      height={20}
                      width={20}
                      className={clsx(!newPassOpened ? styles.invisible : '')}
                      onClick={() => { changeEye(false, setNewPassOpened, "newPassword") }} />
                    {props.errors.newPassword && (<div>
                      {props.errors.newPassword}
                    </div>)}
                  </div>
                  <div className={styles.field}>
                    <Field
                      type={resetPassOpened ? "text" : "password"}
                      name="repeatNewPassword"
                      id="repeatNewPassword"
                      placeholder={constants.REPEAT_PASSWORD}
                    />
                    <Image
                      src={"/img/eye_closed.svg"}
                      alt={"closed eye"} height={20}
                      width={20}
                      className={clsx(resetPassOpened ? styles.invisible : '')}
                      onClick={() => { changeEye(true, setResetNewPassOpened, "repeatNewPassword") }} />
                    <Image
                      src={"/img/eye_opened.svg"}
                      alt={"closed eye"}
                      height={20}
                      width={20}
                      className={clsx(!resetPassOpened ? styles.invisible : '')}
                      onClick={() => { changeEye(false, setResetNewPassOpened, "repeatNewPassword") }} />
                    {props.errors.repeatNewPassword && (<div>
                      {props.errors.repeatNewPassword}
                    </div>)}
                  </div>
                  <SubmitFormButton title={constants.FORM_TITLE} />
                </Form>
              }}
            </Formik>
          </div>
        </Col>
        <Col span={16}>
          {"second part"}
        </Col>
      </Row>
    </Container>
  </div>
}

export default UserEditForm