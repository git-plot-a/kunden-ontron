import global from '../constants/global'

const MAX_LOADING_SIZE = global.MAX_LOADING_FILE_SIZE

const MAX_LOADING_SIZE_IN_MEGABITES = MAX_LOADING_SIZE / global.BYTES_IN_MB

const SEARCH_VALIDATION = 'Dieses Feld darf keine Sonderzeichen enthalten'
const SLUG = 'Dieses Feld darf nur Kleinbuchstaben und das Symbol "-" enthalten'
const PASSWORD =
  'Das Passwort erfüllt nicht die Sicherheitsanforderungen: Das Passwort muss mindestens 12 Zeichen lang sein, aus Groß- oder Kleinbuchstaben bestehen, Sonderzeichen ( !^()#$%&? ), kann Zahlen enthalten'
const PASSWORDS_DONT_MATCH = 'Passwörter müssen übereinstimmen'
const TITLE = 'Der Feldwert enthält ungültige Zeichen/Zeichenkombinationen'
const MIN_LENGTH = 'Länge des Wertes unter dem Minimum'
const EMAIL = 'Die eingegebenen Daten sehen nicht wie eine E-Mail aus'
const NOT_ONLY_WHITESPACE =
  'Der Wert in diesem Feld darf nicht nur aus Leerzeichen bestehen'
const UNAVALIBLE_SYMBOLS = 'Ungültige Zeichen verwendet'
const MAX_LENGTH = 'Maximale Länge überschritten'
const REQUIRED_FIELD = 'Dieses Feld ist obligatorisch'
const TITLE_NOT_ONLY_SYMBOLS = 'Das Feld darf nicht nur diese Zeichen enthalten'
const INCORRECT_AUTHOR =
  'Es konn   ten keine korrekten Daten über den Autor des Kommentars ermittelt werden'
const INCORRECT_POST =
  'Die korrekten Publikationsdaten konnten nicht ermittelt werden'
const TOO_BIG_CONTENT = `Die Größe der heruntergeladenen Daten überschreitet die zulässigen  ${MAX_LOADING_SIZE_IN_MEGABITES} MB und kann daher nicht gespeichert werden`
const INCORRECT_COMMNET_ID =
  'Der bearbeitbare Kommentar konnte nicht identifiziert werden'
const INCORRECT_COMMENT_PARENT =
  'Das übergeordnete Element des Antwortkommentars wurde nicht korrekt angegeben'
const NOT_ALLOWED_IMAGE_TYPES =
  'Es werden nur die folgenden Formate akzeptiert: .jpeg, .jpg, .png'
const LOGIN_INCORRECT_FORM = 'Die von Ihnen eingegebene Anmeldung hat ein falsches Format'


export default {
  SEARCH_VALIDATION,
  SLUG,
  PASSWORD,
  PASSWORDS_DONT_MATCH,
  TITLE,
  MIN_LENGTH,
  REQUIRED_FIELD,
  EMAIL,
  NOT_ONLY_WHITESPACE,
  UNAVALIBLE_SYMBOLS,
  MAX_LENGTH,
  TITLE_NOT_ONLY_SYMBOLS,
  INCORRECT_AUTHOR,
  INCORRECT_POST,
  TOO_BIG_CONTENT,
  MAX_LOADING_SIZE,
  INCORRECT_COMMNET_ID,
  INCORRECT_COMMENT_PARENT,
  MAX_LOADING_SIZE_IN_MEGABITES,
  NOT_ALLOWED_IMAGE_TYPES,
  LOGIN_INCORRECT_FORM 
}
