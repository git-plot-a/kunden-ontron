import React from 'react';
import Container from "../../_layout/Container/Container"
import clsx from "clsx"
import Row from "../../_layout/Row/Row"
import Col from "../../_layout/Col/Col"
import Image from "next/image"
import styles from "./topoffer.module.scss"


type Props = {
    title: string
}

const TopOffer: React.FC<Props> = ({title}) => {
    return <>
        <Container classes={styles.container}>
            <Row>
                <Col span={10}>
                    <h1 className={clsx(styles.title, "animation-fade-in animation-fade-in-top middle-duration")} style={{ transitionDelay: '0.4s' }} dangerouslySetInnerHTML={{__html: title}}>
                    </h1>
                </Col>
                <Col span={14}>
                    <div className={styles.imageContainer}>
                        <Image src={'/img/topOffer.png'} alt="top-offer" width={665.5} height={294} />
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}

export default TopOffer