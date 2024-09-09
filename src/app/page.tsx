import HeaderMeta from './components/_pageParts/HeaderMeta/HeaderMeta';

const HomePage = async () => {
  const metadata = await {title: 'Kunden area', description:'test description', keywords: '', image: ''}


  return (
    <>
      <HeaderMeta metadata={metadata} />
      <h1>Welcome to the page with authorized access</h1>
    </>
  );
};

export default HomePage;