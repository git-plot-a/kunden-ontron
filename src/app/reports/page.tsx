
"use client"

import Header from '../components/_sections/Header/Header';
import Footer from '../components/_sections/Footer/Footer';
import TopOfferSubPages from '../components/_sections/TopOfferSubPages/TopOfferSubPages';
import ReportPagePart from '../components/_pageParts/ReportPagePart/ReportPagePart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);


const PageReports = () => {

     return <>
        <Header currentPage='reports'/>
        <TopOfferSubPages imageUrl='/img/sla-reports.png' title="SLA-Berichte"/>
        <ReportPagePart/>
        <Footer/>
    </>
}

export default PageReports