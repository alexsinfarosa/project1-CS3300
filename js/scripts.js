/*=================================
=            HISTOGRAM            =
=================================*/

// Load and parse data
d3.tsv("users.tsv", type, function(error, data) {

    // Defining variables
    var margin = {
            top: 20,
            right: 0,
            bottom: 50,
            left: 10
        },
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        heightH = height / 2;

    // X scale 
    var x = d3.scale.ordinal()
    x.domain(data.map(function(d) {
        return d.name;
    }))
    .rangeRoundBands([0, width], .1, .3);

    // Y scale
    var y = d3.scale.linear()
    y.domain([0, d3.max(data, function(d) {
        return d.value;
    })])
    .rangeRound([heightH, 0]);

    // Color scale
    var color = d3.scale.ordinal()
    color.domain(data.map(function(d) {
        return d.name;
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
        .attr("fill", function(d, i) {
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

d3.json("dataset.json", function(error, data) {
    var countries=[];
    var purposes=[];

    for (var i = 0; i < data.length; i++) {
        if (countries.indexOf(data[i].country)==-1) {
            countries.push(data[i].country);
        };
    };

    for (var i = 0; i < data.length; i++) {
        if (purposes.indexOf(data[i].purpose)==-1) {
            purposes.push(data[i].purpose);
        };
    };
    document.getElementById("circle").innerHTML = purposes;

    var w = 700,
        h = 700;

    var svg = d3.select("#circle")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.append("g")
        .append("circle")
        .attr({
            cx: w/2,
            cy: h/2,
            r: w/3,
            stroke: "white",
            fill: "none"
        });


});
/*-----  End of CIRCLE  ------*/
