const EVENT_LIST_TITLE = 'Verfolgungsdetails:'

const CREATED_TITLE = 'Ticket erstellt'

const RESOLUTION_DATE = 'Ticket-Auflösung'

const EXPECTED_REOLUTION_DATE = 'Erwartete Lösungszeit'

const FIRST_RESPONCE = 'Erste Antwort innerhalb von <span>8</span> Stunden'

const SUPPORT_LEVEL = ' Ihr aktuelles Support-Level ist <span>Bronze</span>. Um schneller Lösungen zu erhalten, erwägen Sie ein Upgrade auf ein höheres Support-Level <a href="/platforms" class="link">Mehr erfahren ></a>'

const STYLES : {[key: string] : string} = {
    'todo' : 'Zu tun',
    'done' : 'Fertig',
    'inprogress' : 'In Bearbeitung',
    'blocked' : 'Gesperrt'
}

const PRIORITIES: {[key: string] : string} = {
    highest: 'Notfall',
    high: 'Hoch',
    medium: 'Mittel',
    low: 'Niedrig'
}

export default {
    EVENT_LIST_TITLE,
    STYLES,
    PRIORITIES,
    CREATED_TITLE,
    RESOLUTION_DATE,
    EXPECTED_REOLUTION_DATE,
    FIRST_RESPONCE,
    SUPPORT_LEVEL
}