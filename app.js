// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var source = d3.select("#sourceInput").node().value;
  console.log(source);

  // clear the input value
  d3.select("#sourceInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(source);
}

function buildPlot(source) {
  var apiKey = "db4db849e54451f23e4b892a0044d047";
  var energySources = ['TOTAL.CLPRBUS.A','TOTAL.PAPRBUS.A','TOTAL.GETCBUS.A','TOTAL.HVTCBUS.A','TOTAL.NGPRBUS.A','TOTAL.NLPRBUS.A','TOTAL.NUETBUS.A','TOTAL.SOTCBUS.A','TOTAL.WYTCBUS.A']

  var url = `http://api.eia.gov/series/?api_key=${apiKey}&series_id=${energySources[source]}`;
  console.log(url)

  d3.json(url).then(function(data) {
    // Grab values from the response json object to build the plots
    var energyData = data.series[0].data;
    console.log(energyData)
    console.log(energyData.length)

    var dates = energyData.map(row => row[0]);
    console.log(dates);
    var production = energyData.map(row => row[1]);
    console.log(production);
    var startDate = data.series[0].start;
    var endDate = data.series[0].end;

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: production,
      line: {
        color: "#17BECF"
      }
    };

    var dataPlot = [trace1];

    var layout = {
      title: `${data.series[0].name}`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", dataPlot, layout);

  });
}

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
