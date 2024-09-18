const TITLE = 'Wie können wir Ihnen heute helfen?'

const RESULTS: Array<formSendResult> = [
    {
        success: true,
        text: 'Vielen Dank für Ihre Anfrage.<br>Wir werden sie bearbeiten und uns innerhalb von 4 Stunden zurückmelden',
        img: '/img/succes_result_image.svg'

    },
    {
        success: false,
        text: 'Leider ging etwas schief.... später erneut versuchen',
        img: '/img/succes_result_image.svg'
    }
]

const ADITIONAL_INFO = 'Ihr aktueller Support-Level ist <span>Bronze</span> Um schneller Lösungen zu erhalten, sollten Sie ein Upgrade auf einen höheren Support-Level. <a href="/">Mehr erfahren </a>'

export default {
    TITLE,
    RESULTS,
    ADITIONAL_INFO
}