/* Genetic drift - line graph
 * Natural selection - line graph
 * Mean fitness - line graph
 * Natural selection and genetic drift - line graph (guessing - start/clear)
 * Genetic drift and mutation - bar graph (guessing - also iterates)
 * Genetic drift and migration - bar graph
*/

var LineGraph = function(containerId)
{
	var graph = document.getElementById(containerId);
	var style = window.getComputedStyle(graph, null);
	var boxWidth = parseInt(style.getPropertyValue("width"));
	var boxHeight = parseInt(style.getPropertyValue("height"));
	
	this.margin = {top: 50, right: 20, bottom: 50, left: 50};
	this.width = boxWidth - this.margin.left - this.margin.right;
	this.height = boxHeight - this.margin.top - this.margin.bottom;
	
	this.svg = d3.select(graph)
		.append("svg")
		.attr("width", this.width + this.margin.left + this.margin.right)
		.attr("height", this.height + this.margin.top + this.margin.bottom);
		
	this.xScale = this.setXScale()
	this.xAxis = this.setXAxis()
	this.yScale = this.setYScale()
	this.yAxis = this.setYAxis()
	this.data = [];
	this.lineColors = [];
}

LineGraph.prototype.setXScale = function()
{
	var xScale = d3.scale.linear()
		.domain([0, 100])
		.range([0, this.width])
	return xScale;
}

LineGraph.prototype.setXAxis = function()
{
	var xAxis = d3.svg.axis()
		.scale(this.xScale)
		.orient("bottom")
		.ticks(10);
	return xAxis;
}

LineGraph.prototype.setYScale = function()
{
	var yScale = d3.scale.linear()
		.domain([0, 1.0])
		.range([this.height, 0])
	return yScale;
}

LineGraph.prototype.setYAxis = function()
{
	var yAxis = d3.svg.axis()
		.scale(this.yScale)
		.orient("left")
		.ticks(10);
	return yAxis;
}

LineGraph.prototype.drawGrid = function()
{
	this.svg.selectAll("line.x")
		.data(this.xScale.ticks(10))
		.enter()
		.append("line")
		.attr("class", "gridLines")
		.attr("x1", this.xScale)
		.attr("x2", this.xScale)
		.attr("y1", 0)
		.attr("y2", this.height)
		.attr("transform", "translate(" + this.margin.left + "," + (this.margin.top) + ")")
	
	this.svg.selectAll("line.y")
		.data(this.yScale.ticks(10))
		.enter()
		.append("line")
		.attr("class", "gridLines")
		.attr("x1", 0)
		.attr("x2", this.width)
		.attr("y1", this.yScale)
		.attr("y2", this.yScale)
		.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
}

LineGraph.prototype.drawTitle = function()
{
	this.svg.append("text")
        .attr("x", this.margin.left + this.width / 2)             
        .attr("y", this.margin.top / 2)
        .attr("text-anchor", "middle")  
        .attr("class", "graphTitle")
        .text("Effect of Natural Selection");
}

LineGraph.prototype.drawXAxis = function()
{
	this.svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + this.margin.left + "," + (this.height + this.margin.top) + ")")
		.call(this.xAxis);
	
	this.svg.append("text")
        .attr("x", this.margin.left + this.width / 2)             
        .attr("y", this.margin.top + this.height + 40)
        .attr("text-anchor", "middle")  
        .attr("class", "graphXLabel")
        .text("Generations");
}

LineGraph.prototype.drawYAxis = function()
{
	this.svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
		.call(this.yAxis);
    
    this.svg.append("text")
		.attr("transform", "rotate(-90)")//This messes with the coordinate system!
		.attr("x", -this.height/2 - this.margin.top)
		.attr("y", this.margin.left - 40)
        .attr("text-anchor", "middle")  
        .attr("class", "graphYLabel")
        .text("Frequency (p)");
}

LineGraph.prototype.drawData = function()
{
	
	if(this.data.length != 0)
	{	
		var xScale = this.xScale;
		var yScale = this.yScale;
		
		
		for(var i = 0; i < this.data.length; i++)
		{
			console.log(this.lineColors[i])
			
			//This is the accessor function we talked about above
			var lineFunction = d3.svg.line()
				.x(function(d) { return xScale(d.x); })
				.y(function(d) { return yScale(d.y); })
				.interpolate("linear");

			//The line SVG Path we draw
			var lineGraph = this.svg.append("path")
				.attr("d", lineFunction(this.data[i]))
				.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
				.attr("stroke", this.lineColors[i])
				.attr("stroke-width", 1)
				.attr("fill", "none")
				.attr("shape-rendering", "crispEdges");
		}
				
	}
}

LineGraph.prototype.draw = function()
{
	d3.selectAll("svg > *").remove();//clears the entirety of d3
	this.drawTitle()
	this.drawXAxis()
	this.drawYAxis()
	this.drawGrid()
	this.drawData()
}

LineGraph.prototype.addLineData = function(data)
{
	this.data.push(data)
	var color = Math.floor(Math.random() * 16777216).toString(16);
	var hexColor = '#000000'.slice(0, -color.length) + color;
	this.lineColors.push(hexColor);
}

var main = function()
{					
	var form = document.getElementById("form1");
	form.elements["p"].value = 0.5
	form.elements["w11"].value = 0.5
	form.elements["w12"].value = 0.5
	form.elements["w22"].value = 0.5
	
	window.graph = new LineGraph("graph")
	window.graph.draw()
}

var submitData = function()
{
	var form = document.getElementById("form1");
	var p = parseFloat(form.elements["p"].value);
	var w11 = parseFloat(form.elements["w11"].value);
	var w12 = parseFloat(form.elements["w12"].value);
	var w22 = parseFloat(form.elements["w22"].value);
	
	var pCheck = (p >= 0.0 && p <= 1.0);
	var w11Check = (w11 >= 0.0 && w11 <= 1.0);
	var w12Check = (w12 >= 0.0 && w12 <= 1.0);
	var w22Check = (w22 >= 0.0 && w22 <= 1.0);
	
	if(! pCheck) form.elements["p"].style.color = "red";
	else form.elements["p"].style.color = "8c8c8c";
	if(! w11Check) form.elements["w11"].style.color = "red";
	else form.elements["w11"].style.color = "8c8c8c";
	if(! w12Check) form.elements["w12"].style.color = "red";
	else form.elements["w12"].style.color = "8c8c8c";
	if(! w22Check) form.elements["w22"].style.color = "red";
	else form.elements["w22"].style.color = "8c8c8c";
	
	if(pCheck && w11Check && w12Check && w22Check)
	{
		data = runSimuation(p, w11, w12, w22)
		window.graph.addLineData(data)
		window.graph.draw()
	}
}

var clearData = function()
{
	window.graph.data = [];
	window.graph.lineColors = [];
	window.graph.draw()
}

/*Does the actual evolutionary genetics work!*/
var runSimuation = function(p, fit11, fit12, fit22)
{
	var numGen = 100
	var maxAbsFit = Math.max(fit11, fit12, fit22)
	var w11 = fit11 / maxAbsFit
	var w12 = fit12 / maxAbsFit
	var w22 = fit22 / maxAbsFit
	var data = [{x: 0, y: p}]
	
	for(var i = 1; i < numGen + 1; i++)
	{
		var p2 = p * p;
		var pq2 = 2 * p * (1 - p)
		var q2 = (1 - p) * (1 - p)
		var wBar = p2 * w11 + pq2 * w12 + q2 * w22
		
		var normp2 = p2 * w11 / wBar
		var norm2pq = pq2 * w12 / wBar
		var normq2 = q2 * w22 / wBar
		var newP = normp2 + norm2pq / 2.0
		data.push({x: i, y: newP})
		p = newP
	}
	
	return data
}
