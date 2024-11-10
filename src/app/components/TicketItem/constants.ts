const TITLE = 'Verfolgungsdetails:'

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
    TITLE,
    STYLES,
    PRIORITIES
}