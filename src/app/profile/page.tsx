import Header from "../components/_sections/Header/Header"
import Footer from "../components/_sections/Footer/Footer"
import UserEditForm from "../components/_forms/UserEditForm/UserEditForm"

const ProfilePage = async () => {


    return <>
        <Header currentPage={"profile"}/>
        <UserEditForm />
        <Footer />
    </>
}

export default ProfilePage