import React from 'react'
import Container from "../../_layout/Container/Container"
import clsx from "clsx"
import Row from "../../_layout/Row/Row"
import Col from "../../_layout/Col/Col"
import Image from "next/image"
import styles from "./topoffersubpages.module.scss"

type Props = {
    title: React.ReactNode,
    imageUrl: string,
    loadUrl?: string,
}

const TopOfferSubPages: React.FC<Props> = ({ title, imageUrl, loadUrl }) => {
    return <>
        <Container classes={styles.container}>
            <Row>
                <Col span={24}>
                    <h1 className={clsx(styles.title, "animation-fade-in animation-fade-in-top middle-duration")} style={{ transitionDelay: '0.4s' }}>
                        {title}
                    </h1>
                </Col>
                <div className={styles.backContainer}>
                    <Image src={imageUrl}
                        alt="top-offer"
                        width={1160}
                        height={296}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={loadUrl ? loadUrl : imageUrl} />
                </div>
            </Row>
        </Container>
    </>
}

export default TopOfferSubPages