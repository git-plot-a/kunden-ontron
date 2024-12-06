const URL_STANDART =
  "https://server.kunden.ontron.wissen-lernen.eu/wp-json/wp/v2";
const URL_CUSTOM = "https://server.kunden.ontron.wissen-lernen.eu";
const MAX_LOADING_FILE_SIZE = 10485760;
const BYTES_IN_MB = 1048576;

const JIRA_URL = process.env.NEXT_PUBLIC_API_URL as string;
const JIRA_USER = process.env.NEXT_PUBLIC_API_USER as string;
const JIRA_TOCKEN = process.env.NEXT_PUBLIC_API_TOKEN as string;

const JIRA_SERVER_RESPONCE = "Antwort des Servers: ";

const REQUEST_TYPES: Array<DropDownList> = [
  {
    title: "Eine Frage stellen",
    value: "8",
    description: "Haben Sie eine Frage? Reichen Sie sie hier ein.",
  },
  // {
  //     title: 'Einreichen einer Anfrage oder eines Vorfalls',
  //     value: 6,
  //     description: 'Reichen Sie eine Anfrage ein oder melden Sie ein Problem.'
  // },
  // {
  //   title: "Anfrage per E-Mail",
  //   value: "10",
  //   description: "Anfrage über Ihren E-Mail-Supportkanal erhalten.",
  // },
  {
    title: "Serviceanfrage",
    value: "15",
  },
  {
    title: "Incident",
    value: "14",
  },
  {
    title: "Feedback oder Anregung",
    value: "13",
  },
];

const FILE_TYPES_FOR_IMAGES = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const TAB_NAMES = ['Beschreibung', 'Inhalts-Support-Level', 'Plattformen-Support-Level']

const PIORITIES = [
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

export default {
  URL_STANDART,
  URL_CUSTOM,
  MAX_LOADING_FILE_SIZE,
  BYTES_IN_MB,
  JIRA_URL,
  JIRA_USER,
  JIRA_TOCKEN,
  JIRA_SERVER_RESPONCE,
  REQUEST_TYPES,
  FILE_TYPES_FOR_IMAGES,
  TAB_NAMES,
  PIORITIES
};
