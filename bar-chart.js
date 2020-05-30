var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var updateTime = 500;

var intra_margin = {x:30, y:50};
var chart_width = width/2 - intra_margin.x;
var chart_height = height/2 -intra_margin.y;


// traslazione del chart in base alla variabile
var var_tx = {
    "x1" : {
        x_tx: 0,
        x_ty: chart_height,
        y_tx: 0,
        y_ty: 0
    },
    "x2" : {
        x_tx: chart_width+intra_margin.x,
        x_ty: chart_height,
        y_tx: chart_width+intra_margin.x,
        y_ty: 0
    },
    "x3" : {
        x_tx: 0,
        x_ty: 2*chart_height+intra_margin.y,
        y_tx: 0,
        y_ty: chart_height+intra_margin.y
    },
    "x4" : {
        x_tx: chart_width+intra_margin.x,
        x_ty: 2*chart_height+intra_margin.y,
        y_tx: chart_width+intra_margin.x,
        y_ty: chart_height+intra_margin.y
    }
};
var var_color = {
    "x1" : "steelblue",
    "x2" : "green",
    "x3" : "red",
    "x4" : "purple"
};
var variables = ["x1","x2","x3","x4"];

var x = d3.scaleBand().rangeRound([0, chart_width]).padding(0.2);

var y = d3.scaleLinear().range([chart_height, 0]);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y).ticks(10);
    
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function updateXScaleDomain(data){
    x.domain(data.map(function(d) { return d.id; }));
}

function updateYScaleDomain(data, variable){
    y.domain([0, d3.max(data, function(d) { return d[variable]; })]);
}

function drawAxes(variable){
    var tx = var_tx[variable]
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+tx.x_tx+"," + tx.x_ty+ ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "3")
    .attr("dy", "5.5");

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+tx.y_tx+"," + tx.y_ty+ ")")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

}

function drawBar(data,variable){
    var tx = var_tx[variable]

    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", var_color[variable])
      .attr("x", function(d) { return x(d.id); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d[variable]); })
      .attr("height", function(d) { return chart_height - y(d[variable]); })
      .attr("transform", "translate("+tx.y_tx+"," + tx.y_ty+ ")");

}

d3.json("data.json").then(function(data) {
    updateXScaleDomain(data)
    for(v of variables){
        updateYScaleDomain(data,v)
        drawAxes(v)
        drawBar(data,v)
    }
});