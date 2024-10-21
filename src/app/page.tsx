"use client"

import { useState, useEffect } from 'react'
import Container from './components/_layout/Container/Container';
import Footer from './components/_sections/Footer/Footer';
import Header from "./components/_sections/Header/Header"
import ProductList from './components/_sections/ProductList/ProductList';
import TilesSection from './components/_sections/TilesSection/TilesSection';
import TopOffer from './components/_sections/TopOffer/TopOffer';
import api from '@/app/api/crud';
import utils from './utils';


const HomePage = () => {
  const [services, setServices] = useState<Array<Service>>([])
  const [loading, setLoading] = useState(true)

  // const services = await getPreviewServices();

  useEffect(()=>{
    const getPreviewServices = async () => {
      const tocken = utils.user.getToken()
      const servicesRes = await fetch(api.custom.SERVICE_PREVIEWS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tocken}`
        },
      });
      if (!servicesRes.ok) {
        throw new Error('Failed to fetch services');
      }
      const services = await servicesRes.json();
      setServices(services)
    }

    getPreviewServices()
  }, [])

  useEffect(()=>{
    if(services.length > 0) {
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