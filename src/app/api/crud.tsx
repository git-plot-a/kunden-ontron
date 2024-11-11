import global from "../constants/global"
//custom
const LOGIN = `${global.URL_CUSTOM}/wp-json/jwt-auth/v1/token`
const RESET_PASWORD = `${global.URL_CUSTOM}/wp-json/accaunt/v1/reset-password`
const USER_NEW_PASSWORD = `${global.URL_CUSTOM}/wp-json/account/v1/chagepassword`
const USER_CHANGE = `${global.URL_CUSTOM}/wp-json/account/v1/chageuserdata`
const SERVICE_PREVIEWS = `${global.URL_CUSTOM}/wp-json/platforms/v1/cards`
const SERVICE_AGREEMENTS = `${global.URL_CUSTOM}/wp-json/platforms/v1/`
const DOCUMENTATION_LIST = `${global.URL_CUSTOM}/wp-json/documentation/v1/list`
const COMPANY_USERS  = `${global.URL_CUSTOM}/wp-json/company/v1/users`
const ADD_WP_REQUEST = `${global.URL_CUSTOM}/wp-json/request/v1/add`
//default

const custom = {
    LOGIN,
    RESET_PASWORD,
    USER_NEW_PASSWORD,
    USER_CHANGE,
    SERVICE_PREVIEWS,
    SERVICE_AGREEMENTS,
    DOCUMENTATION_LIST,
    COMPANY_USERS,
    ADD_WP_REQUEST
}

export default {
    custom
}