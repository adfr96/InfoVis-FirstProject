var data
d3.json("data.json").then(function(d) {
    var p = d3.select("body")
        .selectAll("p")
        .data(d)
        .text(function(d) { return d.x1; });
    p.enter().append('p').text(function(d){return d.x1;})
  });
  

console.log(data)
/*
var p = d3.select("body")
        .selectAll("p")
        .data(data)
        .text(function(d) { return d.x1; });
p.enter().append('p').text(function(d){return d.x1;})
*/