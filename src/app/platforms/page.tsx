import Header from "../components/_sections/Header/Header"
import Footer from "../components/_sections/Footer/Footer"
import TopOfferSubPages from "../components/_sections/TopOfferSubPages/TopOfferSubPages"
import ServiceListWiget from "../components/_sections/ServiceListWiget/ServiceListWiget"
// import LottieAnimation from "../components/LottieAnimation/LottieAnimation"
// import dynamic from "next/dynamic"

const PlatformsPage = async () => {
    // const LottieAnimation = dynamic(() => import('../components/LottieAnimation/LottieAnimation'), {
    //     ssr: false
    // });

    const SERVICES = [
        {
            title: "Atlassan Jira",
            icon: "/img/Icon.png",
            subtitle: 'Subscription',
            id: '1' 
        },
        {
            title: "Atlassan Jira",
            icon: "/img/Icon.png",
            subtitle: 'Subscription',
            id: '1'
        },
        {
            title: "Atlassan Jira",
            icon: "/img/Icon.png",
            id: '1'
        },
        {
            title: "Atlassan Jira",
            icon: "/img/Icon.png",
            id: '1'
        },
        {
            title: "Atlassan Jira",
            icon: "/img/Icon.png",
            id: '1'
        },
        {
            title: "Atlassan Jira",
            icon: "/img/Icon.png",
            id: '1'
        },
        {
            title: "Atlassan Jira",
            icon: "/img/Icon.png",
            id: '1'
        },
        {
            title: "Atlassan Jira",
            icon: "/img/Icon.png",
            id: '1'
        },
        {
            title: "Atlassan Jira",
            icon: "/img/Icon.png",
            id: '1'
        }
    ]

    return <>
        <Header currentPage={"platforms"} />
        <section id="top-offer">
            <TopOfferSubPages title={<>Produkte verwalten</>} imageUrl={'/img/offer_product.svg'} />
        </section>
        <section id="user-services">
            <ServiceListWiget services={SERVICES} />
        </section>
        {/* <LottieAnimation /> */}
        <Footer />
    </>
}

export default PlatformsPage