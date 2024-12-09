import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Container from '../../_layout/Container/Container';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import Row from '../../_layout/Row/Row';
import { Button } from '../../_buttons/Button/Button';
import utils from '@/app/utils';
import Col from '../../_layout/Col/Col';
import DropDownListMinimized from '../../DropDownList/DropDownListMinimized';
import useAnimation from '@/app/hooks/Animation/Animation';
import styles from './reportPage.module.scss'
import constants from "./constants"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

ChartJS.defaults.font = {
    family: "Poppins, sans-serif",
    size: 14,
    weight: 300,
    lineHeight: 1.5,
};

const ReportPagePart = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [periodType, setPeriodType] = useState(constants.PERIOD_TYPES[1])
    const [result, setResult] = useState<NestedObject>({})
    const [priorities, setPriorities] = useState<DropDownListItems[]>([])
    const [requestTypes, setRequesTypes] = useState<DropDownListItems[]>([])
    const [avarageTimeProprityValue, setAvarageTimeProprityValue] = useState<string>('')
    const [avarageTimeTypeValue, setAvarageTimeTypeValue] = useState<string>('')
    const animationActivation = useAnimation()
    //how many equest were solved, how many were solven on time
    const [resolvedQuantity, setResolvedQuantity] = useState(constants.OPTIONS_BAR.data)
    //requests types deviation
    const [requestTypesData, setResuestTypesData] = useState(constants.DOUGHNUT.data)
    //requests quantity
    const [generalResuestQunatity, setGeneralRequestQuantity] = useState(constants.LINE_EXUMAPLE2.data)
    //avarage time for resolution
    const [avarageTimeVal, setAvarageTimeVal] = useState(constants.OPTIONS_BAR_SMALL.data)

    //options form template
    const optionsDoughnut: ChartOptions<'doughnut'> = constants.DOUGHNUT.options as ChartOptions<'doughnut'>
    const exumpleLine2Options: ChartOptions<'line'> = constants.LINE_EXUMAPLE2.options as ChartOptions<'line'>
    const optionsBar: ChartOptions<'bar'> = constants.OPTIONS_BAR.options as ChartOptions<'bar'>
    const smalloptionsBar: ChartOptions<'bar'> = constants.OPTIONS_BAR_SMALL.options as ChartOptions<'bar'>

    //data processing functions for diagrams
    const typesProccess = (resultData: NestedObject) => {
        const startDate = utils.culculations.getStartDate(periodType.slug)
        const now = new Date()
        if (Array.isArray(resultData?.issues)) {
            const res = resultData?.issues?.reduce((list, item) => {
                const createdDate = gerCurrentData((item?.fields as NestedObject)?.created as string)
                if (startDate && createdDate && createdDate > startDate && createdDate <= now) {
                    const typeData = ((item?.fields as NestedObject).customfield_10010 as NestedObject)?.requestType as NestedObject
                    if (typeData?.id) {
                        list.push(typeData?.id as string)
                    }
                }
                return list
            }, [] as Array<string | number>)
            const labels: string[] = []
            const typesData = res.reduce((dt, item) => {
                const needed_type = constants.REQUEST_TYPES.filter(type => type.value == item);
                let index = -1;
                if (needed_type.length > 0) {
                    if (!labels.includes(needed_type[0].title)) {
                        labels.push(needed_type[0].title as string)
                        dt.push(0)
                        index = labels.length - 1;

                    } else {
                        index = labels.indexOf(needed_type[0].title as string)
                    }
                }
                if (index > -1) {
                    dt[index]++;
                }
                return dt
            }, [] as number[])

            setResuestTypesData({
                ...requestTypesData,
                labels: labels,
                datasets: [
                    { ...requestTypesData.datasets[0], data: typesData },
                ]
            });
        }
    }

    const resolutionQuantity = (resultData: NestedObject) => {
        const labels: string[] = []
        const notOnTimeResolved: number[] = []
        const onTimeResolved: number[] = []
        const addToPeriod = (startInterval: Date, finishInterval: Date, intervalName: string) => {
            let resolvedNotOnTimeQuantity: number = 0,
                resolvedOnTimeQuantity: number = 0
            if (Array.isArray(resultData?.issues)) {
                resultData?.issues?.forEach((item) => {
                    const resolution: Date = gerCurrentData((item?.fields as NestedObject).resolutiondate as string)
                    if (resolution >= startInterval && resolution <= finishInterval) {
                        const timeleft: number = ((((item?.fields as NestedObject)?.customfield_10227 as NestedObject)?.completedCycles as NestedObject[])[0]?.remainingTime as NestedObject)?.millis as number
                        if (timeleft < 0) {
                            resolvedNotOnTimeQuantity++
                        } else {
                            resolvedOnTimeQuantity++
                        }
                    }
                })
            }
            notOnTimeResolved.push(resolvedNotOnTimeQuantity)
            onTimeResolved.push(resolvedOnTimeQuantity)
            labels.push(intervalName);

        }

        divideData(periodType.slug, constants.TIMELINE_INTERVAL[0], addToPeriod)

        setResolvedQuantity({
            ...resolvedQuantity,
            labels: labels,
            datasets: [
                { ...resolvedQuantity.datasets[1], data: onTimeResolved, label: constants.RESOLVED_ON_TIME_TITLE },
                { ...resolvedQuantity.datasets[0], data: notOnTimeResolved, label: constants.RESOLVED_NOT_ON_TIME_TITLE },
            ]
        });
    }


    const generalQuantity = (resultData: NestedObject) => {
        const labels: string[] = []
        const quantity: number[] = []
        const addToPeriod = (startInterval: Date, finishInterval: Date, intervalName: string) => {
            let preiodQuantity: number = 0
            if (Array.isArray(resultData?.issues)) {
                resultData?.issues?.forEach((item) => {
                    const createdDate: Date = gerCurrentData((item?.fields as NestedObject).created as string)
                    if (createdDate > startInterval && createdDate <= finishInterval) {
                        preiodQuantity++
                    }
                })
            }
            quantity.push(preiodQuantity)
            labels.push(intervalName)
        }
        divideData(periodType.slug, constants.TIMELINE_INTERVAL[0], addToPeriod)
        setGeneralRequestQuantity({
            ...generalResuestQunatity,
            labels: labels,
            datasets: [{
                ...generalResuestQunatity.datasets[0],
                data: quantity,
                label: "Requests in this period"
            }]
        })
    }

    const avarageTime = (resultData: NestedObject) => {
        const labels: string[] = []
        const time: number[] = []
        const addToPeriod = (startInterval: Date, finishInterval: Date, intervalName: string) => {
            const timeValues: number[] = []
            if (Array.isArray(resultData?.issues)) {
                resultData?.issues?.forEach((item) => {
                    const currentType = ((item?.fields as NestedObject).customfield_10010 as NestedObject)?.requestType as NestedObject
                    const currentPriority = (item?.fields as NestedObject).priority as NestedObject
                    const status = ((item?.fields as NestedObject).status as NestedObject)?.id as number
                    const currentTime = utils.culculations.firstResponceTimeInMilliseconds(item)
                    const created: Date = gerCurrentData((item?.fields as NestedObject).created as string)
                    if (currentTime &&
                        status &&
                        status != 10199 &&
                        created >= startInterval &&
                        created <= finishInterval &&
                        currentType?.id == avarageTimeTypeValue &&
                        currentPriority?.id == avarageTimeProprityValue
                    ) {
                        timeValues.push(millisToHours(currentTime))
                    }
                })
            }
            time.push(calculateAverage(timeValues))
            labels.push(intervalName)
        }
        divideData(periodType.slug, constants.TIMELINE_INTERVAL[0], addToPeriod)
        setAvarageTimeVal({
            ...avarageTimeVal,
            labels: labels,
            datasets: [{
                ...avarageTimeVal.datasets[0],
                data: time,
                label: constants.AVERAGE_TIME
            }]
        })


    }


    const gerCurrentData = (value: string) => {
        const createdDate: Date = new Date(value)
        createdDate.setHours(0);
        createdDate.setMinutes(0);
        createdDate.setSeconds(0);
        createdDate.setMilliseconds(0);
        return createdDate
    }
    //general functons
    const calculateSumm = (numbers: number[]): number => {
        if (numbers.length === 0) {
            return 0
        }

        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return sum
    }

    const calculateAverage = (numbers: number[]): number => {
        const sum = calculateSumm(numbers)
        if (numbers.length > 0) {
            return sum / numbers.length;
        }
        return 0
    }

    const millisToHours = (millis: number): number => {
        const hours = millis / (1000 * 60 * 60);
        return hours;
    }

    const setDropdownLists = (resultData: NestedObject, selectedPeriodType: string = periodType.slug) => {
        const startDate = utils.culculations.getStartDate(selectedPeriodType)
        const now = new Date();
        const prioritiesList: DropDownListItems[] = []
        const requestTypeList: DropDownListItems[] = []
        if (Array.isArray(resultData?.issues)) {
            resultData?.issues?.forEach((item) => {
                const createdDate = gerCurrentData((item?.fields as NestedObject)?.created as string)
                if (createdDate &&
                    createdDate > (startDate as Date) &&
                    createdDate <= now
                ) {
                    const currentStatus: number = ((item?.changelog as NestedObject)?.histories as NestedObject)?.id as number
                    if (currentStatus != 10199) {
                        console.log(item)

                        const currentPrioritiy: NestedObject = ((item?.fields as NestedObject)?.priority as NestedObject) as NestedObject
                        const currentType: NestedObject = ((item?.fields as NestedObject)?.customfield_10010 as NestedObject)?.requestType as NestedObject
                        if (currentPrioritiy && prioritiesList.filter(priority => priority.value == currentPrioritiy.id).length == 0) {
                            const localName = constants.PRIORITIES.filter(priority => priority.value == currentPrioritiy.id)
                            prioritiesList.push({
                                title: (localName.length > 0 ? localName[0].title : currentPrioritiy.name) as string,
                                value: currentPrioritiy.id as string
                            })

                        }
                        if (currentType && requestTypeList.filter(type => type.value == currentType.id).length == 0) {
                            const localName = constants.REQUEST_TYPES.filter(type => type.value == currentType.id)
                            requestTypeList.push({
                                title: (localName.length > 0 ? localName[0].title : currentType.name) as string,
                                value: currentType.id as string
                            })
                        }
                    }
                }
            })
        }
        if (prioritiesList.filter(val => avarageTimeProprityValue == val.value).length == 0) {
            setAvarageTimeProprityValue(prioritiesList[0]?.value)
        }
        if (requestTypeList.filter(val => avarageTimeTypeValue == val.value).length == 0) {
            setAvarageTimeTypeValue(requestTypeList[0]?.value)
        }
        setPriorities(prioritiesList)
        setRequesTypes(requestTypeList)
    }


    const updateAllDateDiagrams = (resultData: NestedObject) => {
        typesProccess(resultData)
        resolutionQuantity(resultData)
        generalQuantity(resultData)
        setDropdownLists(resultData)
        avarageTime(resultData)
    }

    useEffect(() => {
        setLoading(true);
        const loadDiagramData = async () => {
            const userData = utils.user.getUserData();
            let email = undefined
            const includesPrivilagedRoles = utils.culculations.checkRoles()
            if (!includesPrivilagedRoles) {
                email = userData.user_email
            }
            const data: object = {
                project: userData.project,
                fields: 'customfield_10010,status,resolutiondate,customfield_10228,customfield_10227,created,priority,summary',
                userEmail: email
            }

            const resultData: NestedObject = await utils.jira.apiRequest(data, "GET")
            if (resultData && (resultData.issues as NestedObject[])?.length > 0) {
                setResult(resultData)
                setTimeout(() => {
                    updateAllDateDiagrams(resultData)
                }, 300)
            }

            setLoading(false)
            setTimeout(() => {
                animationActivation()
            }, 500)
        }
        loadDiagramData()
    }, [])

    useEffect(() => {
        avarageTime(result)
    }, [avarageTimeProprityValue, avarageTimeTypeValue])



    const divideData = (period: string,
        interval: string,
        callback: (startInterval: Date, finishInterval: Date, name: string) => void) => {
        const startPeriodDate = utils.culculations.getStartDate(period)
        if (!startPeriodDate) return;

        const now = new Date();

        const formatDate = (date: Date): string =>
            date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                // year: 'numeric',
            });

        switch (interval) {
            case constants.TIMELINE_INTERVAL[0]: {
                const currentDate = new Date(startPeriodDate);
                while (currentDate <= now) {
                    const prevData = new Date(currentDate.getTime())
                    currentDate.setDate(currentDate.getDate() + 1);
                    callback(prevData, currentDate, formatDate(currentDate))
                }
                break;
            }
            case constants.TIMELINE_INTERVAL[1]: {
                const currentDate = new Date(startPeriodDate);
                while (currentDate <= now) {
                    const prevData = new Date(currentDate.getTime())
                    currentDate.setDate(currentDate.getDate() + 7);
                    callback(prevData, currentDate, `Week of ${formatDate(currentDate)}`)
                }
                break;
            }
            case constants.TIMELINE_INTERVAL[2]: {
                const currentDate = new Date(startPeriodDate);
                while (currentDate <= now) {
                    const prevData = new Date(currentDate.getTime())
                    currentDate.setMonth(currentDate.getMonth() + 1);
                    callback(prevData, currentDate, formatDate(currentDate))
                }
                break;
            }
            case constants.TIMELINE_INTERVAL[3]: {
                const currentDate = new Date(startPeriodDate);
                while (currentDate <= now) {
                    const prevData = new Date(currentDate.getTime())
                    currentDate.setFullYear(currentDate.getFullYear() + 1);
                    callback(prevData, currentDate, formatDate(currentDate))
                }
                break;
            }
        }

    };


    const switchPeriod = (selectedPeriodType: string) => {
        const selectedPeriod = constants.PERIOD_TYPES.filter((type) => type.slug == selectedPeriodType)
        if (selectedPeriod.length > 0) {
            setPeriodType(selectedPeriod[0])
            setDropdownLists(result, selectedPeriod[0].slug)
        }
    }

    const countByDate = (ticketsArray: NestedObject[], condition: (item: NestedObject) => boolean) => {
        const startDate = utils.culculations.getStartDate(periodType.slug)
        if (Array.isArray(ticketsArray) && ticketsArray.length > 0) {
            const res = ticketsArray.reduce((res: NestedObject[], item) => {
                const created = new Date((item.fields as NestedObject)?.created as string)
                if (created && startDate && created >= startDate && condition(item)) {
                    res.push(item)
                }
                return res
            }, [])
            return res.length
        }
        return 0;
    }

    const resolvedCondition = (item: NestedObject) => {
        return (item.fields as NestedObject)?.resolutiondate !== null
    }

    const ticketInPocess = (item: NestedObject) => {
        const firstResponce = ((item.fields as NestedObject)?.customfield_10228 as NestedObject).completedCycles as NestedObject[]
        return (item.fields as NestedObject)?.resolutiondate == null && firstResponce && firstResponce.length > 0
    }

    const WaitingForAnswer = (item: NestedObject) => {
        const firstResponce = ((item.fields as NestedObject)?.customfield_10228 as NestedObject).completedCycles as NestedObject[]
        return (item.fields as NestedObject)?.resolutiondate == null && firstResponce && firstResponce.length == 0
    }

    useEffect(() => {
        updateAllDateDiagrams(result as NestedObject)
        animationActivation()
    }, [periodType])


    const redirectLink = (status: string = '') => {
        const period = periodType.slug
        let link = `/task-tracking`
        if (period || status) {
            link += '?'
            if (period) {
                link += `period=${period}`
                if (status) {
                    link += `&sort=${status}`
                }
            } else {
                if (status) {
                    link += `sort=${status}`
                }
            }
        }
        router.push(link)

    }

    return <Container classes={styles.mainContainer}>{loading ?
        (
            <div className={clsx(styles.title, styles.loading, "animation-fade-in", "short-duration")}>{constants.LOADING_IS_IN_PROCESS}</div>
        ) : (Array.isArray((result as NestedObject)?.issues) && ((result as NestedObject)?.issues as NestedObject[]).length > 0 ? (
            <>
                <Row>
                    <Col span={24}>
                        <div className={styles.finterButtonsContainer}>
                            {constants.PERIOD_TYPES.map((period, key) => (
                                <Button title={period.title} key={key}
                                    callback={() => { switchPeriod(period.slug) }}
                                    classes={clsx(styles.button, periodType.slug == period.slug ? styles.active : '',)} />
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className={clsx(styles.diagramContainer, styles.small)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-center' }}>
                            <div className={styles.diagramTitle}>{"Allgemeine Statistik"}</div>
                            <div className={clsx(styles.diagramItem, styles.diagramItemDounat)} style={{ width: '100%', height: '486px', marginTop: '-85px' }}>
                                <div className={styles.NumbersConatiner}>
                                    {result.issues && (
                                        <div className={styles.valueItem} onClick={() => { redirectLink() }}>
                                            <div className={styles.valueTitle}>{constants.TOTAL_NUMBER}</div>
                                            <div className={styles.value}>{String(countByDate(result.issues as NestedObject[], () => true))}</div>
                                        </div>
                                    )}
                                    {result.issues && (
                                        <div className={styles.valueItem} onClick={() => { redirectLink('opened') }}>
                                            <div className={styles.valueTitle}>{constants.TOTAL_NUMBER_OPENED}</div>
                                            <div className={styles.value}>{String(countByDate(result.issues as NestedObject[], WaitingForAnswer) + countByDate(result.issues as NestedObject[], ticketInPocess))}</div>
                                        </div>
                                    )}
                                    {result.issues && (
                                        <div className={styles.valueItem} onClick={() => { redirectLink('resolved') }}>
                                            <div className={styles.valueTitle}>{constants.RESOLVED_TICKETS}</div>
                                            <div className={styles.value}>{String(countByDate(result.issues as NestedObject[], resolvedCondition))}</div>
                                        </div>
                                    )}
                                    {/* {result.issues && (
                                        <div className={styles.valueItem} >
                                            <div className={styles.valueTitle}>In process number:</div>
                                            <div className={styles.value}>{String(countByDate(result.issues as NestedObject[], ticketInPocess))}</div>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={clsx(styles.diagramContainer, styles.small)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-center' }}>
                            <div className={styles.diagramTitle}>{constants.REQUEST_TYES_DESTRIBUTIONS_TITLE}</div>
                            <div className={clsx(styles.diagramItem, styles.diagramItemDounat)} style={{ width: '100%', height: '486px', marginTop: '-85px' }}>
                                {requestTypesData.datasets?.length > 0 && requestTypesData.datasets[0]?.data?.length > 0 && calculateSumm(requestTypesData.datasets[0]?.data) > 0 ? (
                                    <Doughnut data={requestTypesData} options={optionsDoughnut} />
                                ) : (
                                    <div className={styles.noData} style={{ marginTop: '85px' }}>
                                        {constants.NOT_ENOUGH_DATA_FOR_DAIAGRAM}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={clsx(styles.diagramContainer, styles.small)}>
                            <div className={styles.diagramTitle}>{constants.AVERAGETIME_TO_RESPONCE}</div>
                            <div className={styles.dropdownContainer}>
                                <DropDownListMinimized items={priorities} handler={setAvarageTimeProprityValue} />
                                <DropDownListMinimized items={requestTypes} handler={setAvarageTimeTypeValue} />
                            </div>
                            <div className={styles.diagramItem}>
                                {avarageTimeVal.datasets?.length > 0 && avarageTimeVal.datasets[0]?.data?.length > 0 && calculateSumm(avarageTimeVal.datasets[0]?.data) > 0 ? (
                                    <Bar data={avarageTimeVal} options={smalloptionsBar} height={220} width={500} />
                                ) : (
                                    <div className={styles.noData}>
                                        {constants.NOT_ENOUGH_DATA_FOR_DAIAGRAM}
                                    </div>
                                )}

                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={clsx(styles.diagramContainer, styles.small)}>
                            <div className={styles.diagramTitle}>{constants.GENERAL_REQUEST_QUNATITY}</div>
                            <div className={styles.diagramItem} style={{ height: '486px', width: '100%' }}>
                                {generalResuestQunatity.datasets?.length > 0 && generalResuestQunatity.datasets[0]?.data?.length > 0 && calculateSumm(generalResuestQunatity.datasets[0]?.data) > 0 ? (
                                    <Line data={generalResuestQunatity} options={exumpleLine2Options} />
                                ) : (
                                    <div className={styles.noData}>
                                        {constants.NOT_ENOUGH_DATA_FOR_DAIAGRAM}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className={clsx(styles.diagramContainer, styles.big)}>
                            <div className={styles.diagramTitle}>{constants.RESOLVED_TICKETS_TITLE}</div>
                            <div className={styles.diagramItem} style={{ height: '420px', width: '100%' }}>
                                {resolvedQuantity.datasets?.length > 0 &&
                                    resolvedQuantity.datasets[0]?.data?.length > 0 &&
                                    calculateSumm(resolvedQuantity.datasets[0]?.data) > 0 &&
                                    resolvedQuantity.datasets[1]?.data?.length &&
                                    calculateSumm(resolvedQuantity.datasets[1]?.data) > 0
                                    ? (
                                        <Bar data={resolvedQuantity} options={optionsBar} width={1250} height={420} />
                                    ) : (
                                        <div className={styles.noData}>
                                            {constants.NOT_ENOUGH_DATA_FOR_DAIAGRAM}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </>
        ) : (
            <div className={clsx(styles.title)} dangerouslySetInnerHTML={{ __html: constants.NOT_DATA_SIGN }} />
        ))}</Container >

}

export default ReportPagePart