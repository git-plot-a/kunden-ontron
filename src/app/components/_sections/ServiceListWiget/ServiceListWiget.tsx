"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import clsx from 'clsx';
import Col from "../../_layout/Col/Col"
import Container from "../../_layout/Container/Container"
import Row from "../../_layout/Row/Row"
import { Tabs } from '../../Tabs/Tabs';
import { Button } from '../../_buttons/Button/Button';
import ServiceTile from '../../_buttons/ServiceTile/ServiceTile';
// import Image from 'next/image';
import constants from './constants';
import useAnimation from '@/app/hooks/Animation/Animation';
import styles from "./servicelistwigets.module.scss"
import ServiceTarif from '../../ServiceTarif/ServiceTarif';
import useSendQuery from "@/app/hooks/sendQuery/sendQuery"
import api from "@/app/api/crud"
import utils from "@/app/utils"

interface ExtendedService extends Service {
    id: string | number,
    description?: string,
    platform? : string | undefined,
    content?: string | undefined
}


type Props = {
    services: Array<ExtendedService>
}

const ServiceListWiget: React.FC<Props> = ({ services }) => {
    const router = useRouter()
    const animationActicate = useAnimation()
    const [serviceList, setServiceList] = useState<Array<ExtendedService>>(services)
    const [activeTab, setActiveTab] = useState<string>(`${constants.TABS_ID_PREFIX}1`)
    const [scratchLoad, setScratchLoad] = useState(true)
    const [currentService, setCurrentService] = useState<ExtendedService | null>()
    const [tabNames, setTabNames] = useState<Array<string>>(constants.TAB_NAMES)
    const { fetchData } = useSendQuery()

    const redirectCallback = () => {
        router.push('/support')
    }

    const loadContent = async (service: ExtendedService) =>{
        const tocken = utils.user.getToken()
        let updatedService: ExtendedService = service
        if(tocken && !service?.content && !service?.platform && service?.id){
            const servicesRes: object  =  await fetchData(`${api.custom.SERVICE_AGREEMENTS}${service?.id}`, "GET", {}, null, true)
            updatedService = {...service, ...servicesRes}
            const newServiceList: Array<ExtendedService> = serviceList.reduce((res, serv) => { 
                if(serv.id == service.id){
                    res.push(updatedService)
                }
                return res;
            }, [] as Array<ExtendedService>)
            setServiceList(newServiceList)
        }
        setCurrentService(updatedService)
        activateAnimationProcess();
            
    }

    useEffect(()=>{
        console.log(currentService)
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
    }, [activeTab])

    useEffect(() => {
        setScratchLoad(false)
    }, [])


    useEffect(()=>{
        setServiceList(services)
        loadContent(services[0])
        // setCurrentService()
        animationActicate()
    }, [services])


    const serviceClick = async (id: string | number) => {
        const chosen = services.reduce((res, service) => {
            return service.id == id ? service : res
        }, services[0])
        console.log(chosen)
        let tabsList = [constants.TAB_NAMES[0]];
        if (chosen.serviceLevels) {
            tabsList = chosen.serviceLevels.reduce((res, item)=> {
                if(item.type=="Inhalt")
                    res.push(constants.TAB_NAMES[1])
                if(item.type=="Plattformen")
                    res.push(constants.TAB_NAMES[2])
                return res;
            }, tabsList)
            setTabNames(constants.TAB_NAMES)
        }
        setActiveTab(`${constants.TABS_ID_PREFIX}1`)
        loadContent(chosen)
        console.log(chosen)
        console.log(`${api.custom.SERVICE_AGREEMENTS}/${chosen.id}`)
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case `${constants.TABS_ID_PREFIX}1`:
                return <div className='animation-fade-in-top immidiate-show short-duration content-container'>
                    <div className={styles.descriptionSection}>
                        <div className={styles.titleSection}>
                            <div className={styles.title}>
                                Atlassian Jira
                            </div>
                            {!currentService?.serviceLevels && (
                                <div className={styles.button}><Button title={"Erhalten"} callback={redirectCallback} /></div>
                            )}
                        </div>
                        {currentService?.serviceLevels ? (
                            <div className={styles.tariffsSection}>
                                <div className={styles.title}>Unterstützungsstufe</div>
                                <div className={styles.tariffsSectionContainer}>
                                    <ServiceTarif serviceLevels={currentService?.serviceLevels as Array<ServiceAgreement>} />
                                </div>
                            </div>
                        ) : <></>}
                        {currentService?.description && (<div className={styles.text} dangerouslySetInnerHTML={{ __html: currentService.description }} />)}
                    </div>
                </div>;

            case `${constants.TABS_ID_PREFIX}2`:
                return <div dangerouslySetInnerHTML={{ __html: currentService?.content as string}}></div>
                // return (<div className='animation-fade-in-top immidiate-show short-duration content-container'>
                //     <table className={styles.table}>
                //         <thead>
                //             <tr className={clsx(styles.row, styles.mainTitle)}>
                //                 <th className={clsx(styles.column, styles.header, styles.notBordered)}></th>
                //                 <th className={clsx(styles.column)}>
                //                     <div className={styles.level}>
                //                         <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.bronze)}></div></div>
                //                         <div className={styles.title}>Bronze</div>
                //                         <div className={styles.activeStatus}>Active now</div>
                //                         <Button title={'Change'} callback={redirectCallback} />
                //                     </div>
                //                 </th>
                //                 <th className={clsx(styles.column)}>
                //                     <div className={styles.level}>
                //                         <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.silber)}></div></div>
                //                         <div className={styles.title}>Silber</div>
                //                         <div className={styles.activeStatus}></div>
                //                         <Button title={'Choose'} callback={redirectCallback} />
                //                     </div>
                //                 </th>
                //                 <th className={clsx(styles.column, styles.bestChoice, styles.bestChoiceCells)}>
                //                     <div className={styles.level}>
                //                         <div className={styles.image}><div className={clsx(styles.levelIndicator, styles.gold)}></div></div>
                //                         <div className={styles.title}>Gold</div>
                //                         <div className={styles.activeStatus}></div>
                //                         <Button title={'Choose'} callback={redirectCallback} />
                //                     </div>
                //                 </th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             <tr className={clsx(styles.row, styles.gray)}>
                //                 <td className={clsx(styles.column, styles.header)}>
                //                     <div className={clsx(styles.text, styles.leftSide)}>
                //                         <b>Zeitaufwand für Autoren von Inhalten (Monatlich)</b>
                //                     </div>
                //                 </td>
                //                 <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>2 Arbeitstage</b></div></td>
                //                 <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>5 Arbeitstage</b></div></td>
                //                 <td className={clsx(styles.column, styles.middleVertical, styles.bestChoiceCells)}><div className={styles.text}><b>9 Arbeitstage</b></div></td>
                //             </tr>
                //             <tr className={clsx(styles.row, styles.gray)}>
                //                 <td className={clsx(styles.column, styles.header)}>
                //                     <div className={clsx(styles.text, styles.leftSide)}>
                //                         <b>Inhalt Umfang (Monatlich)</b>
                //                     </div>
                //                 </td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div>
                //                 </td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div></td>
                //                 <td className={clsx(styles.column, styles.bestChoiceCells)}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />
                //                     </div>
                //                 </td>
                //             </tr>
                //             <tr className={clsx(styles.row, styles.gray)}>
                //                 <td className={clsx(styles.column, styles.header)}>
                //                     <div className={clsx(styles.text, styles.leftSide)}>
                //                         <b>Erstellung von Inhalten auf Anfrage</b>
                //                     </div>
                //                 </td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div>
                //                 </td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div></td>
                //                 <td className={clsx(styles.column, styles.bestChoiceCells, styles.last)}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div>
                //                 </td>
                //             </tr>
                //         </tbody>
                //     </table></div>);

            case `${constants.TABS_ID_PREFIX}3`:
                return <div dangerouslySetInnerHTML={{ __html: currentService?.platform as string}}></div>
                // return (<div className='animation-fade-in-top immidiate-show short-duration content-container'>
                //     <table className={styles.table}>
                //         <thead>
                //             <tr className={clsx(styles.row, styles.mainTitle)}>
                //                 <th className={clsx(styles.column, styles.header, styles.notBordered)}></th>
                //                 <th className={clsx(styles.column)}>
                //                     <div className={styles.level}>
                //                         <div className={styles.image}>
                //                             <Image src={"/img/speed_1.svg"} alt={"table_icon_1"} height={49} width={49} />
                //                             {/* <div className={clsx(styles.levelIndicator, styles.bronze)}></div> */}
                //                         </div>
                //                         <div className={styles.title}>Bronze</div>
                //                         <div className={styles.activeStatus}>Active now</div>
                //                         <Button title={'Change'} callback={redirectCallback} />
                //                     </div>
                //                 </th>
                //                 <th className={clsx(styles.column)}>
                //                     <div className={styles.level}>
                //                         <div className={styles.image}>
                //                             <Image src={"/img/speed_2.svg"} alt={"table_icon_2"} height={49} width={49} />
                //                             {/* <div className={clsx(styles.levelIndicator, styles.silber)}></div> */}
                //                         </div>
                //                         <div className={styles.title}>Silber</div>
                //                         <div className={styles.activeStatus}></div>
                //                         <Button title={'Choose'} callback={redirectCallback} />
                //                     </div>
                //                 </th>
                //                 <th className={clsx(styles.column, styles.gold)}>
                //                     <div className={styles.level}>
                //                         <div className={styles.image}>
                //                             <Image src={"/img/speed_3.svg"} alt={"table_icon_3"} height={49} width={49} />
                //                             {/* <div className={clsx(styles.levelIndicator, styles.gold)}></div> */}
                //                         </div>
                //                         <div className={styles.title}>Gold</div>
                //                         <div className={styles.activeStatus}></div>
                //                         <Button title={'Choose'} callback={redirectCallback} />
                //                     </div>
                //                 </th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             <tr className={clsx(styles.row, styles.acsentLine)}>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}><b>Notfall</b> (P1)</div>
                //                 </td>
                //                 <td className={styles.column}></td>
                //                 <td className={styles.column}></td>
                //                 <td className={styles.column}></td>
                //             </tr>
                //             <tr className={clsx(styles.row, styles.gray)}>
                //                 <td className={clsx(styles.column, styles.header)}>
                //                     <div className={clsx(styles.text, styles.leftSide)}>
                //                         <b>Zeitaufwand für Autoren von Inhalten (Monatlich)</b>
                //                     </div>
                //                 </td>
                //                 <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>2 Arbeitstage</b></div></td>
                //                 <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>5 Arbeitstage</b></div></td>
                //                 <td className={clsx(styles.column, styles.middleVertical)}><div className={styles.text}><b>9 Arbeitstage</b></div></td>
                //             </tr>
                //             <tr className={clsx(styles.row, styles.gray)}>
                //                 <td className={clsx(styles.column, styles.header)}>
                //                     <div className={clsx(styles.text, styles.leftSide)}>
                //                         <b>Inhalt Umfang (Monatlich)</b>
                //                     </div>
                //                 </td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div>
                //                 </td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div></td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />
                //                     </div>
                //                 </td>
                //             </tr>
                //             <tr className={clsx(styles.row, styles.gray)}>
                //                 <td className={clsx(styles.column, styles.header)}>
                //                     <div className={clsx(styles.text, styles.leftSide)}>
                //                         <b>Erstellung von Inhalten auf Anfrage</b>
                //                     </div>
                //                 </td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div>
                //                 </td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div></td>
                //                 <td className={styles.column}>
                //                     <div className={styles.text}>
                //                         <b>Langer Inhalt</b><br />
                //                         (1,5 Seiten Text + 2 Abbildungen pro Artikel):<br />
                //                         <p className={styles.selection}>1 Stück oder</p><br />

                //                         <b>Kurzer Inhalt</b><br />
                //                         (bis zu 0,7 Seiten Text + 1 Illustration pro Artikel):<br />
                //                         <p className={styles.selection}>2 Stück oder</p><br />

                //                         Oder eine Kombination aus diesen Formen
                //                     </div>
                //                 </td>
                //             </tr>
                //         </tbody>
                //     </table>
                // </div>);

            default:
                return <></>;
        }
    }
    return <Container classes={styles.container}>
        <Row>
            <Col span={6}>
                <div className={styles.servicesList}>
                    {serviceList.length > 0 && serviceList.map((service, key) => (
                        <div key={key} onClick={() => { serviceClick(service.id) }}>
                            <ServiceTile service={service} subtitle={service.serviceLevels ? constants.SUBSCRIBTION_TITLE : undefined} />
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