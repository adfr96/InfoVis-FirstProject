var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var updateTime = 750;

var intra_margin = {x:30, y:50};
var chart_width = width/2 - intra_margin.x;
var chart_height = height/2 -intra_margin.y;


// traslazione del chart in base alla variabile
var var_tx = {
    "x1" : {
        x_tx: intra_margin.x,
        x_ty: chart_height+intra_margin.y/2,
        y_tx: intra_margin.x,
        y_ty: intra_margin.y/2
    },
    "x2" : {
        x_tx: chart_width+2*intra_margin.x,
        x_ty: chart_height+intra_margin.y/2,
        y_tx: chart_width+2*intra_margin.x,
        y_ty: intra_margin.y/2
    },
    "x3" : {
        x_tx: intra_margin.x,
        x_ty: 2*chart_height+intra_margin.y+intra_margin.y/2,
        y_tx: intra_margin.x,
        y_ty: chart_height+intra_margin.y+intra_margin.y/2
    },
    "x4" : {
        x_tx: chart_width+2*intra_margin.x,
        x_ty: 2*chart_height+intra_margin.y+intra_margin.y/2,
        y_tx: chart_width+2*intra_margin.x,
        y_ty: chart_height+intra_margin.y+intra_margin.y/2
    }
};
var var_color = {
    "x1" : "steelblue",
    "x2" : "green",
    "x3" : "red",
    "x4" : "purple"
};
var var_comp = {
    "x1" : comp_x1,
    "x2" : comp_x2,
    "x3" : comp_x3,
    "x4" : comp_x4
}
var variables = ["x1","x2","x3","x4"];

var x = d3.scaleBand().rangeRound([0, chart_width]).padding(0.2);

var y = d3.scaleLinear().range([chart_height, 0]);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y).ticks(20);
    
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("border",1)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", 1)

function updateXScaleDomain(data){
    x.domain(data.map(function(d) { return d.id; }));
}

function updateYScaleDomain(data, variable){
    y.domain([0, d3.max(data, function(d) { return d[variable]; })]);
}

function drawAxes(variable,chart){
    var tx = var_tx[variable]
    chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+tx.x_tx+"," + tx.x_ty+ ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "3")
    .attr("dy", "5.5");

    chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+tx.y_tx+"," + tx.y_ty+ ")")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
      // add a label along the y-axis
        //
        chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("transform", "translate("+tx.y_tx+"," + (tx.y_ty-intra_margin.y/4)+ ")")
        .attr("y", 6)
        .attr("font-size","15px")
        .style("text-anchor", "end")
        .text(variable);

}
function drowBack(chart,variable){
    var tx = var_tx[variable]
    chart.append("rect")
        .style("fill", "white")
        .attr("x",tx.x_tx)
        .attr("y",tx.y_ty)
        .attr("width", chart_width)
        .attr("height", chart_height);
}
function drawBar(data,variable,chart){
    var tx = var_tx[variable]

    var bars = chart.selectAll(".bar").exit().remove().data(data);

    bars.enter().append("rect")
        .attr("class", "bar-"+variable)
        .style("fill", var_color[variable])
        .attr("value",function(d) { return d[variable]; })
        .attr("x", function(d) { return x(d.id); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d[variable]); })
        .attr("height", function(d) { return chart_height - y(d[variable]); })
        .attr("transform", "translate("+tx.y_tx+"," + tx.y_ty+ ")")
        .on("mouseover",handleMouseOverBars)
        .on("mouseout",handleMouseOutBars);
    /*
    bars.transition().duration(updateTime)
        .attr("x", function(d) { return x(d.id); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d[variable]); })
        .attr("height", function(d) { return y(chart_height - d[variable]); })
        .attr("transform", "translate("+tx.y_tx+"," + tx.y_ty+ ")");
    */
}
function handleMouseOverBars(d,i){
    value = this.getAttribute("value")
    x = d3.mouse(this)[0]
    y = d3.mouse(this)[1]

    svg.append("text")
        .attr("class","value")
        .attr("transform", "translate("+x+"," + y+ ")")
        .text(value)
}
function handleMouseOutBars(d,i){
    svg.select(".value").remove();
}
function comp_x1(v1,v2){
    if(v1.x1>v2.x1){
      return -1
    }
    else if(v2.x1>v1.x1){
      return 1
    }
    return 0
  }
function comp_x2(v1,v2){
    if(v1.x2>v2.x2){
        return -1
    }
    else if(v2.x2>v1.x2){
        return 1
    }
    return 0
}
function comp_x3(v1,v2){
    if(v1.x3>v2.x3){
        return -1
    }
    else if(v2.x3>v1.x3){
        return 1
    }
    return 0
}
function comp_x4(v1,v2){
    if(v1.x4>v2.x4){
        return -1
    }
    else if(v2.x4>v1.x4){
        return 1
    }
    return 0
}
function sortData(data,variable){
    data.sort(var_comp[variable])
}
function draw_all(variable){
    d3.json("data.json").then(function(data) {
        sortData(data,variable)
        
        for(v of variables){
            svg.selectAll(".chart-"+v).remove()
            var chart = svg.append("g").attr("class", "chart-"+v)
            .attr("var",v).on("click",sorting)
            drowBack(chart,v)
            updateXScaleDomain(data)
            updateYScaleDomain(data,v)
            drawAxes(v,chart)
            drawBar(data,v,chart)
        }

    function sorting(){
        variable = this.getAttribute("var")
        data.sort(var_comp[variable])
        console.log(data)
        updateXScaleDomain(data)
        
        var transition = svg.transition().duration(updateTime),
        delay = function(d, i) { return i * 25; };
        for(v of variables){
            updateYScaleDomain(data,v)
            transition.selectAll(".bar-"+v)
                .delay(delay)
                .attr("x", function(d) {  return x(d.id); })
                .attr("y", function(d) { return y(d[v]); })
                .attr("height", function(d) { return chart_height - y(d[v]); })
        } 
        transition.selectAll(".x.axis")
            .call(xAxis)
            .selectAll("g")
            .delay(delay);
        
    }
    });
}
function redraw(){
    draw_all(this.getAttribute("var"))
}
draw_all();

