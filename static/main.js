/* Genetic drift - line graph
 * Natural selection - line graph
 * Mean fitness - line graph
 * Natural selection and genetic drift - line graph (guessing - start/clear)
 * Genetic drift and mutation - bar graph (guessing - also iterates)
 * Genetic drift and migration - bar graph
*/

var LineGraph = function(data, containerId)
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
	
	alert(this.xScale);
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

LineGraph.prototype.draw = function()
{
	this.drawTitle()
	this.drawXAxis()
	this.drawYAxis()
	this.drawGrid()
}

var main = function()
{					
	var graph = new LineGraph([], "graph")
	graph.draw()
}
