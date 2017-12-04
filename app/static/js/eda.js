// Basic historical chart and interactive histogram setup for the EDA page

var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var pm25 = [15, 22, 18, 25, 30, 20, 19];
var pm10 = [30, 45, 38, 52, 58, 43, 40];
var o3 = [10, 12, 15, 14, 13, 16, 11];

// Chart.js bar chart
var ctx = document.getElementById("histChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: days,
    datasets: [
      { label: "PM2.5", backgroundColor: "rgba(75,192,192,0.5)", data: pm25 },
      { label: "PM10", backgroundColor: "rgba(255,99,132,0.5)", data: pm10 },
      { label: "O3", backgroundColor: "rgba(255,206,86,0.5)", data: o3 },
    ],
  },
  options: {
    responsive: true,
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
  },
});

// D3 histogram
var data = pm25;
var margin = { top: 20, right: 30, bottom: 40, left: 40 },
  width = 800 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var svg = d3
  .select("#histogram")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, width]);
var bins = d3.histogram().domain(x.domain()).thresholds(x.ticks(10))(data);
var y = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(bins, function (d) {
      return d.length;
    }),
  ])
  .range([height, 0]);

svg
  .selectAll(".bar")
  .data(bins)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function (d) {
    return x(d.x0);
  })
  .attr("y", function (d) {
    return y(d.length);
  })
  .attr("width", function (d) {
    return x(d.x1) - x(d.x0) - 1;
  })
  .attr("height", function (d) {
    return height - y(d.length);
  });

svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));
svg.append("g").call(d3.axisLeft(y));
