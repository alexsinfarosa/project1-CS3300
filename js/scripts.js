// CIRCLE
var diameter = 960,
    radius = diameter / 2,
    innerRadius = radius - 120;

var cluster = d3.layout.cluster()
    .size([360, innerRadius])
    .sort(null)
    .value(function(d) {
        return d.size;
    });

var bundle = d3.layout.bundle();
