/*=================================
=            HISTOGRAM            =
=================================*/
// Defining variables
var margin = {
        top: 5,
        right: 0,
        bottom: 50,
        left: 10
    },
    width = 400 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom,
    heightH = height / 2;

// X scale 
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, .3);

// Y scale
var y = d3.scale.linear()
    .rangeRound([heightH, 0]);

// Color scale
var color = d3.scale.ordinal()
    .range(["#c51b8a", "#31a354" , "#2c7fb8", "#d95f0e"]);

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

// Load and parse data
d3.tsv("users.tsv", type, function(error, data) {
    x.domain(data.map(function(d) {
        return d.name;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.value;
    })]);
    color.domain(data.map(function(d) {
        return d.name;
    }));

    // Create X axis
    // svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis);

    // Create Y axis
    // svg.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis);

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
        .data(data)
        .enter()
        .append("rect")
        // .attr("class", "bar")
        .attr("x", function(d) {
            return x(d.name);
        })
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
            return y(d.value);
        })
        .attr("height", function(d) {
            return heightH - y(d.value);
        })
        .attr("fill", function(d,i ) {
            return color(i);
        });

    // Labels
    svg.selectAll("svg")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "text")
        .text(function(d) {
            return d.value;
        })
        .attr("x", function(d) {
            return x(d.name) + x.rangeBand() / 2;
        })
        .attr("y", function(d) {
            return y(d.value) + 12;
        })
        .attr("text-anchor", "middle");


});

function type(d) {
    d.value = +d.value;
    return d;
}

/*-----  End of HISTOGRAM  ------*/


/*==============================
=            CIRCLE            =
==============================*/


// The circle javascript code goes here. Select the circle by its id. 
// Everything would be displayed in that div. Something like this:

// var w = 600,
//     h = 600;

// var svg = d3.select("#circle")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h);



/*-----  End of CIRCLE  ------*/
