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


type Props = {
    currentPage: string
}

const Header:React.FC<Props> = ({currentPage = "home"}) => {
    const checkVisibility = useAnimation()
    const router = useRouter()
    const [menuList, setMenuList] = useState(constants.LIST_MENU)
    const [loading, setLoading] = useState(true)


    const logOut = () => {
        console.log('logged out')
        utils.user.resetAllData();
        router.push('/login')
    }

    useEffect(() => {
        const updatedMenu = menuList
        updatedMenu[1].callback = logOut
        setMenuList(updatedMenu)
        setLoading(false)
    }, [])

    useEffect(()=>{
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
                        {menuList.length > 0 && menuList.map((item, key) => (
                            <li key={key} className="animation-fade-in animation-fade-in middle-duration immidiate-show" style={{transitionDelay: `${key*0.1}s`}}> 
                                <StandartButton title={item.title} link={item.link} callback={item?.callback ? item.callback : undefined} active={currentPage == item.id} image={item.img}/>
                            </li>

                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>)
        }
    </>
}

export default Header