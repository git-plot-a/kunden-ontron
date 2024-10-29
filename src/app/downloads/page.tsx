import Header from "../components/_sections/Header/Header"
import TopOfferSubPages from "../components/_sections/TopOfferSubPages/TopOfferSubPages"
import FilesDownload from "../components/_sections/FilesDownload/FilesDownload"
import Container from "../components/_layout/Container/Container"
import Row from "../components/_layout/Row/Row"
import Col from "../components/_layout/Col/Col"
import Footer from "../components/_sections/Footer/Footer"

const DownloadsPage = () =>{
    const FILE_LIST = [
        {
            'item': { title: 'Atlassan Jira', icon: '/img/icon.png'},
            'files': [
                {title: 'ontron_Atlassian_Jira_SLA_Bronze_20240802.PDF', link: 'http://server.kunden.ontron.wissen-lernen.eu/wp-content/uploads/2024/10/220207_o_mite_Leitfaden34633.pdf', date: '28 October 2024'},
                {title: 'ontron_Atlassian_Jira_SLA_Bronze_20240802.PDF', link: 'http://server.kunden.ontron.wissen-lernen.eu/wp-content/uploads/2024/10/220207_o_mite_Leitfaden34633.pdf', date: '28 October 2024'},
                {title: 'ontron_Atlassian_Jira_SLA_Bronze_20240802.PDF', link: 'http://server.kunden.ontron.wissen-lernen.eu/wp-content/uploads/2024/10/220207_o_mite_Leitfaden34633.pdf', date: '28 October 2024'},
                {title: 'ontron_Atlassian_Jira_SLA_Bronze_20240802.PDF', link: 'http://server.kunden.ontron.wissen-lernen.eu/wp-content/uploads/2024/10/220207_o_mite_Leitfaden34633.pdf', date: '28 October 2024'}
            ]
        },
        {
            'item': { title: 'Miro', icon: '/img/icon.png'},
            'files': [
                {title: 'ontron_Atlassian_Jira_SLA_Bronze_20240802.PDF', link: 'http://server.kunden.ontron.wissen-lernen.eu/wp-content/uploads/2024/10/220207_o_mite_Leitfaden34633.pdf', date: '28 October 2024'},
                {title: 'ontron_Atlassian_Jira_SLA_Bronze_20240802.PDF', link: 'http://server.kunden.ontron.wissen-lernen.eu/wp-content/uploads/2024/10/220207_o_mite_Leitfaden34633.pdf', date: '28 October 2024'},
                {title: 'ontron_Atlassian_Jira_SLA_Bronze_20240802.PDF', link: 'http://server.kunden.ontron.wissen-lernen.eu/wp-content/uploads/2024/10/220207_o_mite_Leitfaden34633.pdf', date: '28 October 2024'},
                {title: 'ontron_Atlassian_Jira_SLA_Bronze_20240802.PDF', link: 'http://server.kunden.ontron.wissen-lernen.eu/wp-content/uploads/2024/10/220207_o_mite_Leitfaden34633.pdf', date: '28 October 2024'}
            ]
        }
    ]
    return <>
    <Header currentPage={"downloads"}/>
    <section id="dowload-top-offer">
        <TopOfferSubPages title={"Dienstleistungsanfragen"} imageUrl={'/img/downoloads_offer_image.svg'}/>
    </section>
    <section id="files-list">
        <Container>
            <Row>
                <Col span={24}>
                    {
                        FILE_LIST.length>0 && FILE_LIST.map((item, key)=>(<FilesDownload key={key} item={item.item} files={item.files}/>)) 
                    }
                </Col>
            </Row>
        </Container>
    </section>
    <Footer/>
    </>
}

export default DownloadsPage