var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var intra_margin = {x:30, y:50}
var chart_width = width/2 - intra_margin.x
var chart_height = height/2 -intra_margin.y

var x = d3.scaleBand().rangeRound([0, chart_width]).padding(0.2);

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
    //console.log(data)

    x.domain(data.map(function(d) { return d.id; }));
    y.domain([0, d3.max(data, function(d) { return d.x1; })]);   

    /* grafico relativo ad x1*/ 
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

    /** grafico relativo ad x2 */

    y.domain([0, d3.max(data, function(d) { return d["x2"]; })]);  

      svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+(chart_width+intra_margin.x)+"," + chart_height+ ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "3")
    .attr("dy", "5.5");

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+(chart_width+intra_margin.x)+",0)")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("x2");

    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", "green")
      .attr("x", function(d) { return x(d.id); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.x2); })
      .attr("height", function(d) { return chart_height - y(d.x2); })
      .attr("transform", "translate("+(chart_width+intra_margin.x)+",0)");

    /** grafico relativo ad x3 */
    y.domain([0, d3.max(data, function(d) { return d.x3; })]); 

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0 ," + (2*chart_height+intra_margin.y)+ ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "3")
    .attr("dy", "5.5");

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,"+ (chart_height+intra_margin.y)+")")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("x3");

    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", "red")
      .attr("x", function(d) { return x(d.id); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.x3); })
      .attr("height", function(d) { return chart_height - y(d.x3); })
      .attr("transform", "translate(0,"+ (chart_height+intra_margin.y)+")");
    
    
      /** grafico relativo ad x4 */
    y.domain([0, d3.max(data, function(d) { return d.x4; })]); 

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+(chart_width+intra_margin.x)+" ," + (2*chart_height+intra_margin.y)+ ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "3")
    .attr("dy", "5.5");

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+(chart_width+intra_margin.x)+","+ (chart_height+intra_margin.y)+")")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("x4");

    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .style("fill", "purple")
      .attr("x", function(d) { return x(d.id); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.x4); })
      .attr("height", function(d) { return chart_height - y(d.x4); })
      .attr("transform", "translate("+(chart_width+intra_margin.x)+","+ (chart_height+intra_margin.y)+")");
  });
