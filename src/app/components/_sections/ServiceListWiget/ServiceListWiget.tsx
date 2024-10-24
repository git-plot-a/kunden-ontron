"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Col from "../../_layout/Col/Col"
import Container from "../../_layout/Container/Container"
import Row from "../../_layout/Row/Row"
import { Tabs } from '../../Tabs/Tabs';
import { Button } from '../../_buttons/Button/Button';
import ServiceTile from '../../_buttons/ServiceTile/ServiceTile';
import Image from 'next/image';
import Link from 'next/link';
import constants from './constants';
import styles from "./servicelistwigets.module.scss"
import ServiceTarif from '../../ServiceTarif/ServiceTarif';


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


    const redirectCallback = () => {
        router.push('/support')
    }


    const renderTabContent = () => {
        switch (activeTab) {
            case `${constants.TABS_ID_PREFIX}1`:
                return <div className={styles.descriptionSection}>
                    <div className={styles.titleSection}>
                        <div className={styles.title}>
                            Atlassian Jira
                        </div>
                        <div className={styles.button}><Button title={"Erhalten"} callback={redirectCallback} /></div>
                    </div>
                    <div className={styles.tariffsSection}>
                        <div className={styles.title}>Unterstützungsstufe</div>
                        <div className={styles.tariffsSectionContainer}>
                            <ServiceTarif serviceLevels={[{ type: 'Platform', value: 'Silber' }, { type: 'Inhalt', value: 'Gold' }]} />
                        </div>
                    </div>
                    <div className={styles.text}>
                        <h4>
                            Zweck
                        </h4>
                        <p>Confluence ist ein Kollaborationswerkzeug, das unsere Teams bei der Erstellung, Genehmigung und gemeinsamen Bearbeitung von Projekten und Dokumentationen unterstützt. Es dient als zentrale Wissensdatenbank und Content-Management-System für ontron.</p>
                        <h4>
                            Key Features
                        </h4>
                        <p>
                            <ul>
                                <li>
                                    Erstellung von Inhalten: Bietet Rich-Text-Bearbeitungsfunktionen für die Erstellung von Seiten, Wikis und Blogs
                                </li>
                                <li>Zusammenarbeit im Team: Ermöglicht es mehreren Benutzern, in Echtzeit an Dokumenten zusammenzuarbeiten</li>
                                <li>Vorlagen: Bietet eine Vielzahl von Vorlagen für die Erstellung von konsistenter Dokumentation, Besprechungsnotizen, Produktanforderungen und mehr</li>
                                <li>Seitenhierarchien: Organisiert Inhalte in einer hierarchischen Struktur, die das Navigieren und Verwalten erleichtert</li>
                                <li>Integrationsmöglichkeiten: Nahtlose Integration mit anderen Atlassian-Produkten wie Jira und externen Tools wie O365 und Miro</li>
                                <li>Suche und Archivierung: Leistungsstarke Suchfunktionen zum schnellen Auffinden von Inhalten und die Möglichkeit, veraltete Seiten zu archivieren
                                </li>
                            </ul>
                        </p>
                        <h4>Hosting Standort</h4>
                        <p>Europäische Union</p>
                        <h4>Support Standort</h4>
                        <p>Australien</p>
                        <h4>Support Standort</h4>
                        <p><Link href={'/'}>Confluence Cloud resources | Confluence Cloud | Atlassian Support</Link></p>
                    </div>
                </div>;

            case `${constants.TABS_ID_PREFIX}2`:
                return (<div>
                    <table className={styles.table}>
                        <thead>
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
                                <th className={clsx(styles.column, styles.bestChoice, styles.bestChoiceCells)}>
                                    <div className={styles.level}>
                                        <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.gold)}></div></div>
                                        <div className={styles.title}>Gold</div>
                                        <div className={styles.activeStatus}></div>
                                        <Button title={'Choose'} callback={redirectCallback} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={clsx(styles.row, styles.gray)}>
                                <td className={clsx(styles.column, styles.header)}>
                                    <div className={clsx(styles.text, styles.leftSide)}>
                                        <b>Zeitaufwand für Autoren von Inhalten (Monatlich)</b>
                                    </div>
                                </td>
                                <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>2 Arbeitstage</b></div></td>
                                <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>5 Arbeitstage</b></div></td>
                                <td className={clsx(styles.column, styles.middleVertical, styles.bestChoiceCells)}><div className={styles.text}><b>9 Arbeitstage</b></div></td>
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
                                <td className={clsx(styles.column, styles.bestChoiceCells)}>
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
                                <td className={clsx(styles.column, styles.bestChoiceCells, styles.last)}>
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
                        </tbody>
                    </table></div>);

            case `${constants.TABS_ID_PREFIX}3`:
                return (<table className={styles.table}>
                    <thead>
                        <tr className={clsx(styles.row, styles.mainTitle)}>
                            <th className={clsx(styles.column, styles.header, styles.notBordered)}></th>
                            <th className={clsx(styles.column)}>
                                <div className={styles.level}>
                                    <div className={styles.image}>
                                        <Image src={"/img/speed_1.svg"} alt={"table_icon_1"} height={49} width={49} />
                                        {/* <div className={clsx(styles.levelIndicator, styles.bronze)}></div> */}
                                    </div>
                                    <div className={styles.title}>Bronze</div>
                                    <div className={styles.activeStatus}>Active now</div>
                                    <Button title={'Change'} callback={redirectCallback} />
                                </div>
                            </th>
                            <th className={clsx(styles.column)}>
                                <div className={styles.level}>
                                    <div className={styles.image}>
                                        <Image src={"/img/speed_2.svg"} alt={"table_icon_2"} height={49} width={49} />
                                        {/* <div className={clsx(styles.levelIndicator, styles.silber)}></div> */}
                                    </div>
                                    <div className={styles.title}>Silber</div>
                                    <div className={styles.activeStatus}></div>
                                    <Button title={'Choose'} callback={redirectCallback} />
                                </div>
                            </th>
                            <th className={clsx(styles.column, styles.gold)}>
                                <div className={styles.level}>
                                    <div className={styles.image}>
                                        <Image src={"/img/speed_3.svg"} alt={"table_icon_3"} height={49} width={49} />
                                        {/* <div className={clsx(styles.levelIndicator, styles.gold)}></div> */}
                                    </div>
                                    <div className={styles.title}>Gold</div>
                                    <div className={styles.activeStatus}></div>
                                    <Button title={'Choose'} callback={redirectCallback} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={clsx(styles.row, styles.acsentLine)}>
                            <td className={styles.column}>
                                <div className={styles.text}><b>Notfall</b> (P1)</div>
                            </td>
                            <td className={styles.column}></td>
                            <td className={styles.column}></td>
                            <td className={styles.column}></td>
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
                    </tbody>
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