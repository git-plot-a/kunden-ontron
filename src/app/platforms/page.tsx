import Header from "../components/_sections/Header/Header"
import Footer from "../components/_sections/Footer/Footer"
import TopOfferSubPages from "../components/_sections/TopOfferSubPages/TopOfferSubPages"
// import LottieAnimation from "../components/LottieAnimation/LottieAnimation"
// import dynamic from "next/dynamic"

const PlatformsPage = async () => {
    // const LottieAnimation = dynamic(() => import('../components/LottieAnimation/LottieAnimation'), {
    //     ssr: false
    // });

    return <>
        <Header currentPage={"platforms"} />
        <TopOfferSubPages title={<>Produkte verwalten</>} imageUrl={'/img/offer_product.svg'}/>
        {/* <LottieAnimation /> */}
        <Footer />
    </>
}

export default PlatformsPage