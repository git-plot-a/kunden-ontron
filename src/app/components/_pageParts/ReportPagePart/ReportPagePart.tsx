import React, { useState, useEffect } from 'react';
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
    ChartData
} from 'chart.js';
import Row from '../../_layout/Row/Row';
import { Button } from '../../_buttons/Button/Button';
import utils from '@/app/utils';
import Col from '../../_layout/Col/Col';
import styles from './reportPage.module.scss'
import constants from "./constants"

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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ReportPagePart = () => {
    const [loading, setLoading] = useState(true)
    const [requestTypesData, setResuestTypesData] = useState(constants.DOUGHNUT.data)
    // const [awerageTimeDuration, setAwerageTimeDuration] = useState(constants.LINE.data)
    // const [resolvedQuantity, setResolvedQuantity] = useState(constants.LINE.data)

    const typesProccess = (resultData: NestedObject) => {
        if (Array.isArray(resultData?.issues)) {
            const res = resultData?.issues?.reduce((list, item) => {
                const typeData = ((item?.fields as NestedObject).customfield_10010 as NestedObject)?.requestType as NestedObject
                if (typeData?.id) {
                    list.push({ type_id: typeData?.id as string, name: typeData?.name as string })
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

    // const resolutionQuantity = (resultData: NestedObject) => {

    // }

    useEffect(() => {
        setLoading(true);
        const loadDiagramData = async () => {
            const userData = utils.user.getUserData();
            const data: object = {
                project: userData.project,
                fields: 'customfield_10010,status,resolutiondate'
            }


            const resultData: NestedObject = await utils.jira.apiRequest(data, "GET")
            if (resultData) {
                typesProccess(resultData)
                // resolutionQuantity(resultData)
            }

            setLoading(false)
        }
        loadDiagramData()
    }, [])


    //test data


    const [exumpleLine1Data, setExumpleLine1Data] = useState(constants.LINE_EXUMAPLE1.data)
    const [exumpleLine2Data, setExumpleLine2Data] = useState(constants.LINE_EXUMAPLE2.data)
    const [exumpleLine3Data, setExumpleLine3Data] = useState(constants.LINE_EXUMAPLE3.data)

    function generateDateLabels(days: number): string[] {
        const labels: string[] = [];
        const startDate = new Date();

        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() - (days - 1 - i));
            const label = date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
            labels.push(label);
        }

        return labels;
    }
    useEffect(() => {
        // fist line
        const newFirstLineData = exumpleLine1Data
        newFirstLineData.labels = generateDateLabels(30)
        newFirstLineData.datasets[0].data = [
            50, 100, 100, 100, 100, 100, 100, 100, 100, 100,
            50, 100, 0, 0, 100, 100, 100, 100, 100, 100,
            100, 100, 0, 100, 100, 100, 100, 0, 0, 0
        ];
        setExumpleLine1Data(newFirstLineData)

        //second line
        const newSecondLineData = exumpleLine2Data
        newSecondLineData.labels = generateDateLabels(30)
        console.log(newSecondLineData)
        newSecondLineData.datasets[0].data = [
            5, 2, 1, 5, 1, 9, 8, 12, 1, 2,
            9, 12, 5, 1, 2, 8, 11, 12, 5, 9,
            4, 6, 4, 3, 7, 4, 4, 4, 9, 2
        ];
        // newSecondLineData.datasets[1].data = [
        //     11, 7, 6, 7, 2, 5, 8, 8, 1, 4,
        //     7, 10, 2, 3, 2, 9, 5, 7, 12, 11,
        //     6, 11, 2, 11, 11, 6, 2, 8, 5, 11
        // ];
        // newSecondLineData.datasets[2].data = [
        //     1, 1, 1, 11, 9, 3, 8, 2, 10, 1,
        //     7, 10, 8, 10, 12, 12, 6, 11, 3, 1,
        //     2, 12, 2, 1, 5, 3, 7, 9, 12, 7
        // ];
        setExumpleLine2Data(newSecondLineData)

        //third line
        const newThirdLineData = exumpleLine3Data
        newThirdLineData.labels = generateDateLabels(30)
        console.log(newSecondLineData)
        newThirdLineData.datasets[0].data = [
            0, 4, 5, 0, 2, 0, 4, 0, 1, 2,
            0, 0, 4, 5, 5, 4, 0, 0, 4, 2,
            0, 2, 1, 2, 1, 2, 3, 0, 4, 2
        ];
        newThirdLineData.datasets[1].data = [
            0, 4, 0, 1, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 3, 4, 0, 0, 3, 2,
            0, 0, 0, 1, 0, 5, 5, 0, 0, 5
        ];
        newThirdLineData.datasets[2].data = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        setExumpleLine3Data(newThirdLineData)

    }, [])

    // useEffect(() => {
    //     setLoading(false)
    // }, [exumpleLine3Data])



    //Data based
    // const exumpleLine1Options: ChartOptions<'line'> = constants.LINE_EXUMAPLE1.options as ChartOptions<'line'>
    const exumpleLine2Options: ChartOptions<'line'> = constants.LINE_EXUMAPLE2.options as ChartOptions<'line'>
    // const exumpleLine3Options: ChartOptions<'line'> = constants.LINE_EXUMAPLE3.options as ChartOptions<'line'>

    //Design expired
    const data: ChartData<'bar'> = constants.BAR.data

    const options: ChartOptions<'bar'> = constants.BAR.options as ChartOptions<'bar'>

    // const dataLine: ChartData<'scatter'> = constants.LINE.data

    // const optionsLine: ChartOptions<'scatter'> = constants.LINE.options as ChartOptions<'scatter'>


    // const dataPie: ChartData<'pie'> = constants.PIE.data

    // const optionsPie: ChartOptions<'pie'> = constants.PIE.options as ChartOptions<'pie'>

    // const dataDoughnut: ChartData<'doughnut'> = constants.DOUGHNUT.data

    const optionsDoughnut: ChartOptions<'doughnut'> = constants.DOUGHNUT.options as ChartOptions<'doughnut'>


    const dataBar: ChartData<'bar'> = {
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // Метки для оси X
        datasets: [
            {
                label: 'Part 1',
                data: [12, 19, 3, 5], // Значения первой части каждого столбца
                backgroundColor: 'rgba(255, 99, 132, 0.7)', // Цвет для части 1
            },
            {
                label: 'Part 2',
                data: [8, 10, 5, 7], // Значения второй части каждого столбца
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // Цвет для части 2
            },
            // {
            //     label: 'Part 3',
            //     data: [4, 7, 6, 3], // Значения третьей части каждого столбца
            //     backgroundColor: 'rgba(255, 206, 86, 0.7)', // Цвет для части 3
            // },
        ],
    };

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

    const generateRandomData = (count: number, min: number, max: number): number[] => {
        return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };

    const labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const dataArea = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: generateRandomData(labels.length, 20, 100),
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Полупрозрачный цвет для заливки
                borderColor: 'rgba(75, 192, 192, 1)', // Цвет линии
                borderWidth: 2,
                fill: true, // Включает заливку области
            },
            {
                label: 'Dataset 2',
                data: generateRandomData(labels.length, 30, 90),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const optionsArea: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };



    return <>{!loading && (
        <Container>
            <Row>
                <Col span={24}>
                    <h2 className={styles.title}>{"Filnal diagrams data"}</h2>
                </Col>
                <Col span={6}>
                    <Button title={"Tickets-Today"} callback={() => { }} classes={styles.button} />
                    <Button title={"Tickets-This month"} callback={() => { }} classes={styles.button} />
                    <Button title={"breached 2/13"} callback={() => { }} classes={styles.button} />
                </Col>
                <Col span={18}>
                    <div>{"Distribution of request types"}</div>
                    <div style={{ width: '500px' }}>
                        <Doughnut data={requestTypesData} options={optionsDoughnut} height={500} width={700} />
                    </div>
                    <div>{"Количество запросов которые поступили"}</div>
                    <div style={{ width: '700px' }}>
                        <Line data={exumpleLine2Data} options={exumpleLine2Options} height={500} width={700} />
                    </div>
                    <div>{"Сколько тикетов закрыто + сколько закрто во время"}</div>
                    <div>
                        <Bar data={dataBar} options={optionsBar} height={300} width={500} />
                    </div>
                    <div>{"За какое время закрываются тикеты по категориям"}</div>
                    <div>
                        <Line options={optionsArea} data={dataArea} height={300} width={500} />;
                    </div>
                </Col>
            </Row>
            {/* <Row>
                <Col span={24}>
                    <h2 className={styles.title}>{"Basted on Oybek's data"}</h2>
                </Col>
            </Row>
            <Row>
                <Col span={6} classes={styles.leftAlign}>
                    <Button title={"Tickets-Today"} callback={() => { }} classes={styles.button} />
                    <Button title={"Tickets-This month"} callback={() => { }} classes={styles.button} />
                    <Button title={"breached 2/13"} callback={() => { }} classes={styles.button} />
                </Col>
                <Col span={18}>
                    <div className={styles.disgramsContainer}>
                        <div className={styles.disgramsItemContainer}>
                            <div className={styles.diagramTitle}>{constants.LINE_EXUMAPLE1_TITLE}</div>
                            <div className={styles.mesureContainer}>
                                <div className={styles.meduateItem}>
                                    <div className={styles.value}>18,5%</div>
                                    <div className={styles.description}>Some masure</div>
                                </div>
                            </div>
                            <Line data={exumpleLine1Data} options={exumpleLine1Options} height={250} width={420} />
                        </div>
                        <div className={styles.disgramsItemContainer}>
                            <div className={styles.diagramTitle}>{constants.LINE_EXUMAPLE2_TITLE}</div>
                            <div className={styles.mesureContainer}>
                                <div className={styles.meduateItem}>
                                    <div className={styles.value}>18,5%</div>
                                    <div className={styles.description}>Some masure</div>
                                </div>
                                <div className={styles.meduateItem}>
                                    <div className={styles.value} style={{ color: '#FF8941' }}>221</div>
                                    <div className={styles.description}>Some masure</div>
                                </div>
                                <div className={styles.meduateItem}>
                                    <div className={styles.value} style={{ color: '#5f5f5f' }}>0</div>
                                    <div className={styles.description}>Some masure</div>
                                </div>
                            </div>
                            <Line data={exumpleLine2Data} options={exumpleLine2Options} height={250} width={420} />
                        </div>
                        <div className={styles.disgramsItemContainer}>
                            <div className={styles.diagramTitle}>{constants.LINE_EXUMAPLE3_TITLE}</div>
                            <div className={styles.mesureContainer}>
                                <div className={styles.meduateItem}>
                                    <div className={styles.value}>18,5%</div>
                                    <div className={styles.description}>Some masure</div>
                                </div>
                                <div className={styles.meduateItem}>
                                    <div className={styles.value} style={{ color: '#FF8941' }}>221</div>
                                    <div className={styles.description}>Some masure</div>
                                </div>
                                <div className={styles.meduateItem}>
                                    <div className={styles.value} style={{ color: '#5f5f5f' }}>0</div>
                                    <div className={styles.description}>Some masure</div>
                                </div>
                            </div>
                            <Line data={exumpleLine3Data} options={exumpleLine3Options} height={250} width={420} />
                        </div>
                    </div>
                </Col>
            </Row> */}
            <Row>
                <Col span={24}>
                    <h2 className={styles.title}>Alternative diagrams</h2>
                </Col>
                <Col span={24}>
                    <div style={{ fontSize: '12px', marginBottom: '30px' }}>{"More examples: https://react-chartjs-2-two.vercel.app/examples/area-chart"}</div>
                </Col>
            </Row>
            <Row>
                <Col span={6}></Col>
                <Col span={18}>
                    <div style={{ display: 'flex', justifyContent: "space-between", flexWrap: 'wrap' }}>
                        <div>
                            <Bar data={data} options={options} height={300} width={420} />;
                        </div>
                        {/* <div>
                            <Pie data={dataPie} options={optionsPie} height={300} width={300} style={{ height: '250px', width: '250px' }} />;
                        </div>
                        <div>
                            <Doughnut data={dataDoughnut} options={optionsDoughnut} height={300} width={300} />
                        </div> */}
                        {/* <div>
                            <Scatter data={dataLine} options={optionsLine} height={300} width={300} />
                        </div> */}

                        {/* <Pie data={data} options={options} />; */}
                        {/* <Doughnut data={data} options={options} />; */}

                    </div>
                </Col>
            </Row>
        </Container>
    )}</>
}

export default ReportPagePart