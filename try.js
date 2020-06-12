// // Submit Button handler
// function handleSubmit() {
//     // Prevent the page from refreshing
//     d3.event.preventDefault();
  
//     // Select the input value from the form
//     var source = d3.select("#sourceInput").node().value;
//     console.log(source);
  
//     // clear the input value
//     d3.select("#sourceInput").node().value = "";
  
//     // Build the plot with the new stock
//     buildPlot(source);
//   }
  
//   function buildPlot(source) {
    var url = "http://127.0.0.1:5000/api/v1.0/state_energy"
  
    console.log(url)
  
    d3.json(url).then(function(data) {
      // Grab values from the response json object to build the plots
      var stateData = data;
      console.log(stateData);
    //   console.log(energyData.length)
  
    //   var dates = energyData.map(row => row[0]);
    //   console.log(dates);
    //   var production = energyData.map(row => row[1]);
    //   console.log(production);
    //   var startDate = data.series[0].start;
    //   var endDate = data.series[0].end;
  
    //   var trace1 = {
    //     type: "scatter",
    //     mode: "lines",
    //     name: name,
    //     x: dates,
    //     y: production,
    //     line: {
    //       color: "#17BECF"
    //     }
    //   };
  
    //   var dataPlot = [trace1];
  
    //   var layout = {
    //     title: `${data.series[0].name}`,
    //     xaxis: {
    //       range: [startDate, endDate],
    //       type: "date"
    //     },
    //     yaxis: {
    //       autorange: true,
    //       type: "linear"
    //     }
    //   };
  
    //   Plotly.newPlot("plot", dataPlot, layout);
  
    // });
 })
  
  // //Add event listener for submit button
//   d3.select("#submit").on("click", handleSubmit);
  