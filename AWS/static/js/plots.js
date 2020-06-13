function buildPlot() {
  var dataUrl = `/api/v1.0/total_energy`;


  d3.json(dataUrl).then(function (data) {
    // Grab values from the response json object to build the plots
    var productionData = data[0];
    var consumptionData = data[1];
    console.log(productionData)
    console.log(consumptionData)

    var keys = Object.keys(productionData)
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === '_id') {
        keys.splice(i, 1);
      }
    };
    console.log(keys)

    var traces = []

    keys.forEach(function(key){
      var trace = {
        type: "scatter",
        mode: "lines",
        name: key,
        x: productionData[key].series[0].data.map(row => row[0]),
        y: productionData[key].series[0].data.map(row => row[1])
      }
      traces.push(trace)

    });
    console.log(traces)

    var dataPlot = traces;

    var layout = {
      title: 'Production Data',
      xaxis: {
        title: "Year",
        type: "date",
      },
      yaxis: {
        title: 'Trillion Btu',
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", dataPlot, layout);

  });
}

buildPlot();


// // Initialize the dashboard
// init();
