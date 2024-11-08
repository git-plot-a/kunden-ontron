import { string } from "yup"

const TITLE = 'Verfolgungsdetails:'

const STYLES : {[key: string] : string} = {
    'todo' : 'Zu tun',
    'done' : 'Fertig',
    'inprogress' : 'In Bearbeitung',
    'blocked' : 'Gesperrt'
}

export default {
    TITLE,
    STYLES
}