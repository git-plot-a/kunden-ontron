import HeaderMeta from '../components/_pageParts/HeaderMeta/HeaderMeta';
import ResetPassPageClientPart from '../components/_pageParts/ResetPassPageClientPart/ResetPassPageClientPart';
// import UserFrom from '../components/_forms/UserForm/UserFrom';

const ResetPassPage = async () => {

  const metadata = await {title: 'Reset password', description:'test', keywords: '', image: ''}

  return (
    <>
      <HeaderMeta metadata={metadata} />
      <ResetPassPageClientPart/>
      {/* <UserFrom/> */}
    </>
  );
};

export default ResetPassPage;