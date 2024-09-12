import global from "../constants/global"
//custom
const LOGIN = `${global.URL_CUSTOM}/wp-json/jwt-auth/v1/token`
const RESET_PASWORD = `${global.URL_CUSTOM}/wp-json/accaunt/v1/reset-password`

//default

const custom = {
    LOGIN,
    RESET_PASWORD
}

export default {
    custom
}