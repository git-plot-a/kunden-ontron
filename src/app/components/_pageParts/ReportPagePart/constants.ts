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

const RESOLVED_TICKETS_TITLE = "Aufgelöste Tickets";

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

const BAR = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Sales" },
    },
  },
};

const LINE = {
  data: {
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          { x: 10, y: 58.29 },
          { x: 66.58, y: 13.66 },
          { x: 83.96, y: 44.89 },
          { x: 81.45, y: 69.43 },
          { x: 34.86, y: 41.02 },
          { x: 34.4, y: 70.43 },
          { x: 78.74, y: 92.07 },
          { x: 77.92, y: 7.39 },
          { x: 39.95, y: 53.31 },
          { x: 30.85, y: 38.48 },
          { x: 39.95, y: 90.51 },
          { x: 40.89, y: 9.26 },
          { x: 26.24, y: 46.0 },
          { x: 8.47, y: 34.17 },
          { x: 94.71, y: 12.22 },
          { x: 64.98, y: 59.99 },
          { x: 75.83, y: 24.14 },
          { x: 29.11, y: 41.54 },
          { x: 2.27, y: 48.08 },
          { x: 91.14, y: 49.64 },
          { x: 69.65, y: 18.53 },
          { x: 2.39, y: 6.33 },
          { x: 36.28, y: 49.74 },
          { x: 36.14, y: 38.63 },
          { x: 42.55, y: 40.83 },
          { x: 89.27, y: 89.71 },
          { x: 18.89, y: 6.53 },
          { x: 86.35, y: 55.56 },
          { x: 25.08, y: 85.52 },
          { x: 15.08, y: 83.58 },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Dynamic Monthly Sales" },
    },
  },
};

const LINE_EXUMAPLE1_TITLE = "First Time to Response";

const LINE_EXUMAPLE1 = {
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
        label: "Time to Responce",
        data: [100, 100, 80, 81, 56, 55],
        backgroundColor: "#009ee3",
        borderColor: "#009ee3",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false, text: "First Time to Response" },
    },
    scales: {
      y: {
        beginAtZero: true, // ось Y начинается с 0
        ticks: {
          callback: function (value: number) {
            return value + "%"; // добавление символа процента к каждому значению
          },
        },
      },
      x: {
        ticks: {
          autoSkip: true, // автоматическое пропускание меток, если их много
          maxTicksLimit: 20, // ограничение количества меток на оси X
        },
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
        // borderColor: "#009ee3",
        borderWidth: 0,
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
        backgroundColor: "#FF9051",
        borderWidth: 0,
      },

      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "#009EE3",
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

export default {
  DOUGHNUT,
  BAR,
  LINE,
  LINE_EXUMAPLE1,
  LINE_EXUMAPLE1_TITLE,
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
};
