"use client"

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import Container from './components/_layout/Container/Container';
import Footer from './components/_sections/Footer/Footer';
import Header from "./components/_sections/Header/Header"
import ProductList from './components/_sections/ProductList/ProductList';
import TilesSection from './components/_sections/TilesSection/TilesSection';
import TopOffer from './components/_sections/TopOffer/TopOffer';
import api from '@/app/api/crud';
import utils from './utils';


const HomePage = () => {
  const router = useRouter()
  const [services, setServices] = useState<Array<Service>>([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    console.log(utils.user.getToken())
    if (!utils.user.getToken()) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const tocken = utils.user.getToken()
    const getPreviewServices = async () => {
      const servicesRes = await fetch(api.custom.SERVICE_PREVIEWS, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${tocken}`
        },
      });
      if (!servicesRes.ok) {
        throw new Error('Failed to fetch services');
      }
      const services = await servicesRes.json();
      setServices(services)
    }

    if (tocken) {
      getPreviewServices()
    } else {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    if (services.length > 0) {
      setLoading(false)
    }
  }, [services])



  return <>{!loading && (
    <>
      <Header currentPage='home' />
      <TopOffer />
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