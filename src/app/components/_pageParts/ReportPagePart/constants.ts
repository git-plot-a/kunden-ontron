import global from "@/app/constants/global";
const TIMELINE_INTERVAL = ["day", "week", "month", "year"];

const PERIOD_TYPES = [
  "today",
  "this_week",
  "this_month",
  "last_3_month",
  "last_year",
];

const REQUEST_TYES_DESTRIBUTIONS_TITLE = "Verteilung der Anfragetypen";

const PRIORITIES = global.PIORITIES;

const AVERAGETIME_TO_RESPONCE = "Durchschnittliche Reaktionszeit";

const NOT_DATA_SIGN =
  "Es gibt noch nicht genügend Daten für die Diagramme...<br> Die Berichte werden verfügbar sein, sobald die Daten gesammelt sind.";

const LOADING_IS_IN_PROCESS =
  "Der Prozess des Ladens von Daten ist im Gange...";

const GENERAL_REQUEST_QUNATITY = "Gesamtzahl der Anfragen";

const RESOLVED_TICKETS_TITLE = "Gelöste Tickets";

const RESOLVED_ON_TIME_TITLE = 'Rechtzeitig gelöst'

const RESOLVED_NOT_ON_TIME_TITLE = 'Nicht fristgerecht gelöste Tickets'

const AVERAGE_TIME = 'Durchschnittlicher Zeitaufwand in Stunden'

const NOT_ENOUGH_DATA_FOR_DAIAGRAM = 'Unzureichende Daten für das Diagramm...'

const REQUEST_TYPES = global.REQUEST_TYPES

//test

const DOUGHNUT = {
  data: {
    labels: [
      "Category A",
      "Category B",
      "Category C",
      "Category D",
      "Category E",
    ],
    datasets: [
      {
        data: [79, 92, 24, 24, 32],
        backgroundColor: [
          "#009EE3",
          "#FF9051",
          "#A1D0B0",
          "#00486E",
          "#49bef1",
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 31,
          boxHeight: 11,
          padding: 18,
          color: "#000000",
          font: {
            family: "Poppins, sans-serif",
            size: 14,
            weight: 200,
            lineHeight: 1.5,
          },
        },
        position: "right",
      },
      title: {
        display: false,
      },
    },
  },
};


const LINE_EXUMAPLE2_TITLE = "Request resolved";

const LINE_EXUMAPLE2 = {
  data: {
    labels: [
      "Oct 8",
      "Oct 10",
      "Oct 12",
      "Oct 14",
      "Oct 16",
      "Oct 18",
      "Oct 20",
      "Oct 22",
      "Oct 24",
      "Oct 26",
      "Oct 28",
      "Oct 30",
      "Nov 1",
      "Nov 3",
      "Nov 5",
    ],
    datasets: [
      {
        label: "Group 2",
        data: [100, 100, 80, 81, 56, 55],
        backgroundColor: "#009EE3",
        borderColor: "#009EE3",
        borderWidth: 1.5,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          padding: 20,
        },
      },
      title: { display: false, text: "First Time to Response" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number) {
            return value;
          },
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
    },
  },
};

const OPTIONS_BAR = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "#009EE3",
        borderWidth: 0,
      },
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "#FF9051",
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 11,
          boxHeight: 11,
          color: "#000000",
          padding: 40,
          font: {
            family: "Poppins, sans-serif",
            size: 14,
            weight: 200,
            lineHeight: 1.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  },
};

const OPTIONS_BAR_SMALL = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Durchschnittliche Dauer der Lösung",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "#009EE3",
        borderWidth: 0,
      }
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
  },
};

export default {
  DOUGHNUT,
  LINE_EXUMAPLE2_TITLE,
  LINE_EXUMAPLE2,
  //PROD
  TIMELINE_INTERVAL,
  PERIOD_TYPES,
  REQUEST_TYES_DESTRIBUTIONS_TITLE,
  PRIORITIES,
  AVERAGETIME_TO_RESPONCE,
  NOT_DATA_SIGN,
  LOADING_IS_IN_PROCESS,
  GENERAL_REQUEST_QUNATITY,
  RESOLVED_TICKETS_TITLE,
  OPTIONS_BAR,
  OPTIONS_BAR_SMALL,
  RESOLVED_ON_TIME_TITLE,
  RESOLVED_NOT_ON_TIME_TITLE,
  AVERAGE_TIME,
  NOT_ENOUGH_DATA_FOR_DAIAGRAM,
  REQUEST_TYPES
};
