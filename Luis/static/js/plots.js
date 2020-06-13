

// Function to build total overview plot of US production/consumption
function buildEnergyPlot() {
  var dataUrl = `/api/v1.0/total_energy`;

  d3.json(dataUrl).then(function (data) {

    // D3 select tag
    var dropdownMenu = d3.select("#selTotalEnergy");
    // Assign the value of the dropdown menu option to a variable
    var totalEnergySelection = dropdownMenu.property("value");
    // Set up data for production and consumption
    var productionData = data[0];
    var consumptionData = data[1];
    var dataset = []
  
    // Check to see what value is selected in the table
    if (totalEnergySelection == 'production') {
        dataset = productionData;
        var titleName = "Total US Production Breakdown by Source"
        
    }
    else if (totalEnergySelection == 'consumption') {
      dataset = consumptionData;
      var titleName = "Total US Consumption Breakdown by Source"
    }

    // Loop through keys in dataset and delete _id key so we dont plot it
    var keys = Object.keys(dataset)
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === '_id') {
        keys.splice(i, 1);
      }
    };

    // Plot chart
    var traces = []

    // Loop through each key in dictionary and create a trace which is stored in traces (list)
    keys.forEach(function(key){
      var trace = {
        type: "scatter",
        mode: "lines",
        name: key,
        x: dataset[key].series[0].data.map(row => row[0]),
        y: dataset[key].series[0].data.map(row => row[1])
      }
      traces.push(trace)

    });

    // Create properties for layout of graph
    var layout = {
      title: titleName,
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

    Plotly.newPlot("totalUSplot", traces, layout);

  });
}

// On change to the DOM, call buildEnergyPlot()
d3.selectAll("#selTotalEnergy").on("change", buildEnergyPlot());


buildEnergyPlot();


// // Initialize the dashboard
// init();
