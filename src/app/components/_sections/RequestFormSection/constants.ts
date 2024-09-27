const TITLE = 'Wie können wir Ihnen heute helfen?'

const RESULTS: Array<formSendResult> = [
    {
        success: true,
        text: 'Vielen Dank für Ihre Anfrage.<br>Wir werden sie bearbeiten und uns innerhalb von 4 Stunden zurückmelden',
        img: '/img/decore2.svg'

    },
    {
        success: false,
        text: 'Leider ging etwas schief.... später erneut versuchen',
        img: '/img/decore3.svg'
    }
]

const ADITIONAL_INFO = 'Ihr aktueller Support-Level ist <span>Bronze</span> Um schneller Lösungen zu erhalten, sollten Sie ein Upgrade auf einen höheren Support-Level. <a href="/">Mehr erfahren </a>'

export default {
    TITLE,
    RESULTS,
    ADITIONAL_INFO
}