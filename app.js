import data from "./data.js";

const next = document.getElementById("next");
const switchButton = document.getElementById("switchButton");
const prev = document.getElementById("previous");
const forecastMode = document.getElementById("forecastMode");
const historyMode = document.getElementById("historyMode");


const config = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Solid Fuels",
        borderColor: "rgb(255, 99, 132)",
        data: [],
      },
      {
        label: "gas",
        borderColor: "rgb(54, 162, 235)",
        data: [],
      },
      {
        label: "Electricity",
        borderColor: "rgb(255, 206, 86)",
        data: [],
      },
      {
        label: "Liquid Fuels",
        borderColor: "rgb(75, 192, 192)",
        data: [],
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          ticks: {
            max: 12,
          },
        },
      ],
    },
  },
};

const forecastConfig = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Solid Fuels",
        borderColor: "rgb(255, 99, 132)",
        data: [],
      },
      {
        label: "gas",
        borderColor: "rgb(54, 162, 235)",
        data: [],
      },
      {
        label: "Electricity",
        borderColor: "rgb(255, 206, 86)",
        data: [],
      },
      {
        label: "Liquid Fuels",
        borderColor: "rgb(75, 192, 192)",
        data: [],
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          ticks: {
            max: 12,
          },
        },
      ],
    },
  },
};

const ctx = document.getElementById("historyChart").getContext("2d");
const chart = new Chart(ctx, config);
const forctx = document.getElementById("forecastChart").getContext("2d");
const forchart = new Chart(forctx, forecastConfig);

let start = 0;
let end = 11;

function initialize(start = 0, end = 11) {
  config.data.labels = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((label) => {
      return label.label;
    });

  config.data.datasets[0].data = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((price) => {
      return price["solid fuels"];
    });

  config.data.datasets[1].data = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((price) => {
      return price["gas"];
    });

  config.data.datasets[2].data = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((price) => {
      return price["electricity"];
    });

  config.data.datasets[3].data = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((price) => {
      return price["liquid fuels"];
    });

  chart.update();
}

function forecasteInitialize(start = 0, end = 11) {
  forecastConfig.data.labels = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((label) => {
      return label.label;
    });

  forecastConfig.data.datasets[0].data = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((price) => {
      return price["solid fuels"];
    });

  forecastConfig.data.datasets[1].data = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((price) => {
      return price["gas"];
    });

  forecastConfig.data.datasets[2].data = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((price) => {
      return price["electricity"];
    });

  forecastConfig.data.datasets[3].data = data
    .filter((price, i) => {
      return i >= start && i <= end;
    })
    .map((price) => {
      return price["liquid fuels"];
    });

  forchart.update();
}

initialize();
forecasteInitialize();



next.addEventListener("click", () => {
  let totalSets = data.length;
  if (end >= totalSets) {
    alert("There are no more data");
    return;
  }
  start = end + 1;
  end += 12;

  initialize(start, end);
});

switchButton.addEventListener("click", () => {
  if (forecastMode.classList.contains("ds")){
    switchButton.innerHTML = "History Mode"
    forecastMode.classList.remove("ds")
    historyMode.classList.add("ds")
  }else{
    switchButton.innerHTML = "Forecast Mode"
    forecastMode.classList.add("ds")
    historyMode.classList.remove("ds")
  }
});


prev.addEventListener("click", () => {
  if (start <= 0) {
    alert("There are no more data");
    return
  }

    start -= 12;
    end -= 12;

    initialize(start, end);
});
