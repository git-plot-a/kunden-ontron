const REMEMBER_ME_LABEL = "Login-Daten für die Zukunft speichern"

const FIELDS: FiledList = [
  {
    name: "username",
    type: "email",
    value: '',
    placeholder: "E-Mail-Adresse"
  },
  {
    name: "password",
    type: "password",
    value: '',
    eyeVisibility: false,
    placeholder: "Passwort"
  },

  {
    name: "rememberme",
    type:"checkbox",
    value: false,
    placeholder: REMEMBER_ME_LABEL,
  },
];


const BUTTON_TITLE = "Einreichen"

export default {
    FIELDS,
    BUTTON_TITLE
}