import React, { useState, useEffect } from 'react';
import Container from '../../_layout/Container/Container';
import { Bar, Line, Pie, Doughnut, Scatter } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import Row from '../../_layout/Row/Row';
import Col from '../../_layout/Col/Col';
import styles from './reportPage.module.scss'
import { Button } from '../../_buttons/Button/Button';
import constants from "./constants"

const ReportPagePart = () => {
    const [loading, setLoading] = useState(true)
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
        newSecondLineData.datasets[1].data = [
            11, 7, 6, 7, 2, 5, 8, 8, 1, 4,
            7, 10, 2, 3, 2, 9, 5, 7, 12, 11,
            6, 11, 2, 11, 11, 6, 2, 8, 5, 11
        ];
        newSecondLineData.datasets[2].data = [
            1, 1, 1, 11, 9, 3, 8, 2, 10, 1,
            7, 10, 8, 10, 12, 12, 6, 11, 3, 1,
            2, 12, 2, 1, 5, 3, 7, 9, 12, 7
        ];
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

    useEffect(() => {
        setLoading(false)
    }, [exumpleLine3Data])



    //Data based
    const exumpleLine1Options: ChartOptions<'line'> = constants.LINE_EXUMAPLE1.options as ChartOptions<'line'>
    const exumpleLine2Options: ChartOptions<'line'> = constants.LINE_EXUMAPLE2.options as ChartOptions<'line'>
    const exumpleLine3Options: ChartOptions<'line'> = constants.LINE_EXUMAPLE3.options as ChartOptions<'line'>

    //Design expired
    const data: ChartData<'bar'> = constants.BAR.data

    const options: ChartOptions<'bar'> = constants.BAR.options as ChartOptions<'bar'>

    const dataLine: ChartData<'scatter'> = constants.LINE.data

    const optionsLine: ChartOptions<'scatter'> = constants.LINE.options as ChartOptions<'scatter'>


    const dataPie: ChartData<'pie'> = constants.PIE.data

    const optionsPie: ChartOptions<'pie'> = constants.PIE.options as ChartOptions<'pie'>

    const dataDoughnut: ChartData<'doughnut'> = constants.DOUGHNUT.data

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
            {
                label: 'Part 3',
                data: [4, 7, 6, 3], // Значения третьей части каждого столбца
                backgroundColor: 'rgba(255, 206, 86, 0.7)', // Цвет для части 3
            },
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


    return <>{!loading && (
        <Container>
            <Row>
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
            </Row>
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
                        <div>
                            <Pie data={dataPie} options={optionsPie} height={300} width={300} style={{ height: '250px', width: '250px' }} />;
                        </div>
                        <div>
                            <Doughnut data={dataDoughnut} options={optionsDoughnut} height={300} width={300} />
                        </div>
                        <div>
                            <Scatter data={dataLine} options={optionsLine} height={300} width={300} />
                        </div>
                        <div>
                            <Bar data={dataBar} options={optionsBar} />
                        </div>
                        {/* <Pie data={data} options={options} />; */}
                        {/* <Doughnut data={data} options={options} />; */}

                    </div>
                </Col>
            </Row>
        </Container>
    )}</>
}

export default ReportPagePart