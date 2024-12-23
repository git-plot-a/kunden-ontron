const TITLE = 'Wie können<br/>wir Ihnen heute helfen?'

const RESULTS: Array<formSendResult> = [
    {
        success: true,
        text: 'Vielen Dank für Ihre Anfrage.<br/>Wir werden diese bearbeiten und uns<br/>innerhalb von <span>4</span> Stunden bei Ihnen melden.',
        img: '/img/decore_img2.svg'

    },
    {
        success: false,
        text: 'Leider ging etwas schief.... später erneut versuchen',
        img: '/img/decore_img3.svg'
    }
]

const ADITIONAL_INFO = 'Ihr aktuelles Support-Level ist   <span>Bronze</span>   Um schneller Lösungen zu erhalten, erwägen Sie ein Upgrade auf<br/>ein höheres Support-Level. <a href="/platforms">Mehr erfahren ></a>'


export default {
    TITLE,
    RESULTS,
    ADITIONAL_INFO
}