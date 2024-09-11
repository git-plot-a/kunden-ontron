import HeaderMeta from '../components/_pageParts/HeaderMeta/HeaderMeta';
import LoginPageClientPart from '../components/_pageParts/LoginPageClientPart/LoginPageClientPart';

const LoginPage = async () => {
  
  const metadata = await {title: 'Anmeldung', description:'test', keywords: '', image: ''}

  

  return (
    <>
      <HeaderMeta metadata={metadata} />
      <LoginPageClientPart/>
    </>
  );
};

export default LoginPage;