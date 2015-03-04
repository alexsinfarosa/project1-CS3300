/*=================================
=            HISTOGRAM            =
=================================*/

// Load and parse data
d3.json("dataset.json", function(err, data) {

    // Create array of "users" only
    var users = data.map(function(i) {
        return i.user;
    });

    // Generate an object with the (key: value) = (user: number of satellites) ex: (Civil: 85)
    var objectUsers = {};
    for (i = 0; i < users.length; ++i) {
        if (!objectUsers[users[i]])
            objectUsers[users[i]] = 0;
        ++objectUsers[users[i]];
    }

    // Create an array with the keys
    var userKeys;
    userKeys = Object.keys(objectUsers);

    // Create an array with the properties
    var userProperties = [];
    for (key in objectUsers) {
        if (objectUsers.hasOwnProperty(key)) {
            userProperties.push(objectUsers[key]);
        }
    }

    // Defining variables
    var margin = {
            top: 20,
            right: 10,
            bottom: 20,
            left: 10
        },
        width = 400 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom,
        heightH = height / 1.5;

    // X scale 
    var x = d3.scale.ordinal()
        .domain(userKeys.map(function(d) {
            return d;
        }))
        .rangeRoundBands([0, width], .1, .3);

    // Y scale
    var y = d3.scale.linear()
        .domain([0, d3.max(userProperties)])
        .rangeRound([heightH, 0]);

    // Color scale
    var color = d3.scale.ordinal()
        .domain(userKeys.map(function(d) {
            return d;
        }))
        .range(["#c51b8a", "#31a354", "#2c7fb8", "#d95f0e"]);

    //Define X axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    //Define Y axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(4);

    // Create the SVG
    var svg = d3.select("#histogram")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X-axis text
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightH + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.6em")
        .attr("dy", "1em")
        .attr("transform", function(d) {
            return "rotate(-30)"
        });

    // Y line
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightH + ")")
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", -30);

    // X line 
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightH + ")")
        .append("line")
        .attr("x1", 0)
        .attr("y1", -0.5)
        .attr("x2", 375)
        .attr("y2", -0.5);

    // Create Bars
    svg.selectAll(".bar")
        .data(userProperties)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return x(userKeys[i]);
        })
        .attr("width", x.rangeBand())
        .attr("y", function(d, i) {
            return y(userProperties[i]);
        })
        .attr("height", function(d, i) {
            return heightH - y(userProperties[i]);
        })
        .attr("fill", function(d, i) {
            return color(i);
        });

    // Labels
    svg.selectAll("svg")
        .data(userKeys)
        .enter()
        .append("text")
        .attr("class", "text")
        .text(function(d, i) {
            return userProperties[i];
        })
        .attr("x", function(d, i) {
            return x(userKeys[i]) + x.rangeBand() / 2;
        })
        .attr("y", function(d, i) {
            return y(userProperties[i]) + 12;
        })
        .attr("text-anchor", "middle");

    // THE HORIZONTAL BAR---------------------------------------------------------------------------

    // Create array of "countries" only
    var countries = data.map(function(i) {
        return i.country;
    });

    // Generate an object with the (key: value) = (country: number of satellites) ex: (USA: 459)
    var objectCountries = {};
    for (i = 0; i < countries.length; ++i) {
        if (!objectCountries[countries[i]])
            objectCountries[countries[i]] = 0;
        ++objectCountries[countries[i]];
    }

    // Create an array with the keys
    var countryKeys;
    countryKeys = Object.keys(objectCountries);

    // Create an array with the properties
    var countryProperties = [];
    for (key in objectCountries) {
        if (objectCountries.hasOwnProperty(key)) {
            countryProperties.push(objectCountries[key]);
        }
    }

    // Defining variables
    var topCountries = ["USA", "Russia", "China", "Japan", "Others"];
    var numSatellites = [433, 59, 116, 131, 496];
    var dataset = [
        [{
            x: 0,
            y: 433 // All other countries combined
        }],
        [{
            x: 1,
            y: 59 // Japan
        }],
        [{
            x: 2,
            y: 116 // China
        }],
        [{
            x: 3,
            y: 131 // Russia
        }],
        [{
            x: 4,
            y: 496 // USA
        }]
    ];

    //Set up stack method
    var stack = d3.layout.stack();

    //Data, stacked
    stack(dataset);

    //Set up scales
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset[0].length))
        .rangeRoundBands([0, width / 6]);

    var yScale = d3.scale.linear()
        .domain([0,
            d3.max(dataset, function(d) {
                return d3.max(d, function(d) {
                    return d.y0 + d.y;
                });
            })
        ])
        .rangeRound([0, height * 2.3]);

    //Easy colors accessible via a 10-step ordinal scale
    // var colors = d3.scale.category20c();
    var colors = ["#2c7fb8", "#ffffcc", "#a1dab4", "#41b6c4", "#253494"];

    var svg = d3.select("#countries")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + 50 + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add a group for each row of data
    var groups = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .style("fill", function(d, i) {
            return colors[i];
        })
        .attr("transform", "translate(370,100) rotate(90)");

    // Add a rect for each data value
    var rects = groups.selectAll("rect")
        .data(function(d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return yScale(d.y0);
        })
        .attr("height", function(d) {
            return yScale(d.y);
        })
        .attr("width", xScale.rangeBand());

    // LABELS 
    // USA
    svg.append("path")
        .attr("d", "M 125 100 L 165 20 L 180 20")
        .style("fill", "none")
        .style("stroke", "white");

    svg.append("text")
        .text("USA")
        .attr("x", 182)
        .attr("y", 20);
    // Russia
    svg.append("path")
        .attr("d", "M 170 100 L 200 40 L 215 40")
        .style("fill", "none")
        .style("stroke", "white");

    svg.append("text")
        .text("RUSSIA")
        .attr("x", 217)
        .attr("y", 40);
    // China
    svg.append("path")
        .attr("d", "M 205 100 L 225 60 L 240 60")
        .style("fill", "none")
        .style("stroke", "white");

    svg.append("text")
        .text("CHINA")
        .attr("x", 242)
        .attr("y", 60);
    // Japan
    svg.append("path")
        .attr("d", "M 232 100 L 242 78 L 257 78")
        .style("fill", "none")
        .style("stroke", "white");

    svg.append("text")
        .text("JAPAN")
        .attr("x", 259)
        .attr("y", 78);
    // All countries
    svg.append("path")
        .attr("d", "M 262 100 L 268 90 L 283 90")
        .style("fill", "none")
        .style("stroke", "white");

    svg.append("text")
        .text("OTHER COUNTRIES")
        .attr("x", 285)
        .attr("y", 90);

    var line = svg.append("g")
        .append("path")
        .attr("d", "M3 180 L3 190 L370 190 L370 180")
        .style("fill", "none")
        .style("stroke", "white");

});


/*-----  End of HISTOGRAM AND HORIZONTAL BAR ------*/


/*==============================
=            CIRCLE            =
==============================*/

//Load and parse data
d3.json("dataset.json", function(error, data) {
    var countries = [];
    var purposes = [];
    var rotation;

    //creating array of countries
    for (var i = 0; i < data.length; i++) {
        if (countries.indexOf(data[i].country) == -1) {
            countries.push(data[i].country);
        };
    };

    //creating array of purposes
    for (var i = 0; i < data.length; i++) {
        if (purposes.indexOf(data[i].purpose) == -1) {
            purposes.push(data[i].purpose);
        };
    };

    //Technology Development is too long of a string, so this shortens it while retaining meaning
    var index = purposes.indexOf("Technology Development");
    purposes[index] = "Tech Development";

    //height and width variables
    var w = 800,
        h = 825;

    //create svg element
    var svg = d3.select("#circle")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    //print list of countries using svg text
    for (var i = 0; i < countries.length; i++) {
        rotation = i*3.4;
        rotation-=86;
        var rightCircle = svg.append("circle")
            .attr("cx", w/1.15)
            .attr("cy", h/2)
            .attr("r",3)
            .attr("fill", "white")         
            .attr("transform", function(d) { return "rotate("+rotation +","+ w/2 +","+ h/2 +")"; }) //rotating the circles properly
       
        var rightText = svg.append("text")
            .attr("x", 710)
            .attr("y", 417)
            .attr("transform", function(d) { return "rotate("+rotation +","+ w/2 +","+ h/2 +")"; }) //rotating text properly
            .text(countries[i])
            .attr("font-size", function(){
                if(countries[i] == "USA"){
                    return "15px";
                } else if(countries[i] == "Russia"){
                    return "15px";
                } else if(countries[i] == "China"){
                    return "15px";
                } else if(countries[i] == "Japan"){
                    return "15px";
                } else {
                    return "12px";
                }})
            .attr("fill", function(){
                if(countries[i] == "USA"){
                    return "#2c7fb8";
                } else if(countries[i] == "Russia"){
                    return "#ffffcc";
                } else if(countries[i] == "China"){
                    return "#a1dab4";
                } else if(countries[i] == "Japan"){
                    return "#41b6c4";
                } else {
                    return "white";
                }
            });

    };

    //print list of purposes using svg text
    for (var i = 0; i < purposes.length; i++) {
        
        rotation = i*10;
        rotation -=35;
        var colors = ["#c51b8a", "#39bb60", "#2c7fb8", "#d95f0e", "#f03b20","#6a2ff3", "#ba389a", "#f08920", "#18b146", "#57d4f1"]
        var leftCircle = svg.append("rect")
            .attr("x", 128)
            .attr("y", h/2)
            .attr("width",10)
            .attr("height",25)
            .attr("transform", function(d) { return "rotate("+rotation +","+ w/2 +","+ h/2 +")"; }) //rotating the rectangles properly
            .attr("fill", function(){
                return colors[i];
            });

        var leftText = svg.append("text")
            .attr("x", 122)
            .attr("y", 428)
            .text(purposes[i])
            .attr("text-anchor", "end")
            .attr("fill", "white")
            .attr("font-size", "12px")
            .attr("transform", function(d) { return "rotate("+rotation +","+ w/2 +","+ h/2 +")"; }) //rotating the text properly;

    };

    for (var i = 0; i < data.length; i++) {
        var rightSideX = d3.select("#" + data[i].country).node().getBBox().x;
        console.log(d3.select("#" + data[i].country));
        var rightSideY = d3.select("#" + data[i].country).node().getBBox().y;
        var leftSideX = d3.select("#" + data[1].purpose).node().getBBox().x;
        console.log(d3.select("#" + data[2].purpose));
        //console.log(d3.select("#" + data[i].purpose));
        //var leftSideY = d3.select("#" + data[i].purpose).node().getBBox().y;

        svg.append("line")
            .attr("x1",leftSideX)
            .attr("y1",leftSideY)
            .attr("x2",rightSideX)
            .attr("y2",rightSideY)
            .attr("stroke-width", 2);
    };

});
/*-----  End of CIRCLE  ------*/
