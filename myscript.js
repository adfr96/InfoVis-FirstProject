var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var chart_width = width/2
var chart_height = height/2

var x = d3.scaleBand().rangeRound([0, chart_width]).padding(0.5);

var y = d3.scaleLinear().range([chart_height, 0]);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y).ticks(10);
    
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function comp_x1(v1,v2){
  if(v1.x1>v2.x1){
    return -1
  }
  else if(v2.x1>v1.x1){
    return 1
  }
  return 0
}
d3.json("data.json").then(function(data) {
    data.sort(comp_x1)
    console.log(data)

    x.domain(data.map(function(d) { return d.id; }));
    y.domain([0, d3.max(data, function(d) { return d.x1; })]);   

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + chart_height+ ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "3")
    .attr("dy", "5.5");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("x1");

      svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.id); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.x1); })
      .attr("height", function(d) { return chart_height - y(d.x1); });
  });
