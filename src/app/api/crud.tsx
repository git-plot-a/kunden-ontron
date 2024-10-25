import global from "../constants/global"
//custom
const LOGIN = `${global.URL_CUSTOM}/wp-json/jwt-auth/v1/token`
const RESET_PASWORD = `${global.URL_CUSTOM}/wp-json/accaunt/v1/reset-password`
const USER_NEW_PASSWORD = `${global.URL_CUSTOM}/wp-json/account/v1/chagepassword`
const USER_CHANGE = `${global.URL_CUSTOM}/wp-json/account/v1/chageuserdata`
const SERVICE_PREVIEWS = `${global.URL_CUSTOM}/wp-json/platforms/v1/cards`
const SERVICE_AGREEMENTS = `${global.URL_CUSTOM}/wp-json/platforms/v1/`

//default

const custom = {
    LOGIN,
    RESET_PASWORD,
    USER_NEW_PASSWORD,
    USER_CHANGE,
    SERVICE_PREVIEWS,
    SERVICE_AGREEMENTS
}

export default {
    custom
}