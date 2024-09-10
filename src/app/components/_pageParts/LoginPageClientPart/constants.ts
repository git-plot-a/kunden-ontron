"use client"
import utils from "../../../utils";

const email = utils.user.getSavedEmail()

const password = utils.user.getSavedPassword()

const FIELDS: FiledList = [
  {
    name: "username",
    type: "email",
    value: email ? email : undefined ,
    placeholder: "E-Mail-Adresse"
  },
  {
    name: "password",
    type: "password",
    value: password ? password : undefined,
    eyeVisibility: false,
    placeholder: "Passwort"
  },

];


const BUTTON_TITLE = "Einreichen"

export default {
    FIELDS,
    BUTTON_TITLE
}