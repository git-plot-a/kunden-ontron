"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Col from "../../_layout/Col/Col"
import Container from "../../_layout/Container/Container"
import Row from "../../_layout/Row/Row"
import { Tabs } from '../../Tabs/Tabs';
import { Button } from '../../_buttons/Button/Button';
import Image from 'next/image';
import ServiceTile from '../../_buttons/ServiceTile/ServiceTile';
import constants from './constants';
import styles from "./servicelistwigets.module.scss"


interface ExtendedService extends Service {
    subtitle?: string,
    id: string | number
}


type Props = {
    services: Array<ExtendedService>
}

const ServiceListWiget: React.FC<Props> = ({ services }) => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<string>(`${constants.TABS_ID_PREFIX}1`)

    const redirectCallback = (e: React.MouseEvent<HTMLElement>) => {
        router.push('/support')
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case `${constants.TABS_ID_PREFIX}1`:
                return <div>Description</div>;

            case `${constants.TABS_ID_PREFIX}2`:
                return (<table className={styles.table}>
                    <tr className={clsx(styles.row, styles.mainTitle)}>
                        <th className={clsx(styles.column, styles.header, styles.notBordered)}></th>
                        <th className={clsx(styles.column)}>
                            <div className={styles.level}>
                                <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.bronze)}></div></div>
                                <div className={styles.title}>Bronze</div>
                                <div className={styles.activeStatus}>Active now</div>
                                <Button title={'Change'} callback={redirectCallback} />
                            </div>
                        </th>
                        <th className={clsx(styles.column)}>
                            <div className={styles.level}>
                                <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.silber)}></div></div>
                                <div className={styles.title}>Silber</div>
                                <div className={styles.activeStatus}></div>
                                <Button title={'Choose'} callback={redirectCallback} />
                            </div>
                        </th>
                        <th className={clsx(styles.column, styles.gold)}>
                            <div className={styles.level}>
                                <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.gold)}></div></div>
                                <div className={styles.title}>Gold</div>
                                <div className={styles.activeStatus}></div>
                                <Button title={'Choose'} callback={redirectCallback} />
                            </div>
                        </th>
                    </tr>

                    <tr className={clsx(styles.row, styles.gray)}>
                        <td className={clsx(styles.column, styles.header)}>
                            <div className={clsx(styles.text, styles.leftSide)}>
                                <b>Zeitaufwand für Autoren von Inhalten (Monatlich)</b>
                            </div>
                        </td>
                        <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>2 Arbeitstage</b></div></td>
                        <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>5 Arbeitstage</b></div></td>
                        <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>9 Arbeitstage</b></div></td>
                    </tr>
                    <tr className={clsx(styles.row, styles.gray)}>
                        <td className={clsx(styles.column, styles.header)}>
                            <div className={clsx(styles.text, styles.leftSide)}>
                                <b>Inhalt Umfang (Monatlich)</b>
                            </div>
                        </td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div>
                        </td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div></td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />
                            </div>
                        </td>
                    </tr>
                    <tr className={clsx(styles.row, styles.gray)}>
                        <td className={clsx(styles.column, styles.header)}>
                            <div className={clsx(styles.text, styles.leftSide)}>
                                <b>Erstellung von Inhalten auf Anfrage</b>
                            </div>
                        </td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div>
                        </td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div></td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div>
                        </td>
                    </tr>
                </table>);

            case `${constants.TABS_ID_PREFIX}3`:
                return (<table className={styles.table}>
                    <tr className={clsx(styles.row, styles.mainTitle)}>
                        <th className={clsx(styles.column, styles.header, styles.notBordered)}></th>
                        <th className={clsx(styles.column)}>
                            <div className={styles.level}>
                                <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.bronze)}></div></div>
                                <div className={styles.title}>Bronze</div>
                                <div className={styles.activeStatus}>Active now</div>
                                <Button title={'Change'} callback={redirectCallback} />
                            </div>
                        </th>
                        <th className={clsx(styles.column)}>
                            <div className={styles.level}>
                                <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.silber)}></div></div>
                                <div className={styles.title}>Silber</div>
                                <div className={styles.activeStatus}></div>
                                <Button title={'Choose'} callback={redirectCallback} />
                            </div>
                        </th>
                        <th className={clsx(styles.column, styles.gold)}>
                            <div className={styles.level}>
                                <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.gold)}></div></div>
                                <div className={styles.title}>Gold</div>
                                <div className={styles.activeStatus}></div>
                                <Button title={'Choose'} callback={redirectCallback} />
                            </div>
                        </th>
                    </tr>

                    <tr className={clsx(styles.row, styles.gray)}>
                        <td className={clsx(styles.column, styles.header)}>
                            <div className={clsx(styles.text, styles.leftSide)}>
                                <b>Zeitaufwand für Autoren von Inhalten (Monatlich)</b>
                            </div>
                        </td>
                        <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>2 Arbeitstage</b></div></td>
                        <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>5 Arbeitstage</b></div></td>
                        <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>9 Arbeitstage</b></div></td>
                    </tr>
                    <tr className={clsx(styles.row, styles.gray)}>
                        <td className={clsx(styles.column, styles.header)}>
                            <div className={clsx(styles.text, styles.leftSide)}>
                                <b>Inhalt Umfang (Monatlich)</b>
                            </div>
                        </td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div>
                        </td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div></td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />
                            </div>
                        </td>
                    </tr>
                    <tr className={clsx(styles.row, styles.gray)}>
                        <td className={clsx(styles.column, styles.header)}>
                            <div className={clsx(styles.text, styles.leftSide)}>
                                <b>Erstellung von Inhalten auf Anfrage</b>
                            </div>
                        </td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div>
                        </td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div></td>
                        <td className={styles.column}>
                            <div className={styles.text}>
                                <b>Langer Inhalt</b><br />
                                (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                <p className={styles.selection}>1 Stück oder</p><br />

                                <b>Kurzer Inhalt</b><br />
                                (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                <p className={styles.selection}>2 Stück oder</p><br />

                                Oder eine Kombination aus diesen Formen
                            </div>
                        </td>
                    </tr>
                </table>);

            default:
                return <></>;
        }
    }
    return <Container classes={styles.container}>
        <Row>
            <Col span={6}>
                <div className={styles.servicesList}>
                    {services.length > 0 && services.map((service, key) => (<ServiceTile service={service} key={key} />))}
                </div>
            </Col>
            <Col span={18}>
                <Tabs tabsPrefix={constants.TABS_ID_PREFIX} activeTab={activeTab} setActiveTab={setActiveTab}>
                    {renderTabContent()}
                </Tabs>
            </Col>
        </Row>
    </Container>
}

export default ServiceListWiget