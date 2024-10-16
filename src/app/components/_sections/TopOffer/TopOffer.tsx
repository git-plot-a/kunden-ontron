import Container from "../../_layout/Container/Container"
import Row from "../../_layout/Row/Row"
import Col from "../../_layout/Col/Col"
import Image from "next/image"
import styles from "./topoffer.module.scss"

const TopOffer = () => {
    return <>
        <Container classes={styles.container}>
            <Row>
                <Col span={10}>
                    <h1 className={styles.title}>
                        <span>Willkommen,</span>
                        <br/>
                            Erzgebirgsklinikum!
                    </h1>
                </Col>
                <Col span={14}>
                    <Image src={'/img/topoffer.svg'} alt="top-offer" width={669} height={317} />
                </Col>
            </Row>
        </Container>
    </>
}

export default TopOffer