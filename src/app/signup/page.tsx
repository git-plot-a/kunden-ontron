// import UserFrom from '../components/_forms/UserForm/UserFrom';
import HeaderMeta from '../components/_pageParts/HeaderMeta/HeaderMeta';

const SignUpPage = async () => {

  const metadata = await {title: 'Sign up', description:'test', keywords: '', image: ''}

  return (
    <>
      <HeaderMeta metadata={metadata} />
      <h1>Sign up page</h1>
      {/* <UserFrom/> */}
    </>
  );
};

export default SignUpPage;