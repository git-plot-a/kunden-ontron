const REQUEST_TYPES: Array<DropDownList> = [
    {
        title: 'Eine Frage stellen',
        value: "8",
        description: 'Haben Sie eine Frage? Reichen Sie sie hier ein.'
    },
    // {
    //     title: 'Einreichen einer Anfrage oder eines Vorfalls',
    //     value: 6,
    //     description: 'Reichen Sie eine Anfrage ein oder melden Sie ein Problem.'
    // },
    {
        title: 'Anfrage per E-Mail',
        value: "10",
        description: 'Anfrage über Ihren E-Mail-Supportkanal erhalten.'
    },
    {
        title: 'Serviceanfrage',
        value: "15",
    },
    {
        title: 'Vorfall',
        value: "14",
    },
    {
        title: 'Feedback oder Anregung',
        value: "13",
    }
]

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

const DEFAULT_DESCRIPTION = 'Beschreiben Sie Ihre Anfrage '

const BUTTON_TEXT = 'Senden'

const TITLE = 'Wie können wir Ihnen heute helfen?'

export default {
    REQUEST_TYPES,
    CATEGORIES,
    DEFAULT_DESCRIPTION,
    BUTTON_TEXT,
    TITLE
}