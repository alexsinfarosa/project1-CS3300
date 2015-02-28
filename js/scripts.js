/*=================================
=            HISTOGRAM            =
=================================*/
// Defining variables
var margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 40
    },
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    dataset;


// Create scale functions
var xScale = d3.scale.ordinal()
    .rangeRoundBands([margin.left, width - margin.right], 0.1);

var yScale = d3.scale.linear()
    .range([height - margin.top, margin.bottom]);

// Axes
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10, "%");

// Create the SVG and the g group
var svg = d3.select("#histogram")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load and parse data
d3.json('dataset.json', function(err, data) {
    dataset = data;

    var users = [];
    dataset.forEach(function(d, i) {users.push()});

    xScale.domain(dataset.map(function(d) {
        return d.name;
    }));
    yScale.domain([0, d3.max(dataset, function(d) {
        return d.value;
    })]);

    // svg.selectAll("rect")
    //     .data(dataset)
    //     .enter()
    //     .append("rect")
    //     .attr("width", function(d, i) {
    //         return
    //     })
    //     .attr("height", function(d, i) {
    //         return
    //     })

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









