//Set up scales
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset[0].length))
        .rangeRoundBands([margin.left, width / 6], 0.05);

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
    var colors = d3.scale.category20();
    // var colors = ["#c51b8a", "#31a354", "#2c7fb8", "#d95f0e", "#f03b20"];

    var svg = d3.select("#countries")
        .append("svg")
        .attr("width", width + 100 + margin.left + margin.right)
        .attr("height", height + 100 + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add a group for each row of data
    var groups = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .style("fill", function(d, i) {
            return colors(i);
        })
        .attr("transform", "translate(400,100) rotate(90)");

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
        svg.append("g")
            .append("line")
            .attr("x1", 20)
            .attr("y1", 100)
            .attr("x2", 50)
            .attr("y2", 40)
            .style("stroke", "red");