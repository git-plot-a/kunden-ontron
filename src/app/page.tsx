import HomePageClientPart from './components/_pageParts/HomePageClientPart/HomePageClientPart';
import Footer from './components/_sections/Footer/Footer';
import Header from "./components/_sections/Header/Header"

const HomePage = async () => {

  return (
    <>
      <Header />
      <HomePageClientPart />
      <Footer />
    </>
  );
};

export default HomePage;