"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Col from "../../_layout/Col/Col"
import Container from "../../_layout/Container/Container"
import Row from "../../_layout/Row/Row"
import { Tabs } from '../../Tabs/Tabs';
import { Button } from '../../_buttons/Button/Button';
import ServiceTile from '../../_buttons/ServiceTile/ServiceTile';
import Image from 'next/image';
import ServiceTarif from '../../ServiceTarif/ServiceTarif';
import useSendQuery from "@/app/hooks/sendQuery/sendQuery"
import useAnimation from '@/app/hooks/Animation/Animation';
import api from "@/app/api/crud"
import utils from "@/app/utils"
import global from '@/app/constants/global';
import constants from './constants';
import styles from "./servicelistwigets.module.scss"
import "./table.scss"



type Props = {
    services: Array<ExtendedService>,
    current: string | null
}

const ServiceListWiget: React.FC<Props> = ({ services, current }) => {
    const router = useRouter()
    const animationActicate = useAnimation()
    // const [serviceList, setServiceList] = useState<Array<ExtendedService>>(services)
    const [activeTab, setActiveTab] = useState<string>(`${constants.TABS_ID_PREFIX}1`)
    const [scratchLoad, setScratchLoad] = useState(true)
    const [currentService, setCurrentService] = useState<ExtendedService | null>()
    const [tabNames, setTabNames] = useState<Array<string>>(global.TAB_NAMES)
    // const [content, setContent] = useState<React.ReactElement | string>('')
    const { fetchData } = useSendQuery()

    const redirectCallback = () => {
        router.push('/support')
    }

    const loadContent = async (service: ExtendedService) => {
        const tocken = utils.user.getToken()
        let updatedService: ExtendedService = service
        if (tocken && !service?.content && !service?.platform && service?.id) {
            const servicesRes: object = await fetchData(`${api.custom.SERVICE_AGREEMENTS}${service?.id}`, "GET", {}, null, true)
            updatedService = { ...service, ...servicesRes }
            console.log(updatedService);
            // const newServiceList: Array<ExtendedService> = serviceList.reduce((res, serv) => { 
            //     if(serv.id == service.id){
            //         res.push(updatedService)
            //     }
            //     return res;
            // }, [] as Array<ExtendedService>)
            // setServiceList(newServiceList)
        }
        setCurrentService(updatedService)
        activateAnimationProcess();

    }

    useEffect(() => {
        // setContent(renderTabContent())
    }, [currentService])

    const activateAnimationProcess = () => {
        if (window) {
            const content = document.querySelector('.content-container');
            content?.classList.remove('animation-visible')
            if (!scratchLoad)
                content?.setAttribute('style', 'display: none');
            setTimeout(() => {
                content?.removeAttribute('style')
                animationActicate();
            }, 300)
        }
    }

    useEffect(() => {
        activateAnimationProcess()
        // setContent(renderTabContent())
    }, [activeTab])

    useEffect(() => {
        setScratchLoad(false)
    }, [])


    useEffect(() => {
        let chosenService = 0
        if (current) {
            const targetService = services.reduce((target, serv, key) => {
                if (serv.slug == current) {
                    return key
                }
                return target
            }, -1)
            if (targetService > -1) {
                chosenService = targetService
            }
        }
        loadContent(services[chosenService])
        serviceClick(services[chosenService]?.id)
        animationActicate()
    }, [services])



    const serviceClick = async (id: string | number) => {
        const chosen = services.reduce((res, service) => {
            return service.id == id ? service : res
        }, services[0])
        console.log(chosen)
        let tabsList = [global.TAB_NAMES[0]];
        if (chosen?.serviceLevels) {
            tabsList = chosen.serviceLevels.reduce((res, item) => {
                if (item.type == "Inhalt")
                    res.push(global.TAB_NAMES[1])
                if (item.type == "Plattform")
                    res.push(global.TAB_NAMES[2])
                return res;
            }, tabsList)
            setTabNames(global.TAB_NAMES)
        }
        if(chosen && chosen?.slug != current){
            router.push(`/platforms#${chosen.slug}`)
        }
        setTabNames(tabsList)
        setActiveTab(`${constants.TABS_ID_PREFIX}1`)
        loadContent(chosen)
    }

    const renderTabContent = () => {
        // console.log(Object.keys(currentService as object))

        console.log(activeTab)
        console.log(`${constants.TABS_ID_PREFIX}2`)
        switch (activeTab) {
            case `${constants.TABS_ID_PREFIX}1`:
                return <div className='animation-fade-in-top immidiate-show short-duration content-container'>
                    <div className={styles.descriptionSection}>
                        <div className={styles.titleSection}>
                            <div className={styles.title}>
                                {currentService?.title}
                            </div>
                            {!currentService?.serviceLevels || currentService?.serviceLevels?.length == 0 && (
                                <div className={styles.button}><Button title={"Erhalten"} callback={redirectCallback} /></div>
                            )}
                        </div>
                        {currentService?.serviceLevels && currentService?.serviceLevels?.length > 0 ? (
                            <div className={styles.tariffsSection}>
                                <div className={styles.title}>Unterstützungsstufe</div>
                                <div className={styles.tariffsSectionContainer}>
                                    <ServiceTarif serviceLevels={currentService?.serviceLevels as Array<ServiceAgreement>} size={"medium"} />
                                </div>
                            </div>
                        ) : <></>}
                        {currentService?.description && (<div className={styles.text} dangerouslySetInnerHTML={{ __html: currentService.description }} />)}
                    </div>
                </div>;

            case `${constants.TABS_ID_PREFIX}2`:
                // return <div dangerouslySetInnerHTML={{ __html: currentService?.content as string}}></div>
                return (<div className='animation-fade-in-top immidiate-show short-duration content-container ServiceWigetTable'>
                    {currentService?.content ? (
                        <table className={`table ${currentService?.best_choice_content != "null" ? 'bestChoice' + currentService?.best_choice_content : ''}`}>
                            <thead>
                                <tr className={"row mainTitle"}>
                                    <th className={"column header notBordered"}></th>
                                    <th className={"column"}>
                                        <div className={"level"}>
                                            <div className={"image"}><div className={"levelIndicator bronze"}></div></div>
                                            <div className={"title"}>Bronze</div>
                                            <div className={"activeStatus"}>Active now</div>
                                            <Button title={'Change'} callback={redirectCallback} />
                                        </div>
                                    </th>
                                    <th className={"column"}>
                                        <div className={"level"}>
                                            <div className={"image"}><div className={"levelIndicator silber"}></div></div>
                                            <div className={"title"}>Silber</div>
                                            <div className={"activeStatus"}></div>
                                            <Button title={'Choose'} callback={redirectCallback} />
                                        </div>
                                    </th>
                                    <th className={"column"}>
                                        <div className={"level"}>
                                            <div className={"image"}><div className={"levelIndicator gold"}></div></div>
                                            <div className={"title"}>Gold</div>
                                            <div className={"activeStatus"}></div>
                                            <Button title={'Choose'} callback={redirectCallback} />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            {/* <tbody> */}
                            <tbody dangerouslySetInnerHTML={{ __html: currentService?.content as string }}>
                                {/* <tr className={"row gray"}>
                                <td className={"column header"}>
                                    <div className={"text leftSide"}>
                                        <b>Zeitaufwand für Autoren von Inhalten (Monatlich)</b>
                                    </div>
                                </td>
                                <td className={"column middleVertical"}><div className={"text"}><b>2 Arbeitstage</b></div></td>
                                <td className={"column middleVertical"}><div className={"text"}><b>5 Arbeitstage</b></div></td>
                                <td className={"column middleVertical bestChoiceCells"}><div className={"text"}><b>9 Arbeitstage</b></div></td>
                            </tr>
                            <tr className={"row gray"}>
                                <td className={"column header"}>
                                    <div className={"text leftSide"}>
                                        <b>Inhalt Umfang (Monatlich)</b>
                                    </div>
                                </td>
                                <td className={"column"}>
                                    <div className={"text"}>
                                        <b>Langer Inhalt</b><br />
                                        (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                        <p className={"selection"}>1 Stück oder</p><br />

                                        <b>Kurzer Inhalt</b><br />
                                        (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                        <p className={"selection"}>2 Stück oder</p><br />

                                        Oder eine Kombination aus diesen Formen
                                    </div>
                                </td>
                                <td className={"column"}>
                                    <div className={"text"}>
                                        <b>Langer Inhalt</b><br />
                                        (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                        <p className={"selection"}>1 Stück oder</p><br />

                                        <b>Kurzer Inhalt</b><br />
                                        (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                        <p className={"selection"}>2 Stück oder</p><br />

                                        Oder eine Kombination aus diesen Formen
                                    </div></td>
                                <td className={"column bestChoiceCells"}>
                                    <div className={"text"}>
                                        <b>Langer Inhalt</b><br />
                                        (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                        <p className={"selection"}>1 Stück oder</p><br />
                                    </div>
                                </td>
                            </tr>
                            <tr className={"row gray"}>
                                <td className={"column header"}>
                                    <div className={"text leftSide"}>
                                        <b>Erstellung von Inhalten auf Anfrage</b>
                                    </div>
                                </td>
                                <td className={"column"}>
                                    <div className={"text"}>
                                        <b>Langer Inhalt</b><br />
                                        (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                        <p className={"selection"}>1 Stück oder</p><br />

                                        <b>Kurzer Inhalt</b><br />
                                        (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                        <p className={"selection"}>2 Stück oder</p><br />

                                        Oder eine Kombination aus diesen Formen
                                    </div>
                                </td>
                                <td className={"column"}>
                                    <div className={"text"}>
                                        <b>Langer Inhalt</b><br />
                                        (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                        <p className={"selection"}>1 Stück oder</p><br />

                                        <b>Kurzer Inhalt</b><br />
                                        (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                        <p className={"selection"}>2 Stück oder</p><br />

                                        Oder eine Kombination aus diesen Formen
                                    </div></td>
                                <td className={"column bestChoiceCells last"}>
                                    <div className={"text"}>
                                        <b>Langer Inhalt</b><br />
                                        (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                                        <p className={"selection"}>1 Stück oder</p><br />

                                        <b>Kurzer Inhalt</b><br />
                                        (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                                        <p className={"selection"}>2 Stück oder</p><br />

                                        Oder eine Kombination aus diesen Formen
                                    </div>
                                </td>
                            </tr> */}
                            </tbody>
                        </table>
                    ) : (
                        <p>{constants.COMING_SOON_TEXT}</p>
                    )}
                </div>);

            case `${constants.TABS_ID_PREFIX}3`:
                console.log(currentService?.platform)
                // return <div dangerouslySetInnerHTML={{ __html: currentService?.platform as string}}></div>
                return (<div className='animation-fade-in-top immidiate-show short-duration content-container ServiceWigetTable'>
                    {currentService?.platform ? (
                        <table className={`table ${currentService?.best_choice_platform != null ? 'bestChoice' + currentService?.best_choice_platform : ''}`}>
                            <thead>
                                <tr className={clsx("row mainTitle")}>
                                    <th className={"column header notBordered"}></th>
                                    <th className={"column"}>
                                        <div className={"level"}>
                                            <div className={"image"}>
                                                <Image src={"/img/speed_1.svg"} alt={"table_icon_1"} height={49} width={49} />
                                                {/* <div className={clsx(styles.levelIndicator, styles.bronze)}></div> */}
                                            </div>
                                            <div className={"title"}>Bronze</div>
                                            <div className={"activeStatus"}>Active now</div>
                                            <Button title={'Change'} callback={redirectCallback} />
                                        </div>
                                    </th>
                                    <th className={"column"}>
                                        <div className={"level"}>
                                            <div className={"image"}>
                                                <Image src={"/img/speed_2.svg"} alt={"table_icon_2"} height={49} width={49} />
                                                {/* <div className={clsx(styles.levelIndicator, styles.silber)}></div> */}
                                            </div>
                                            <div className={"title"}>Silber</div>
                                            <div className={"activeStatus"}></div>
                                            <Button title={'Choose'} callback={redirectCallback} />
                                        </div>
                                    </th>
                                    <th className={clsx("column gold")}>
                                        <div className={"level"}>
                                            <div className={"image"}>
                                                <Image src={"/img/speed_3.svg"} alt={"table_icon_3"} height={49} width={49} />
                                                {/* <div className={clsx(styles.levelIndicator, styles.gold)}></div> */}
                                            </div>
                                            <div className={"title"}>Gold</div>
                                            <div className={"activeStatus"}></div>
                                            <Button title={'Choose'} callback={redirectCallback} />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody dangerouslySetInnerHTML={{ __html: currentService?.platform as string }}>
                                {/* <tr className={clsx(styles.row, styles.acsentLine)}>
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
                            </tr> */}
                            </tbody>
                        </table>
                    ) : (<p>{constants.COMING_SOON_TEXT}</p>)}
                </div>);

            default:
                return <></>;
        }
    }
    return <Container classes={styles.container}>
        <Row>
            <Col span={6}>
                <div className={styles.servicesList}>
                    {services.length > 0 && services.map((service, key) => (
                        <div key={key} onClick={() => { serviceClick(service.id) }}>
                            <ServiceTile classes={currentService?.id == service.id ? styles.active : ''} service={service} subtitle={service.serviceLevels && service.serviceLevels.length > 0 ? constants.SUBSCRIBTION_TITLE : undefined} />
                        </div>))}
                </div>
            </Col>
            <Col span={18}>
                {currentService && (
                    <Tabs tabNames={tabNames} tabsPrefix={constants.TABS_ID_PREFIX} activeTab={activeTab} setActiveTab={setActiveTab}>
                        {renderTabContent()}
                    </Tabs>
                )}
            </Col>
        </Row>
    </Container>
}

export default ServiceListWiget