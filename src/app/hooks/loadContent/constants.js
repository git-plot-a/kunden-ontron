const MAX_LOADING_SIZE = 10485760

const TOO_BIG_FILE = `Die Dateigröße überschreitet die zulässigen ${MAX_LOADING_SIZE/1048576} MB`

const TOO_BIG_CONTENT = `Die Größe der heruntergeladenen Daten überschreitet die zulässigen  ${MAX_LOADING_SIZE/global.BYTES_IN_MB} MB und kann daher nicht gespeichert werden`

const IMPOSSIBLE_TO_CHECK_CONTENT_MEMORY_VALUE = 'Die Größe des Inhalts konnte nicht ermittelt werden, die eingegebenen Daten ändern'

const FILE_NOT_FOULD = 'Die Datei wurde nicht gefunden'

const IMPOSSIBLE_TO_FIRE_ONLOAD_FUNCTION = 'Die angegebene Datei kann nicht verarbeitet werden'

export default {
    TOO_BIG_FILE,
    MAX_LOADING_SIZE,
    FILE_NOT_FOULD,
    IMPOSSIBLE_TO_FIRE_ONLOAD_FUNCTION,
    TOO_BIG_CONTENT,
    IMPOSSIBLE_TO_CHECK_CONTENT_MEMORY_VALUE
}