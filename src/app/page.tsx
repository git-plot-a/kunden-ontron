import HeaderMeta from './components/_pageParts/HeaderMeta/HeaderMeta';
import HomePageClientPart from './components/_pageParts/HomePageClientPart/HomePageClientPart';

const HomePage = async () => {
  
  const metadata = await {title: 'Kunden area', description:'test description', keywords: '', image: ''}
  return (
    <>
      <HeaderMeta metadata={metadata} />
      <HomePageClientPart/>
    </>
  );
};

export default HomePage;