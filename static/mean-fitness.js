var main = function()
{					
	var form = document.getElementById("form1");
	form.elements["w11"].value = 0.5
	form.elements["w12"].value = 0.5
	form.elements["w22"].value = 0.5
	
	var title = "Mean Fitness vs Allele Frequencies";
	var xTitle = "Frequency (p)";
	var yTitle = "Mean Fitness (w)";
	var xDomain = [0.0, 1.0];
	var yDomain = [0.0, 1.0];
	options = {"title": title, "xTitle": xTitle, "yTitle": yTitle, "xDomain": xDomain, "yDomain": yDomain}
	
	window.graph = new LineGraph("graph", options)
	window.graph.draw()
}

/*Does the actual evolutionary genetics work!*/
var runSimuation = function(w11, w12, w22)
{	
	var data = []
	for(var i = 0; i < 101; i++)
	{
		var p = i / 100.0;
		var p2 = p * p;
		var pq2 = 2 * p * (1 - p)
		var q2 = (1 - p) * (1 - p)
		var wBar = p2 * w11 + pq2 * w12 + q2 * w22
		data.push({x: p, y: wBar})
	}
	return data
}

var submitData = function()
{
	var form = document.getElementById("form1");
	var w11 = parseFloat(form.elements["w11"].value);
	var w12 = parseFloat(form.elements["w12"].value);
	var w22 = parseFloat(form.elements["w22"].value);
	
	var w11Check = (w11 >= 0.0 && w11 <= 1.0);
	var w12Check = (w12 >= 0.0 && w12 <= 1.0);
	var w22Check = (w22 >= 0.0 && w22 <= 1.0);
	
	if(! w11Check) form.elements["w11"].style.color = "red";
	else form.elements["w11"].style.color = "8c8c8c";
	if(! w12Check) form.elements["w12"].style.color = "red";
	else form.elements["w12"].style.color = "8c8c8c";
	if(! w22Check) form.elements["w22"].style.color = "red";
	else form.elements["w22"].style.color = "8c8c8c";
	
	if(w11Check && w12Check && w22Check)
	{
		data = runSimuation(w11, w12, w22)
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
