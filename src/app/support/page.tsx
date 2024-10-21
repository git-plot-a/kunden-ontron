import FeedbackPageClientPart from '../components/_pageParts/FeedbackPageClientPart/FeedbackPageClientPart';
import Footer from '../components/_sections/Footer/Footer';
import Header from "../components/_sections/Header/Header"


const PageSupport = async () => {

  

  return (
    <>
      <Header currentPage="support"/>
      <FeedbackPageClientPart />
      <Footer />
    </>
  );
};

export default PageSupport;