// Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/2014_usa_states.csv", function(err, rows){
//     console.log(rows)
// })


Plotly.d3.json("/api/v1.0/price_data", function(err, rows){
    console.log(rows)
    function unpack(rows, key) {
        //function to transform structure of the data loaded
        function listLoop(inputData){ 
            var outputData = []
            console.log("inputData=", inputData)
            for (var i = 0; i < inputData.state.length; i++) {

                var max_loop 
                
                if (Array.isArray(inputData.state[i])) {
                     max_loop = inputData.state[i].length;
                    }
                    else{max_loop = 1}

                for (var j = 0; j < max_loop; j++) {


                        var object = {}
                        object.price = inputData.data[i][5][1]
                        object.formulation = inputData.formulation[i]
                        object.fuel = inputData.fuel[i]
                        object.grade = inputData.grade[i]
                        object.state = inputData.state[i][j] 
                        object.priceList = inputData.data[i]
                        //object.price = inputData.
                        outputData.push(object)  
                    //}
                    // console.log("object",object)
                }
            }
            console.log("outputData", outputData)
            return outputData    
        }
    
        // //Apply filters

        // var keysFilter = Object.keys(filters)

        // var filteredValue = false
        // for (var k = 0; k < keysFilter.length; k++) {
        //     console.log("filters" ,filters)
        //     console.log("keysFilter" ,keysFilter[k])
        //     console.log("filters[keysFilter[k]" ,filters[keysFilter[k]])
        //     console.log("keysFilter" ,keysFilter[k])
        //     console.log("inputData[keysFilter[k]][i]" ,inputData[keysFilter[k]][i])
        //     console.log("equality", filters[keysFilter[k]] == inputData[keysFilter[k]][i])
        //     console.log("              ")

        //     if (filters[keysFilter[k]] != inputData[keysFilter[k]][i]){
        //         filteredValue = true
        //     }
        //     // console.log("filteredValue",filteredValue)
        // }
        // if (filteredValue == false){
        rows = listLoop(rows[0])

    return rows.map(function(row) { 
        return row[key]; });
    }

    // var dataChloroplethFilters = {
    //     "formulation" : "All Formulations",
    //     "fuel" : "gasoline",
    //     "grade" : "All Grades",
    //     //"date" : "..."
    // }
    
    // var dataLineFilters = {
    //     "formulation" : "All Formulations",
    //     "fuel" : "gasoline",
    //     "grade" : "All Grades",
    //     "state" : "USA"
    // }
    console.log("rows",rows)

    var dataChloropleth = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(rows, 'state' ),
        z: unpack(rows, 'price'),
        text: unpack(rows, 'price'),
        autocolorscale: true
    }];

    var layoutChloropleth = {
    title: 'US oil prices',
        geo:{
            scope: 'usa',
            countrycolor: 'rgb(255, 255, 255)',
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            showlakes: true,
            lakecolor: 'rgb(255, 255, 255)',
            subunitcolor: 'rgb(255, 255, 255)',
            lonaxis: {},
            lataxis: {},
        }
    };


    Plotly.newPlot("map", dataChloropleth, layoutChloropleth, {showLink: false});

    //console.log(rows)
    //extract date values
    //console.log(dataAxis)
    dateAxis = unpack(rows, 'priceList').map(function(row,index){
        try{
            date = 
                row[index][0].slice(0, 4)+"-"+
                row[index][0].slice(4, 6)+"-"+
                row[index][0].slice(6, 8)//+" 00:00:00"
            //console.log(date)
        }
        catch (err){
            console.log("row" , row, "errorindex =" , index)
        }
        return date})

    priceAxis = unpack(rows, 'priceList').map(function(row){return row[0][1]}),

    dataLineChart = [{
        x: dateAxis,
        y: priceAxis,
        type: 'scatter'
      }]
    
    var layoutLineChart = {
        xaxis : {
            range: ["1998-01-01", "2020-01-01"],
            type: "date"
          },
        sliders: [{
          pad: {t: 30},
          len: 0.5,
          x: 0.5,
          currentvalue: {
            xanchor: 'right',
            prefix: 'color: ',
            font: {
              color: '#888',
              size: 20
            }
          },
          // If all of a component's commands affect a single attribute, the component
          // will be bound to the plot and will automatically update to reflect changes.
          steps: [{
            label: 'red',
            method: 'restyle',
            args: ['line.color', 'red']
          }, {
            label: 'green',
            method: 'restyle',
            args: ['line.color', 'green']
          }, {
            label: 'blue',
            method: 'restyle',
            args: ['line.color', 'blue']
          }]
        }],
        updatemenus: [{
          pad: {t: 60, r: 30},
          type: 'buttons',
          xanchor: 'left',
          yanchor: 'top',
          x: 00,
          y: 0,
          direction: 'right',
          buttons: [{
            label: 'red',
            method: 'restyle',
            args: ['line.color', 'red']
          }, {
            label: 'green',
            method: 'restyle',
            args: ['line.color', 'green']
          }, {
            label: 'blue',
            method: 'restyle',
            args: ['line.color', 'blue']
          }]
        }]
    }
    
    
    Plotly.newPlot('chart', dataLineChart , layoutLineChart);
}); 

