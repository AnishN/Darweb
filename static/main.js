/* Genetic drift - line graph
 * Natural selection - line graph
 * Mean fitness - line graph
 * Natural selection and genetic drift - line graph (guessing - start/clear)
 * Genetic drift and mutation - bar graph (guessing - also iterates)
 * Genetic drift and migration - bar graph
*/

var main = function()
{					
	var graph = document.getElementById("graph");
	var style = window.getComputedStyle(graph, null);
	var margin = {top: 20, right: 40, bottom: 20, left: 40};
	var boxWidth = parseInt(style.getPropertyValue("width"));
	var boxHeight = parseInt(style.getPropertyValue("height"));
	var width = boxWidth - margin.left - margin.right;
	var height = boxHeight - margin.top - margin.bottom;
	
	var svg = d3.select(graph)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
	
	var xScale = d3.scale.linear()
		.domain([0,450])
		.range([0, width])
		
	var yScale = d3.scale.linear()
		.domain([0,450])
		.range([height, 0])
		
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(10);
		
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(10);
	
	svg.selectAll("line.x")
		.data(xScale.ticks(10))
		.enter()
		.append("line")
		.attr("class", "gridLines")
		.attr("x1", xScale)
		.attr("x2", xScale)
		.attr("y1", 0)
		.attr("y2", height)
		.attr("transform", "translate(" + margin.left + "," + (margin.top) + ")")
	
	svg.selectAll("line.y")
		.data(yScale.ticks(10))
		.enter()
		.append("line")
		.attr("class", "gridLines")
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", yScale)
		.attr("y2", yScale)
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
		.call(xAxis);
		
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.call(yAxis);
}

var LineGraph = function(data, options)
{
	
}
