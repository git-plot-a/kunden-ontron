import React from 'react';
import Col from "../../_layout/Col/Col"
import Container from "../../_layout/Container/Container"
import Row from "../../_layout/Row/Row"
import { Tabs } from '../../Tabs/Tabs';
import styles from "./servicelistwigets.module.scss"
import ServiceTile from '../../_buttons/ServiceTile/ServiceTile';

interface ExtendedService extends Service {
    subtitle?: string,
    id: string | number
}


type Props = {
    services: Array<ExtendedService>
}

const ServiceListWiget: React.FC<Props> = ({ services }) => {

    return <Container classes={styles.container}>
        <Row>
            <Col span={6}>
                <div className={styles.servicesList}>
                    {services.length > 0 && services.map((service, key) => (<ServiceTile service={service} key={key}/>))}
                </div>
            </Col>
            <Col span={18}>
                <Tabs>
                    <></>
                </Tabs>
            </Col>
        </Row>
    </Container>
}

export default ServiceListWiget