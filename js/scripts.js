/*=================================
=            HISTOGRAM            =
=================================*/
var width = 400,
    height = 400,
    padding = 50;

// Load and parse data
d3.json("dataset.json", function(err, data) {
    dataset = data;

    // Create array of "users" only
    var users = dataset.map(function(i) {
        return i.users;
    });

    // Create a count for each users.value
    var civil = 0;
    var commercial = 0;
    var military = 0;
    var government = 0;
    users.forEach(function(user, index) {
        if (user == "Civil") {
            civil++;
        } else if (user == "Commercial") {
            commercial++;
        } else if (user == "Government") {
            government++;
        } else if (user == "Military") {
            military++;
        }
    });

    // Create the array to generate the bars
    var arrUsers = [civil, commercial, government, military];

    // Scales               
    var xScale = d3.scale.ordinal()
        .domain(d3.range(arrUsers.length))
        .rangeRoundBands([padding, width], 0.05);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(arrUsers)])
        .rangeRound([height / 3, 0]);

    // Create the SVG
    var svg = d3.select("#histogram")
        .append("svg")
        .attr("width", width + padding)
        .attr("height", height + padding);

    // Create the bars
    svg.selectAll("rect")
        .data(arrUsers)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return yScale(d);
        })
        .attr("width", xScale.rangeBand())
        .attr("height", function(d) {
            return height / 3 - yScale(d);
        })
        .attr("fill", "orange");

    // Labels
    svg.selectAll("text")
        .data(arrUsers)
        .enter()
        .append("text")
        .attr("class", "text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.rangeBand() / 2;
        })
        .attr("y", function(d) {
            return yScale(d) + 15;
        })
        .attr("text-anchor", "middle")

    //Define X axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(5);

    // Defining Y axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

    // // Create X axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height / 3 + ")")
        .call(xAxis);

    // Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    // Text on the y-axis
    svg.append("g")
        .attr("class", "axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .style("font-size", "13px")
        .text("Satellites");

    svg.append("g")
        .data(arrUsers)
        .attr("class", "axis")
        .append("text")
        .attr("x", xScale.rangeBand())
        .attr("y", "200px")
        // .attr("transform", "rotate(90)")
        .text("Civil");



});


/*-----  End of HISTOGRAM  ------*/


/*==============================
=            CIRCLE            =
==============================*/


// The circle javascript code goes here. Select the circle by its id. 
// Everything would be displayed in that div. Something like this:

var w = 600,
    h = 600;

var svg = d3.select("#circle")
    .append("svg")
    .attr("width", w)
    .attr("height", h);



/*-----  End of CIRCLE  ------*/
