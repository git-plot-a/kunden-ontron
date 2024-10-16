import Container from './components/_layout/Container/Container';
import Footer from './components/_sections/Footer/Footer';
import Header from "./components/_sections/Header/Header"
import ProductList from './components/_sections/ProductList/ProductList';
import TilesSection from './components/_sections/TilesSection/TilesSection';
import TopOffer from './components/_sections/TopOffer/TopOffer';


const HomePage = async () => {

  return (
    <>
      <Header currentPage='home' />
      <TopOffer />
      <Container>
        <TilesSection />
        <ProductList/>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;