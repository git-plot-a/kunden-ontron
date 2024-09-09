import HeaderMeta from '../components/_pageParts/HeaderMeta/HeaderMeta';
import UserFrom from '../components/_forms/UserForm/UserFrom';

const LoginPage = async () => {
  const metadata = await {title: 'Anmeldung', description:'test', keywords: '', image: ''}


  return (
    <>
      <HeaderMeta metadata={metadata} />
      <h1>Login</h1>
      <UserFrom/>
    </>
  );
};

export default LoginPage;