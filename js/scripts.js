/*=================================
=            HISTOGRAM            =
=================================*/
// Defining variables
var margin = {
        top: 50,
        right: 0,
        bottom: 50,
        left: 30
    },
    width = 350 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// Scales 
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, .3);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

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

    // Create X axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Create Y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Create Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            return x(d.name);
        })
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
            return y(d.value);
        })
        .attr("height", function(d) {
            return height - y(d.value);
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
