"use client"

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import Container from './components/_layout/Container/Container';
import Footer from './components/_sections/Footer/Footer';
import Header from "./components/_sections/Header/Header"
import ProductList from './components/_sections/ProductList/ProductList';
import TilesSection from './components/_sections/TilesSection/TilesSection';
import TopOffer from './components/_sections/TopOffer/TopOffer';
import useSendQuery from './hooks/sendQuery/sendQuery';
import useAnimation from './hooks/Animation/Animation';
import api from '@/app/api/crud';
import utils from './utils';


const HomePage = () => {
  const router = useRouter()
  const [services, setServices] = useState<Array<Service>>([])
  const [loading, setLoading] = useState(true)
  const { fetchData } = useSendQuery()
  const activateAnimaiton  = useAnimation()



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
      const servicesRes: Array<Service>  =  await fetchData(api.custom.SERVICE_PREVIEWS, "GET", {}, null, true)    
      setServices(servicesRes)
    }

    if (tocken) {
      getPreviewServices()
    } else {
      utils.user.resetAllData()
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    if (services.length > 0) {
      setLoading(false)
      activateAnimaiton()
    }
  }, [services])



  return <>{!loading && (
    <>
      <Header currentPage='home' />
      <TopOffer title={'<span>Willkommen,</span><br />Erzgebirgsklinikum!'}/>
      <Container>
        <TilesSection />
        <ProductList services={services} />
      </Container>
      <Footer />
    </>
  )}
  </>;
};

export default HomePage;