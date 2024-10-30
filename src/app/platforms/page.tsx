"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/_sections/Header/Header"
import Footer from "../components/_sections/Footer/Footer"
import TopOfferSubPages from "../components/_sections/TopOfferSubPages/TopOfferSubPages"
import ServiceListWiget from "../components/_sections/ServiceListWiget/ServiceListWiget"
import utils from "../utils"
import useSendQuery from "../hooks/sendQuery/sendQuery"
import api from "@/app/api/crud"

// import LottieAnimation from "../components/LottieAnimation/LottieAnimation"
// import dynamic from "next/dynamic"


const PlatformsPage = () => {
    const router = useRouter()
    const [services, setServices] = useState<Array<ExtendedService>>([])
    const [loading, setLoading] = useState(true)
    const { fetchData } = useSendQuery()
    // const LottieAnimation = dynamic(() => import('../components/LottieAnimation/LottieAnimation'), {
    //     ssr: false
    // });


    useEffect(() => {
        console.log(utils.user.getToken())
        if (!utils.user.getToken()) {
          utils.user.resetAllData()
          router.push('/login')
        } else {
          setLoading(false)
        }
      }, [])


      useEffect(() => {
        const tocken = utils.user.getToken()
        const getPreviewServices = async () => {
          const servicesRes: Array<ExtendedService>  =  await fetchData(`${api.custom.SERVICE_PREVIEWS}/all`, "GET", {}, null, true)    
          setServices(servicesRes)
        }
    
        if (tocken) {
          getPreviewServices()
        } else {
          utils.user.resetAllData()
          router.push('/login')
        }
      }, [])


    return <>{!loading && (
        <>
            <Header currentPage={"platforms"} />
            <section id="top-offer">
                <TopOfferSubPages title={<>Produkte verwalten</>} imageUrl={'/img/offer_product.svg'} />
            </section>
            <section id="user-services">
                <ServiceListWiget services={services} />
            </section>
            {/* <LottieAnimation /> */}
            <Footer />
        </>
    )}
    </>
}

export default PlatformsPage