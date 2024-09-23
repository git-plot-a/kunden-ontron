const URL_STANDART = "https://server.kunden.ontron.wissen-lernen.eu/wp-json/wp/v2"
const URL_CUSTOM = "https://server.kunden.ontron.wissen-lernen.eu"
const MAX_LOADING_FILE_SIZE = 10485760
const BYTES_IN_MB = 1048576

const JIRA_URL = process.env.NEXT_PUBLIC_API_URL as string
const JIRA_USER = process.env.NEXT_PUBLIC_API_USER as string
const JIRA_TOCKEN = process.env.NEXT_PUBLIC_API_TOKEN as string

const JIRA_SERVER_RESPONCE = "Antwort des Servers: "

export default {
  URL_STANDART,
  URL_CUSTOM,
  MAX_LOADING_FILE_SIZE,
  BYTES_IN_MB,
  JIRA_URL,
  JIRA_USER,
  JIRA_TOCKEN,
  JIRA_SERVER_RESPONCE
};
