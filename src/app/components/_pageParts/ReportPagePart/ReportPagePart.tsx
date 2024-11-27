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
import styles from './reportPage.module.scss'
import constants from "./constants"
import DropDownList from '../../DropDownList/DropDownList';

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

const ReportPagePart = () => {
    const [loading, setLoading] = useState(true)
    const [periodType, setPeriodType] = useState(constants.PERIOD_TYPES[2])
    const [result, setResult] = useState<NestedObject>({})
    const [priorities, setPriorities] = useState<DropDownListItems[]>([])
    const [requestTypes, setRequesTypes] = useState<DropDownListItems[]>([])
    const [avarageTimeProprityValue, setAvarageTimeProprityValue] = useState<string>('')
    const [avarageTimeTypeValue, setAvarageTimeTypeValue] = useState<string>('')
    //how many equest were solved, how many were solven on time
    const [resolvedQuantity, setResolvedQuantity] = useState(constants.BAR.data)
    //requests types deviation
    const [requestTypesData, setResuestTypesData] = useState(constants.DOUGHNUT.data)
    //requests quantity
    const [generalResuestQunatity, setGeneralRequestQuantity] = useState(constants.LINE_EXUMAPLE1.data)
    //avarage time for resolution
    const [avarageTimeVal, setAvarageTimeVal] = useState(constants.BAR.data)

    //options form template
    const optionsDoughnut: ChartOptions<'doughnut'> = constants.DOUGHNUT.options as ChartOptions<'doughnut'>
    const exumpleLine2Options: ChartOptions<'line'> = constants.LINE_EXUMAPLE2.options as ChartOptions<'line'>


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
                        list.push({ type_id: typeData?.id as string, name: typeData?.name as string })
                    }
                }
                return list
            }, [] as Array<{ type_id: string, name: string | number }>)


            const lables = res.reduce((lb, label) => {
                if (!lb.includes(label.name as string)) {
                    lb.push(label.name as string)
                }
                return lb
            }, [] as Array<string>)

            const typesData = res.reduce((dt, item) => {
                const index = lables.indexOf(item.name as string)
                if (index > -1) {
                    dt[index]++;
                }

                return dt
            }, lables.map(() => 0))


            setResuestTypesData({
                ...requestTypesData,
                labels: lables,
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
                        console.log((item?.fields as NestedObject)?.customfield_10228)
                        const timeleft: number = ((((item?.fields as NestedObject)?.customfield_10228 as NestedObject)?.completedCycles as NestedObject[])[0]?.remainingTime as NestedObject)?.millis as number
                        console.log(timeleft)
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

        divideData(periodType, constants.TIMELINE_INTERVAL[1], addToPeriod)

        setResolvedQuantity({
            ...resolvedQuantity,
            labels: labels,
            datasets: [
                { ...resolvedQuantity.datasets[0], data: notOnTimeResolved, label: 'Resolved not on time tickets' },
                { ...resolvedQuantity.datasets[1], data: onTimeResolved, label: 'Resolved on time' },
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
                    const resolution: Date = new Date((item?.fields as NestedObject).resolutiondate as string)
                    if (resolution >= startInterval && resolution <= finishInterval) {
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
                    if(currentTime &&
                        resolution >= startInterval &&
                        resolution <= finishInterval &&
                        currentType?.id == avarageTimeTypeValue && 
                        currentPriority?.id == avarageTimeProprityValue
                     ){
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
                label: 'durchschnittlicher Zeitaufwand in Stunden'
            }]
        })


    }
    //general functons

    function calculateAverage(numbers: number[]): number {
        if (numbers.length === 0) {
          return 0
        }
      
        const sum = numbers.reduce((acc, num) => acc + num, 0); // Сумма всех чисел
        return sum / numbers.length; // Делим сумму на количество элементов
      }

    function millisToHours(millis: number): number {
        // 1 час = 1000 миллисекунд * 60 секунд * 60 минут
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
                    prioritiesList.push({
                        title: currentPrioritiy.name as string,
                        value: currentPrioritiy.id as string
                    })

                }
                if (currentType && requestTypeList.filter(type => type.value == currentType.id).length == 0) {
                    requestTypeList.push({
                        title: currentType.name as string,
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
            const data: object = {
                project: userData.project,
                fields: 'customfield_10010,status,resolutiondate,customfield_10228,created,priority'
            }


            const resultData: NestedObject = await utils.jira.apiRequest(data, "GET")
            if (resultData) {
                updateAllDateDiagrams(resultData)
                setResult(resultData)
            }

            setLoading(false)
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

    //set Labels
    const divideData = (period: string,
        interval: string,
        callback: (startInterval: Date, finishInterval: Date, name: string) => void) => {
        const startPeriodDate = getStartDate(period)
        if (!startPeriodDate) return;

        // const labels: string[] = [];
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



    //change a period of time
    const switchPeriod = (selectedPeriodType: string) => {
        if (constants.PERIOD_TYPES.includes(selectedPeriodType)) {
            setPeriodType(selectedPeriodType)
        }
    }

    useEffect(() => {
        //change the timeline
        updateAllDateDiagrams(result)
    }, [periodType])




    const optionsBar: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Позиция легенды
            },
            tooltip: {
                enabled: true, // Включение всплывающих подсказок
            },
        },
        scales: {
            x: {
                stacked: true, // Включение группировки по оси X
            },
            y: {
                stacked: true, // Включение группировки по оси Y
                beginAtZero: true, // Начинать ось Y с нуля
            },
        },
    };



    return <>{!loading && (
        <Container>
            <Row>
                <Col span={24}>
                    <div className={styles.finterButtonsContainer}>
                        <div style={{ display: 'none' }}>
                            <Button title={"Today"}
                                callback={() => { switchPeriod(constants.PERIOD_TYPES[0]) }}
                                classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[0] ? styles.active : '')} />
                        </div>
                        <Button title={"This week"}
                            callback={() => { switchPeriod(constants.PERIOD_TYPES[1]) }}
                            classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[1] ? styles.active : '')} />
                        <Button title={"This month"}
                            callback={() => { switchPeriod(constants.PERIOD_TYPES[2]) }}
                            classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[2] ? styles.active : '')} />
                        <Button title={"Lats three month"}
                            callback={() => { switchPeriod(constants.PERIOD_TYPES[3]) }}
                            classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[3] ? styles.active : '')} />
                        <Button title={"Last year"}
                            callback={() => { switchPeriod(constants.PERIOD_TYPES[4]) }}
                            classes={clsx(styles.button, periodType == constants.PERIOD_TYPES[4] ? styles.active : '')} />

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
                    <div className={styles.diagramContainer}>
                        <div className={styles.diagramTitle}>{constants.REQUEST_TYES_DESTRIBUTIONS_TITLE}</div>
                        <div className={styles.diagramItem}>
                            <Doughnut data={requestTypesData} options={optionsDoughnut} height={280} />
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.diagramContainer}>
                        <div className={styles.diagramTitle}>{constants.AVERAGETIME_TO_RESPONCE}</div>
                        <div className={styles.dropdown}>
                            <DropDownList items={priorities} handler={setAvarageTimeProprityValue} />
                            <DropDownList items={requestTypes} handler={setAvarageTimeTypeValue} />
                        </div>
                        <div className={styles.diagramItem}>
                            <Bar data={avarageTimeVal} options={optionsBar} height={300} width={500} />
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.diagramContainer}>
                        <div>{"Количество запросов которые поступили"}</div>
                        <div>
                            <Line data={generalResuestQunatity} options={exumpleLine2Options} height={300} />
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.diagramContainer}>
                        <div>{"How many tickets resolved"}</div>
                        <div>
                            <Bar data={resolvedQuantity} options={optionsBar} height={300} width={500} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container >
    )}</>

}

export default ReportPagePart