"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';
import { SubmitFormButton } from '../../_buttons/SubmitFormButton/SubmitFormButton';
import Container from '../../_layout/Container/Container';
import Row from '../../_layout/Row/Row';
import Col from '../../_layout/Col/Col';
import Image from 'next/image';
import { editUserFromSchems, resetPasswordSchems } from "@/app/schemes"
import useSendQuery from '@/app/hooks/sendQuery/sendQuery';
import api from '@/app/api/crud';
import constants from "./constants"
import utils from '@/app/utils';
import styles from "./userEditForm.module.scss"


type Props = {
  [key: string]: string
}

const UserEditForm: React.FC<Props> = () => {
  const router = useRouter()
  const {fetchData} = useSendQuery()
  const [oldPassOpened, setOldPassOpened] = useState(false);
  const [newPassOpened, setNewPassOpened] = useState(false);
  const [loading, setLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [resetPassOpened, setResetNewPassOpened] = useState(false);
  const [generalResultPasswdForm, setGeneralResultPasswdForm] = useState<string>('')
  const [generalResultChangeUserData, setGeneralResultChangeUserData] = useState<string>('')


  const updateUserData = async (values: { [key: string]: string }) => {
    const { username } = values;
    const userID = utils.user.getUserID();
    const callback = () => {
      setGeneralResultChangeUserData(constants.SUCESSFUL_USER_CHANGE)
    }
    try {
      const dataArray = JSON.stringify({
        "id": userID,
        "display_name": username,
      });
      const result = await fetchData(api.custom.USER_CHANGE, "POST", { "Content-Type": "application/json" }, dataArray, true);
      if (result?.code == "success") {
        callback()
      } else {
        setGeneralResultChangeUserData(result?.data?.message)
      }
    } catch (error) {
      setGeneralResultChangeUserData(constants.RESET_USER_DATA_FAIL)
    }
  }

  const updateUserPasswd = async (values: { [key: string]: string }) => {
    const { oldPassword, newPassword } = values;
    const userID = utils.user.getUserID();

    const callback = () => {
      let counter = 5;
      const func = function () {
        setGeneralResultPasswdForm(`${constants.SUCCESS_PASSWORD_CHANGE} ${counter}`);
        if (counter > 0) {
          counter--
          setTimeout(func, 1000)
        } else {
          utils.user.resetAllData();
          router.push('/login')
        }
      }
      setTimeout(func, 1000)
    }
    try {

      const dataArray = JSON.stringify({
        "id": userID,
        "old_pass": oldPassword,
        "new_pass": newPassword,
      });
      const result = await fetchData(api.custom.USER_NEW_PASSWORD, "POST", { "Content-Type": "application/json"}, dataArray, true);
      if (result?.code == "success") {
        console.log(result)
        callback()
      } else {
        setGeneralResultPasswdForm(result?.data?.message)
      }
    } catch (error) {
      setGeneralResultPasswdForm(constants.RESET_PASSWORD_FAIL)
    }
  }

  // const { prossessFileLoading, generalError: AvatarError } = useLoadContent();

  // const avatarClick: () => void = () => {
  //   if (document) {
  //     const inputFile = document?.getElementById("avatar-image")
  //     inputFile?.click()
  //   }
  // }

  //TEMPORARY
  // const changeAvatarHandler = (e: ChangeEvent) => {
  //   if (e.target && (e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files?.length) {
  //     const imageFile = ((e.target as HTMLInputElement)?.files as FileList)[0];
  //     const callback = (e: Event) => {
  //       if ((e.target as FileReader)?.result) {
  //         setAvatar((e.target as FileReader)?.result as string);
  //       }
  //     };
  //     prossessFileLoading(imageFile, callback);
  //   }

  // }


  useEffect(() => {

    if (typeof window !== 'undefined') {
      setCurrentUser(utils.user.getUserData())
      // if (utils.user.getUserData()?.avatar)
      //   setAvatar(utils.user.getUserData()?.avatar)
      setLoading(false)
    }
  }, [])

  const changeEye = (val: boolean, func: (str: boolean) => void) => {
    func(val)
  }

  return <>{!loading && (<div className={styles.container}>
    <Container>
      <Row>
        <Col span={8}>
          <h4>{"Change user data"}</h4>
          <div>
            <Formik
              initialValues={{
                username: currentUser?.user_display_name ? currentUser?.user_display_name : '',
                // email: currentUser?.user_email ? currentUser?.user_email : ''
              }}
              validationSchema={editUserFromSchems}
              onSubmit={updateUserData}>
              {(props) => {
                return <Form>
                  {/* <div className={styles.field}>
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
                  </div> */}
                  <div className={styles.field}>
                    {utils.user.getUserData()?.company ? (<div className={styles.field}>{`${constants.COMPANY_TITLE} ${currentUser?.company}`}</div>) : (<></>)}
                  </div>
                  <div className={styles.field}>
                    {`Email: ${currentUser?.user_email ? currentUser?.user_email : ''}`}
                    {/* <Field
                      type="text"
                      id="email"
                      name={"email"}
                      placeholder={constants.EMAIL_PLACEHOLDER}
                    />
                    {props.errors.email && (<div>
                      {props.errors.email}
                    </div>)} */}
                  </div>
                  {"Username:"}
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
                  <SubmitFormButton title={constants.SAVE_BUTTON} />
                  {generalResultChangeUserData}
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
                      onClick={() => { changeEye(true, setOldPassOpened) }} />
                    <Image
                      src={"/img/eye_opened.svg"}
                      alt={"closed eye"}
                      height={20}
                      width={20}
                      className={clsx(!oldPassOpened ? styles.invisible : '')}
                      onClick={() => { changeEye(false, setOldPassOpened) }} />
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
                      onClick={() => { changeEye(true, setNewPassOpened) }} />
                    <Image
                      src={"/img/eye_opened.svg"}
                      alt={"closed eye"}
                      height={20}
                      width={20}
                      className={clsx(!newPassOpened ? styles.invisible : '')}
                      onClick={() => { changeEye(false, setNewPassOpened) }} />
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
                      onClick={() => { changeEye(true, setResetNewPassOpened) }} />
                    <Image
                      src={"/img/eye_opened.svg"}
                      alt={"closed eye"}
                      height={20}
                      width={20}
                      className={clsx(!resetPassOpened ? styles.invisible : '')}
                      onClick={() => { changeEye(false, setResetNewPassOpened) }} />
                    {props.errors.repeatNewPassword && (<div>
                      {props.errors.repeatNewPassword}
                    </div>)}
                  </div>
                  <SubmitFormButton title={constants.FORM_TITLE} />
                  {generalResultPasswdForm}
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
  </div>)

  }</>
}

export default UserEditForm