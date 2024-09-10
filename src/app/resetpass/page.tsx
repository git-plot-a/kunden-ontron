import HeaderMeta from '../components/_pageParts/HeaderMeta/HeaderMeta';
// import UserFrom from '../components/_forms/UserForm/UserFrom';

const ResetPassPage = async () => {

  const metadata = await {title: 'Reset password', description:'test', keywords: '', image: ''}

  return (
    <>
      <HeaderMeta metadata={metadata} />
      <h1>Reset password page</h1>
      {/* <UserFrom/> */}
    </>
  );
};

export default ResetPassPage;