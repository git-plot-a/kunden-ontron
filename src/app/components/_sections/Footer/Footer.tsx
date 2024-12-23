'use client'

import React from "react"
import clsx from "clsx"
import Container from "../../_layout/Container/Container"
import Row from "../../_layout/Row/Row"
import Col from "../../_layout/Col/Col"
import Link from "next/link"
import constants from "./constants"
import styles from "./footer.module.scss"

const Footer = () => {
    return <section id="footer">
        <Container classes={styles.container}>
            <Row classes={styles.rowMobileVersion}>
                <Col span={18} classes={styles.mobileVersion}>
                    <div className={styles.addressContainer}>
                        <div className={clsx(styles.addressRow, "animation-fade-in")}>
                            <Link className={styles.impressiumLinks} href={"/impressum"}>Impressum & Datenschutz</Link>
                        </div>
                    </div>
                </Col>
                <Col span={6} classes={styles.mobileVersion}>
                    <div className={clsx(styles.addressContainer, styles.textContainer, "animation-fade-in")} style={{transitionDelay: `0.2s`}}>
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