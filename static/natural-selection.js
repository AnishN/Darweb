var main = function()
{					
	var form = document.getElementById("form1");
	form.elements["p"].value = 0.5
	form.elements["w11"].value = 0.5
	form.elements["w12"].value = 0.5
	form.elements["w22"].value = 0.5
	
	var title = "Effect of Natural Selection";
	var xTitle = "Generations";
	var yTitle = "Frequency (p)";
	var xDomain = [0, 100];
	var yDomain = [0.0, 1.0];
	options = {"title": title, "xTitle": xTitle, "yTitle": yTitle, "xDomain": xDomain, "yDomain": yDomain}
	
	window.graph = new LineGraph("graph", options)
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

