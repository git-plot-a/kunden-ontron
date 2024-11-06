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

const PRORITIES = [
    {
        title: 'Notfall',
        value: '1'
    },
    {
        title: 'Hoch',
        value: '2'
    },{
        title: 'Mittel',
        value: '3'
    },{
        title: 'Niedrig',
        value: '4'
    }
]

const DEFAULT_DESCRIPTION = 'Beschreiben Sie Ihre Anfrage '

const BUTTON_TEXT = 'Senden'

const TITLE = 'Wie können wir Ihnen heute helfen?'

export default {
    REQUEST_TYPES,
    CATEGORIES,
    DEFAULT_DESCRIPTION,
    BUTTON_TEXT,
    TITLE,
    PRORITIES
}