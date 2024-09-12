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

const LINKS = [
  '<spana>Haben Sie Ihr <a href="/resetpass">Passwort vergessen?</a></spana>'
]

const INCORRECT_LOGON_OR_PASSWORD = 'Ungültiges Login oder Passwort'

const SOMETHING_WENT_WRONG_TEXT = 'Etwas ist schief gelaufen. Kontaktieren Sie den Administrator: yulia.arkadeva@plot-a.eu'

export default {
    FIELDS,
    BUTTON_TITLE,
    LINKS,
    INCORRECT_LOGON_OR_PASSWORD,
    SOMETHING_WENT_WRONG_TEXT
}