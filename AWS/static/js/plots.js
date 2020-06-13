

// FUNCTION TO GET DATA FOR TOTAL OVER OF ENERGY PRODUCTION/CONSUMPTION
function getTotalEnergyData() {
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
      var titlePlot = "Total US Production Breakdown by Source over Time"
      var titlePie = " US Production Breakdown by Source"
    }
    else if (totalEnergySelection == 'consumption') {
      dataset = consumptionData;
      var titlePlot = "Total US Consumption Breakdown by Source over Time"
      var titlePie = " US Consumption Breakdown by Source"
    }
    // Loop through keys in dataset and delete _id key so we dont plot it
    var keys = Object.keys(dataset)
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === '_id') {
        keys.splice(i, 1);
      }
    };

    // Call function to populate dropdownlist with years in data set
    PopulateDropDownListYears(dataset, keys)
    // Call function to build Total Energy Overview Plot
    buildTotalEnergyPlot(dataset, keys, titlePlot);
    // Call function to build Yearly Energy Pie Chart
    buildTotalEnergyPie(dataset, keys, titlePie);
  });
};

// FUNCTION TO POPULATE DROPDOWN MENU WITH ALL YEARS IN TOTAL ENERGY DATA
function PopulateDropDownListYears(dataset, keys) {
  var dates = dataset[keys[0]].series[0].data.map(row => row[0])
  // Create variable containing the selected id 
  var ddlIDs = document.getElementById("selTotalEnergyYear");

  // Loop through and add each year to the DropDownList
  dates.forEach((date) => {
    // Create an option tag
    var option = document.createElement("OPTION");
    // Set subject ID in text property
    option.innerHTML = date;
    // Set subject ID in value property
    option.value = date;
    // Add the option element to DropDownList
    ddlIDs.options.add(option);
  });
};

// FUNCTION TO BUILD LINE CHART FOR TOTAL ENERGY DATA
function buildTotalEnergyPlot(dataset, keys, titlePlot) {
  var traces = []
  // Loop through each key in dictionary and create a trace which is stored in traces (list)
  keys.forEach(function (key) {
    var trace = {
      type: "scatter",
      mode: "lines",
      name: key,
      x: dataset[key].series[0].data.map(row => row[0]),
      y: dataset[key].series[0].data.map(row => row[1])
    }
    traces.push(trace)
  });

  // Create Plot
  var layout = {
    title: titlePlot,
    xaxis: {
      title: "Year",
      type: "date",
    },
    yaxis: {
      title: 'Trillion BTUs (British Thermal Unit)',
      autorange: true,
      type: "linear"
    }
  };

  Plotly.newPlot("totalUSplot", traces, layout);
};

// FUNCTION TO BUILD PIE CHART FOR TOTAL ENERGY DATA
function buildTotalEnergyPie(dataset, keys, titlePie) {
  // D3 select tag
  var dropdownMenu = d3.select("#selTotalEnergyYear");
  // Assign the value of the dropdown menu option to a variable
  var totalEnergySelectionYear = dropdownMenu.property("value");
  energyValues = []

  // Loop through and get energy values for selected year in dropdown
  for (var i = 0; i < keys.length; i++) {
    dates = dataset[keys[i]].series[0].data.map(row => row[0])
    index = dates.indexOf(totalEnergySelectionYear)
    energyValue = dataset[keys[i]].series[0].data[index][1]
    energyValues.push(energyValue)
  };

  // Create Pie Chart
  var data = [{
    values: energyValues,
    labels: keys,
    type: "pie"
  }];
  var layout = {
    title: totalEnergySelectionYear + titlePie
  };

  Plotly.newPlot("totalUSpie", data, layout)
};


getTotalEnergyData();

function getStateSunburstData() {
  var dataUrl = '/api/v1.0/state_energy';

  console.log(dataUrl);

  Plotly.d3.json(dataUrl, function(err, data){
  
    console.log(data);

    delete data[0]._id;
    delete data[1]._id;

    console.log(data[0]);

    var consumption_data = data[0];

    var consumption_entries = Object.entries(consumption_data);

    console.log(consumption_entries);

    var commonSource = []

    consumption_entries.forEach(function(state){
        
        console.log(state);

        console.log(state[1]);
        var sourceStates = state[1];
        console.log(sourceStates);
        var maxSource = Object.keys(sourceStates).reduce((a, b) => sourceStates[a] > sourceStates[b] ? a : b);
        console.log(`${state[0]}: ${maxSource}`);
        var new_result = {};
        new_result[`${state[0]}`] = maxSource
        new_result['BTU'] = sourceStates[`${maxSource}`]
        commonSource.push(new_result);
      });
    
    console.log(commonSource);

    var labels = []
    var parents = []
    var values = []
    labels.push("Renewable Sources");

    var bioTotal = 0;
    var hydroTotal = 0;
    var geoTotal = 0;
    var solarTotal = 0;
    var windTotal = 0;

    commonSource.forEach(function(result) {
      if (Object.values(result)[0] === 'Bio') {
        bioTotal += Object.values(result)[1];
      }
      else if (Object.values(result)[0] === 'Hydro') {
        hydroTotal += Object.values(result)[1];
      }
      else if (Object.values(result)[0] === 'Geo') {
        geoTotal += Object.values(result)[1];
      }
      else if (Object.values(result)[0] === 'Solar') {
        solarTotal += Object.values(result)[1];
      }
      else {
        windTotal += Object.values(result)[1];
      }
    })
    
    commonSource.forEach(function (result){
      if (labels.includes(Object.values(result)[0])) {
        
      }
      else {
        labels.push(Object.values(result)[0]);
      }
    });

    parents.push("", "Renewable Sources", "Renewable Sources", "Renewable Sources", "Renewable Sources");
    values.push("", hydroTotal, bioTotal, solarTotal, windTotal);

    commonSource.forEach(function(result) {
          
      labels.push(Object.keys(result)[0]);
      parents.push(Object.values(result)[0]);
      values.push(Object.values(result)[1]);
        
    });
    
    console.log(labels, parents, values)
    
    var data = [
      {
        "type": "sunburst",
        "labels": labels,
        "parents": parents,
        "values":  values,
        "leaf": {"opacity": 0.4},
        "marker": {"line": {"width": 2}},
        "branchvalues": 'total',
        "insidetextorientation": "horizontal"
      }];  
    var layout = {
      "margin": {"l": 0, "r": 0, "b": 0, "t": 50},
      title: "Most Used Renewable Energy Source by State (BTU)"
    };

    Plotly.newPlot('totalStateplot', data, layout, {showSendToCloud: true})
        
    // myPlot = document.getElementById("plot");
    
  });
}

getStateSunburstData();


// // Initialize the dashboard
// init();
