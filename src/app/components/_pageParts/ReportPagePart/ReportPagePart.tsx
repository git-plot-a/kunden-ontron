import React, { useState, useEffect } from 'react';
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
import contants from '../../Tabs/contants';



type NestedObject = {
    [key: string]:
    | NestedObject
    | string
    | number
    | boolean
    | null
    | undefined
    | Array<NestedObject>
};

type DropDownListItems = {
    title: string,
    value: string,
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

ChartJS.defaults.font = {
    family: "Poppins, sans-serif",
    size: 14,
    weight: 300,
    lineHeight: 1.5,
};

const ReportPagePart = () => {
    const [loading, setLoading] = useState(true)
    const [periodType, setPeriodType] = useState(constants.PERIOD_TYPES[2])
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
        const startDate = getStartDate(periodType)
        const now = new Date()
        if (Array.isArray(resultData?.issues)) {
            const res = resultData?.issues?.reduce((list, item) => {
                const createdDate = new Date((item?.fields as NestedObject)?.created as string)
                if (startDate && createdDate && createdDate >= startDate && createdDate <= now) {
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
                if(needed_type.length > 0 && !labels.includes(needed_type[0].title)) {
                    labels.push(needed_type[0].title as string)
                    dt.push(0)
                    index = labels.length - 1;
                }else{
                    index = labels.indexOf(needed_type[0].title as string)
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
                    const resolution: Date = new Date((item?.fields as NestedObject).resolutiondate as string)
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

        divideData(periodType, constants.TIMELINE_INTERVAL[0], addToPeriod)

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
                    const createdDate: Date = new Date((item?.fields as NestedObject).created as string)
                    if (createdDate >= startInterval && createdDate <= finishInterval) {
                        preiodQuantity++
                    }
                })
            }
            quantity.push(preiodQuantity)
            labels.push(intervalName)
        }
        divideData(periodType, constants.TIMELINE_INTERVAL[0], addToPeriod)
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
                    const currentTime = ((((item?.fields as NestedObject)?.customfield_10228 as NestedObject)?.completedCycles as NestedObject[])[0]?.elapsedTime as NestedObject)?.millis as number
                    const resolution: Date = new Date((item?.fields as NestedObject).resolutiondate as string)
                    if (currentTime &&
                        resolution >= startInterval &&
                        resolution <= finishInterval &&
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
        divideData(periodType, constants.TIMELINE_INTERVAL[0], addToPeriod)
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
    //general functons
    function calculateSumm(numbers: number[]): number {
        if (numbers.length === 0) {
            return 0
        }

        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return sum
    }

    function calculateAverage(numbers: number[]): number {
        const sum = calculateSumm(numbers)
        if (numbers.length > 0) {
            return sum / numbers.length;
        }
        return 0
    }

    function millisToHours(millis: number): number {
        const hours = millis / (1000 * 60 * 60);
        return hours;
    }

    const setDropdownLists = (resultData: NestedObject) => {
        const prioritiesList: DropDownListItems[] = []
        const requestTypeList: DropDownListItems[] = []
        if (Array.isArray(resultData?.issues)) {
            resultData?.issues?.forEach((item) => {
                const currentPrioritiy: NestedObject = ((item?.fields as NestedObject)?.priority as NestedObject) as NestedObject
                const currentType: NestedObject = ((item?.fields as NestedObject)?.customfield_10010 as NestedObject)?.requestType as NestedObject
                if (currentPrioritiy && prioritiesList.filter(priority => priority.value == currentPrioritiy.id).length == 0) {
                    const localName = constants.PRIORITIES.filter(priority => priority.value == currentPrioritiy.id)
                    prioritiesList.push({
                        title: (localName.length >0 ? localName[0].title : currentPrioritiy.name) as string,
                        value: currentPrioritiy.id as string
                    })

                }
                if (currentType && requestTypeList.filter(type => type.value == currentType.id).length == 0) {
                    const localName = constants.REQUEST_TYPES.filter(type => type.value == currentType.id)
                    requestTypeList.push({
                        title: (localName.length > 0 ? localName[0].title :  currentType.name) as string,
                        value: currentType.id as string
                    })
                }
            })
        }
        setPriorities(prioritiesList)
        setAvarageTimeProprityValue(prioritiesList[0]?.value)
        setRequesTypes(requestTypeList)
        setAvarageTimeTypeValue(requestTypeList[0]?.value)
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
            if (!Array.isArray(userData.roles) || (!userData.roles.includes("sla_manager") && !userData.roles.includes("administrator"))) {
                email = userData.user_email
            }
            const data: object = {
                project: userData.project,
                fields: 'customfield_10010,status,resolutiondate,customfield_10228,customfield_10227,created,priority',
                userEmail: email
            }

            const resultData: NestedObject = await utils.jira.apiRequest(data, "GET")
            if (resultData && (resultData.issues as NestedObject[])?.length > 0) {
                updateAllDateDiagrams(resultData)
                setResult(resultData)
            }

            setLoading(false)
            animationActivation()
        }
        loadDiagramData()
    }, [])

    useEffect(() => {
        avarageTime(result)
    }, [avarageTimeProprityValue, avarageTimeTypeValue])


    const getStartDate = (period: string): Date | null => {
        const now = new Date();
        switch (period) {
            case constants.PERIOD_TYPES[0]: {
                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
            }
            case constants.PERIOD_TYPES[1]: {
                const dayOfWeek = now.getDay();
                return new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
            }
            case constants.PERIOD_TYPES[2]: {
                return new Date(now.getFullYear(), now.getMonth(), 1);
            }
            case constants.PERIOD_TYPES[3]: {
                return new Date(now.getFullYear(), now.getMonth() - 3, 1);
            }
            case constants.PERIOD_TYPES[4]: {
                return new Date(now.getFullYear() - 1, 0, 1);
            }
            default:
                return null;
        }
    };

    const divideData = (period: string,
        interval: string,
        callback: (startInterval: Date, finishInterval: Date, name: string) => void) => {
        const startPeriodDate = getStartDate(period)
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
        if (constants.PERIOD_TYPES.includes(selectedPeriodType)) {
            setPeriodType(selectedPeriodType)
        }
    }

    useEffect(() => {
        updateAllDateDiagrams(result as NestedObject)
        animationActivation()
    }, [periodType])


    return <Container classes={styles.mainContainer}>{loading ?
        (
            <div className={clsx(styles.title, styles.loading, "animation-fade-in", "short-duration")}>{constants.LOADING_IS_IN_PROCESS}</div>
        ) : (Array.isArray((result as NestedObject)?.issues) && ((result as NestedObject)?.issues as NestedObject[]).length > 0 ? (
            <>
                <Row>
                    <Col span={24}>
                        <div className={styles.finterButtonsContainer}>
                            {/* <Button title={"Today"}
                                    callback={() => { switchPeriod(constants.PERIOD_TYPES[0]) }}
                                    classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[0] ? styles.active : '', "animation-fade-in-top")} /> */}
                            <Button title={"Diese Woche"}
                                callback={() => { switchPeriod(constants.PERIOD_TYPES[1]) }}
                                classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[1] ? styles.active : '', "animation-fade-in-top")} />
                            <Button title={"Diesen Monat"}
                                callback={() => { switchPeriod(constants.PERIOD_TYPES[2]) }}
                                classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[2] ? styles.active : '', "animation-fade-in-top")} />
                            <Button title={"Letzten drei Monate"}
                                callback={() => { switchPeriod(constants.PERIOD_TYPES[3]) }}
                                classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[3] ? styles.active : '', "animation-fade-in-top")} />
                            {/* <Button title={"Last year"}
                                callback={() => { switchPeriod(constants.PERIOD_TYPES[4]) }}
                                classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[4] ? styles.active : '', "animation-fade-in-top")} /> */}

                        </div>
                        {/* <div>{"Timeline"}</div>
                    <Button title={"Days"}
                        callback={() => { switchTimeline(constants.TIMELINE_INTERVAL[0]) }}
                        classes={clsx(styles.button, timelineType == constants.TIMELINE_INTERVAL[0] ? styles.active : '')} />
                    <Button title={"Week"}
                        callback={() => { switchTimeline(constants.TIMELINE_INTERVAL[1]) }}
                        classes={clsx(styles.button, timelineType == constants.TIMELINE_INTERVAL[1] ? styles.active : '')} />
                    <Button title={"Month"}
                        callback={() => { switchTimeline(constants.TIMELINE_INTERVAL[2]) }}
                        classes={clsx(styles.button, timelineType == constants.TIMELINE_INTERVAL[2] ? styles.active : '')} /> */}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className={clsx(styles.diagramContainer, styles.small)}>
                            <div className={styles.diagramTitle}>{constants.REQUEST_TYES_DESTRIBUTIONS_TITLE}</div>
                            <div className={styles.diagramItem} style={{ width: '100%', height: '486px', marginTop: '-85px' }}>
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
                    <Col span={24}>
                        <div className={clsx(styles.diagramContainer, styles.big)}>
                            <div className={styles.diagramTitle}>{constants.GENERAL_REQUEST_QUNATITY}</div>
                            <div className={styles.diagramItem} style={{ height: '420px', width: '100%' }}>
                                {generalResuestQunatity.datasets?.length > 0 && generalResuestQunatity.datasets[0]?.data?.length > 0 && calculateSumm(generalResuestQunatity.datasets[0]?.data) > 0 ? (
                                    <Line data={generalResuestQunatity} options={exumpleLine2Options} width={1250} height={420} />
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