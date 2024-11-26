const PIE = {
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
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution of Categories",
      },
    },
  },
};

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
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Category Distribution in Doughnut Format",
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
  data:{
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          { x: 10, y: 58.29 },
          { x: 66.58, y: 13.66 },
          { x: 83.96, y: 44.89 },
          { x: 81.45, y: 69.43 },
          { x: 34.86, y: 41.02 },
          { x: 34.40, y: 70.43 },
          { x: 78.74, y: 92.07 },
          { x: 77.92, y: 7.39 },
          { x: 39.95, y: 53.31 },
          { x: 30.85, y: 38.48 },
          { x: 39.95, y: 90.51 },
          { x: 40.89, y: 9.26 },
          { x: 26.24, y: 46.00 },
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
          { x: 15.08, y: 83.58 }
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5
      }
    ]
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
        backgroundColor: "#009ee3",
        borderColor: "#009ee3",
        borderWidth: 1,
      },
      // {
      //   label: "Group 2",
      //   data: [100, 100, 80, 81, 56, 55],
      //   backgroundColor: "#FF8941",
      //   borderColor: "#FF8941",
      //   borderWidth: 1,
      // },
      // {
      //   label: "Group 3",
      //   data: [100, 100, 80, 81, 56, 55],
      //   backgroundColor: "#5f5f5f",
      //   borderColor: "#5f5f5f",
      //   borderWidth: 1,
      // }
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false, labels: {
        padding: 20, // Отступы между элементами легенды
      }, },
      title: { display: false, text: "First Time to Response" },
    },
    scales: {
      y: {
        beginAtZero: true, // ось Y начинается с 0
        ticks: {
          callback: function (value: number) {
            return value; // добавление символа процента к каждому значению
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

const LINE_EXUMAPLE3_TITLE = "Created requests";

const LINE_EXUMAPLE3 = {
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
        backgroundColor: "#009ee3",
        borderColor: "#009ee3",
        borderWidth: 1,
      },
      {
        label: "Group 2",
        data: [100, 100, 80, 81, 56, 55],
        backgroundColor: "#FF8941",
        borderColor: "#FF8941",
        borderWidth: 1,
      },
      {
        label: "Group 3",
        data: [100, 100, 80, 81, 56, 55],
        backgroundColor: "#5f5f5f",
        borderColor: "#5f5f5f",
        borderWidth: 1,
      }
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
            return value; // добавление символа процента к каждому значению
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


export default {
  PIE,
  DOUGHNUT,
  BAR,
  LINE,
  LINE_EXUMAPLE1,
  LINE_EXUMAPLE1_TITLE,
  LINE_EXUMAPLE2_TITLE,
  LINE_EXUMAPLE2,
  LINE_EXUMAPLE3_TITLE,
  LINE_EXUMAPLE3
};
