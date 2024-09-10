// "use client"
// import utils from "../../../utils";

// const email = utils.user.getSavedEmail()

// const password = utils.user.getSavedPassword()

const FIELDS: FiledList = [
  {
    name: "username",
    type: "email",
    value: '',
    // value: email ? email : undefined ,
    placeholder: "E-Mail-Adresse"
  },
  {
    name: "password",
    type: "password",
    // value: password ? password : undefined,
    value: '',
    eyeVisibility: false,
    placeholder: "Passwort"
  },

];


const BUTTON_TITLE = "Einreichen"

export default {
    FIELDS,
    BUTTON_TITLE
}