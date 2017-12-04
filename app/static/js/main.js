var socket = io.connect("http://" + document.domain + ":" + location.port);

var ctx = document.getElementById("pmChart").getContext("2d");
var pmChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      { label: "", data: [], borderColor: "rgba(75,192,192,1)", fill: false },
    ],
  },
  options: {
    responsive: true,
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
  },
});

var city = "Los Angeles";
var parameter = "pm25";

socket.on("new_data", function (data) {
  var filtered = data.filter(function (d) {
    return d.parameter === parameter;
  });
  var values = filtered.map(function (d) {
    return d.value;
  });
  pmChart.data.labels = filtered.map(function (d) {
    return d.location;
  });
  pmChart.data.datasets[0].label = parameter.toUpperCase() + " (" + city + ")";
  pmChart.data.datasets[0].data = values;
  pmChart.update();

  if (values.length > 0) {
    var mean = values.reduce((a, b) => a + b, 0) / values.length;
    var sorted = values.slice().sort((a, b) => a - b);
    var mid = Math.floor(sorted.length / 2);
    var median =
      sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
    document.getElementById("mean").innerText = mean.toFixed(2);
    document.getElementById("median").innerText = median.toFixed(2);
    document.getElementById("count").innerText = values.length;
  }
});

document.getElementById("filterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  city = document.getElementById("city").value;
  parameter = document.getElementById("parameter").value;
  document.getElementById("status").innerText =
    "Currently viewing " + city + " – " + parameter.toUpperCase();
  socket.emit("filter_change", { city: city, parameter: parameter });
});
