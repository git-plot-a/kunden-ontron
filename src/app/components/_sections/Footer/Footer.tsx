'use client'

import React from "react"
import clsx from "clsx"
import Container from "../../_layout/Container/Container"
import  Row  from "../../_layout/Row/Row"
import  Col  from "../../_layout/Col/Col"
import Link from "next/link"
import Image from "next/image"
import constants from "./constants"
import styles from "./footer.module.scss"

const Footer = () => {
    return <section id="feedback-section">
        <Container classes={styles.container}>
            <Row classes={styles.rowMobileVersion}>
                <Col span={12} classes={styles.mobileVersion}>
                    <div className={styles.companyInfo}>
                        <div className={styles.logoContainer}>
                            <Link href="/">
                                <Image src={'/img/Logo_ontron.svg'} alt="ontron" width={132} height={21} className={styles.logo} />
                            </Link>
                        </div>
                        <div className={styles.addressContainer}>
                            <div
                                className={styles.addressRow}
                                dangerouslySetInnerHTML={{ __html: constants.ADDRESS }}
                            />
                            <div
                                className={styles.addressRow}
                                dangerouslySetInnerHTML={{ __html: constants.EMAIL }}
                            />
                            <div
                                className={styles.addressRow}
                                dangerouslySetInnerHTML={{ __html: constants.PHONE }}
                            />
                            <div
                                className={styles.addressRow}
                            >
                                {constants.SOTIAL_NETS.map((item, key) => (
                                    <div className={styles.sotialLink}  key={key}>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            <Image src={item.logo.src} alt={item.logo.alt} width={38} height={38} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={12} classes={styles.mobileVersion}>
                    <div className={clsx(styles.addressContainer, styles.textContainer)}>
                        <div
                            className={styles.addressRow}

                        >
                            <Link className={styles.impressiumLinks} href={"/impressum"}>Impressum & Datenschutz</Link>
                        </div>
                        <div
                            className={styles.addressRow}
                            dangerouslySetInnerHTML={{ __html: constants.COPYRIGHT }}

                        />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
}

export default Footer