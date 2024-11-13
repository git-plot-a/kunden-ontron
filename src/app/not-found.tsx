import Header from "./components/_sections/Header/Header"
import Footer from "./components/_sections/Footer/Footer"
import Container from "./components/_layout/Container/Container"
import TopOffer from "./components/_sections/TopOffer/TopOffer"

const PageNotFound = () => {
    return (<>
        <Header currentPage="Not found" />
        <Container>
            <div className="notFoundContainer">
            <TopOffer title={"<span>Seite</span><br />ist nicht gefunden"}/>
            </div>
        </Container>
        <Footer></Footer>
    </>)
}

export default PageNotFound