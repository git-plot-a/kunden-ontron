import global from "@/app/constants/global"

const REQUEST_TYPES = global.REQUEST_TYPES

const CATEGORIES = [
    {
        title: 'Category 1',
        value: '1',
    },
    {
        title: 'Category 2',
        value: '2',
    },
    {
        title: 'Category 2',
        value: '3',
    }
]

const PRORITIES = global.PIORITIES

const DEFAULT_DESCRIPTION = 'Beschreiben Sie Ihre Anfrage '

const BUTTON_TEXT = 'Senden'

const TITLE = 'Wie können<br/>wir Ihnen heute helfen?'

export default {
    REQUEST_TYPES,
    CATEGORIES,
    DEFAULT_DESCRIPTION,
    BUTTON_TEXT,
    TITLE,
    PRORITIES
}