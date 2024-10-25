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
interface ExtendedService extends Service {
    id: string | number,
    description?: string,
    content?: string,
    platform?: string

}

const PlatformsPage = async () => {
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
          const servicesRes: Array<ExtendedService>  =  await fetchData(api.custom.SERVICE_PREVIEWS, "GET", {}, null, true)    
          setServices(servicesRes)
        }
    
        if (tocken) {
          getPreviewServices()
        } else {
          utils.user.resetAllData()
          router.push('/login')
        }
      }, [])

    // const SERVICES: Array<ExtendedService> = [
    //     {
    //         title: "Atlassan Jira",
    //         icon: "/img/Icon.png",
    //         id: '1',
    //         serviceLevels: [{ type: 'Platform', value: 'Silber' }, { type: 'Inhalt', value: 'Gold' }],
    //         description: "<h4>Zweck</h4><p>Confluence ist ein Kollaborationswerkzeug, das unsere Teams bei der Erstellung, Genehmigung und gemeinsamen Bearbeitung von Projekten und Dokumentationen unterstützt. Es dient als zentrale Wissensdatenbank und Content-Management-System für ontron.</p><h4>Key Features</h4><ul><li>Erstellung von Inhalten: Bietet Rich-Text-Bearbeitungsfunktionen für die Erstellung von Seiten, Wikis und Blogs</li><li>Zusammenarbeit im Team: Ermöglicht es mehreren Benutzern, in Echtzeit an Dokumenten zusammenzuarbeiten</li><li>Vorlagen: Bietet eine Vielzahl von Vorlagen für die Erstellung von konsistenter Dokumentation, Besprechungsnotizen, Produktanforderungen und mehr</li><li>Seitenhierarchien: Organisiert Inhalte in einer hierarchischen Struktur, die das Navigieren und Verwalten erleichtert</li><li>Integrationsmöglichkeiten: Nahtlose Integration mit anderen Atlassian-Produkten wie Jira und externen Tools wie O365 und Miro</li><li>Suche und Archivierung: Leistungsstarke Suchfunktionen zum schnellen Auffinden von Inhalten und die Möglichkeit, veraltete Seiten zu archivieren</li></ul><h4>Hosting Standort</h4><p>Europäische Union</p><h4>Support Standort</h4><p>Australien</p><h4>Support Standort</h4><p><a href={'/'}>Confluence Cloud resources | Confluence Cloud | Atlassian Support</a></p>"
    //     },
    //     {
    //         title: "Atlassan Jira",
    //         icon: "/img/Icon.png",
    //         id: '2',
    //         serviceLevels: [{ type: 'Platform', value: 'Silber' }, { type: 'Inhalt', value: 'Gold' }]
    //     },
    //     {
    //         title: "Atlassan Jira",
    //         icon: "/img/Icon.png",
    //         id: '3'
    //     },
    //     {
    //         title: "Atlassan Jira",
    //         icon: "/img/Icon.png",
    //         id: '4'
    //     },
    //     {
    //         title: "Atlassan Jira",
    //         icon: "/img/Icon.png",
    //         id: '5'
    //     },
    //     {
    //         title: "Atlassan Jira",
    //         icon: "/img/Icon.png",
    //         id: '6'
    //     },
    //     {
    //         title: "Atlassan Jira",
    //         icon: "/img/Icon.png",
    //         id: '7'
    //     },
    //     {
    //         title: "Atlassan Jira",
    //         icon: "/img/Icon.png",
    //         id: '8'
    //     },
    //     {
    //         title: "Atlassan Jira",
    //         icon: "/img/Icon.png",
    //         id: '9'
    //     }
    // ]

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