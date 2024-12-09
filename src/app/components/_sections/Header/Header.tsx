'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Container from "../../_layout/Container/Container"
import Row from "../../_layout/Row/Row"
import Col from "../../_layout/Col/Col"
import { StandartButton } from "../../_buttons/StandartButton/StandartButton"
import Link from "next/link"
import Image from "next/image"
import useAnimation from "@/app/hooks/Animation/Animation"
import constants from "./constants"
import utils from "../../../utils"
import styles from "./header.module.scss"
import clsx from "clsx"


type Props = {
    currentPage: string
}

const Header: React.FC<Props> = ({ currentPage = "home" }) => {
    const checkVisibility = useAnimation()
    const router = useRouter()
    const [menuList, setMenuList] = useState(constants.LIST_MENU)
    const [loading, setLoading] = useState(true)
    const [showPopUp, setShowPopUp] = useState(false)



    const logOut = () => {
        console.log('logged out')
        utils.user.resetAllData();
        router.push('/login')
    }

    const openPopUp = () => {
        console.log(showPopUp)
        setShowPopUp(!showPopUp)
    }

    useEffect(() => {
        const updatedMenu = menuList
        // updatedMenu[1].callback = openPopUp
        setMenuList(updatedMenu)
        setLoading(false)
    }, [])

    useEffect(() => {
        checkVisibility()
    }, [loading])

    return <>
        {!loading && (<Container classes={styles.container}>
            <Row classes={styles.mobileContainer}>
                <Col span={5} classes={styles.smallParts}>
                    <div className={styles.companyInfo}>
                        <div >
                            <Link href="/">
                                <Image src={'/img/logo.svg'} alt="ontron" width={133} height={36} className={styles.logo} />
                            </Link>
                        </div>
                        <div>
                            <div>

                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={19} classes={styles.smallParts}>
                    <ul className={styles.menuContainer}>
                        {menuList.length > 0 && menuList.map((item, key) => {
                            if (key < menuList.length - 1) {
                                return (<li key={key} className="animation-fade-in animation-fade-in middle-duration immidiate-show" style={{ transitionDelay: `${key * 0.1}s` }}>
                                    <StandartButton title={item.title} link={item.link} callback={item?.callback ? item.callback : undefined} active={currentPage == item.id} image={item.img} classes={styles.button} />
                                </li>)
                            }
                        })}
                        <li className={clsx("animation-fade-in animation-fade-in middle-duration immidiate-show", styles.buttomContainer)} style={{ transitionDelay: `${(menuList.length - 1) * 0.1}s` }}>
                            <StandartButton title={menuList[menuList.length - 1].title} link={menuList[menuList.length - 1].link} callback={openPopUp} active={currentPage == menuList[menuList.length - 1].id} image={menuList[menuList.length - 1].img} classes={styles.buttomContainer} />
                        </li>
                    </ul>
                    {showPopUp && (
                        <div className={styles.popUpBack}>
                            <div className={styles.infoPart}>
                                <div><b>{utils.user.getUserData().company}</b></div>
                                <div>{utils.user.getUserData().user_email}</div>
                                <div className={styles.role}>{utils.user.getUserData().roles[0].title}</div>
                            </div>
                            <div className={styles.buttonsPart}>
                                <StandartButton title={'Anmelden'} callback={logOut} image="/img/logout.svg" active={false} classes={styles.logOutButton}/>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>)
        }
    </>
}

export default Header