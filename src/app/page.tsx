import HomePageClientPart from './components/_pageParts/HomePageClientPart/HomePageClientPart';
import Container from './components/_layout/Container/Container';
import  Footer  from './components/_sections/Footer/Footer';
import Header from "./components/_sections/Header/Header"

const HomePage = async () => {

  return (
    <>
      <Header/>
      <Container>
        <HomePageClientPart />
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;