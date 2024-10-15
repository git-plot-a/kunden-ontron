import Header from "../components/_sections/Header/Header"
import Footer from "../components/_sections/Footer/Footer"
// import LottieAnimation from "../components/LottieAnimation/LottieAnimation"
import dynamic from "next/dynamic"

const PlatformsPage = async () => {
    const LottieAnimation = dynamic(() => import('../components/LottieAnimation/LottieAnimation'), {
        ssr: false
    });

    return <>
        <Header />
        <LottieAnimation />
        <Footer />
    </>
}

export default PlatformsPage