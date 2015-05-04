var main = function()
{					
	var form = document.getElementById("form1");
	form.elements["p"].value = 0.5
	form.elements["N"].value = 50
	form.elements["Generations"].value = 100
	
	var title = "Effect of Genetic Drift";
	var xTitle = "Generations";
	var yTitle = "Frequency (p)";
	var xDomain = [0, 100];
	var yDomain = [0.0, 1.0];
	options = {"title": title, "xTitle": xTitle, "yTitle": yTitle, "xDomain": xDomain, "yDomain": yDomain}
	
	window.graph = new LineGraph("graph", options)
	window.graph.draw()
}

/*Does the actual evolutionary genetics work!*/
var runSimuation = function(p, n, g)
{
	var data = [{x: 0, y: p}]
	for(var i = 1; i < g + 1; i++)
	{
		var count = 0;	
		for(var a = 0; a < 2 * n; a++)//Loop through each individual (each having 2 copies of the gene)
		{
			if(Math.random() < p)
			{ 
				count += 1;
			}
		}
		var newP = count / (2.0 * n);
		data.push({x: i, y: newP});
		console.log([i, newP])
		p = newP;
	}
	return data;
}

var submitData = function()
{
	var form = document.getElementById("form1");
	var p = parseFloat(form.elements["p"].value);
	var n = parseFloat(form.elements["N"].value);
	var g = parseFloat(form.elements["Generations"].value);
	
	var pCheck = (p >= 0.0 && p <= 1.0);
	var nCheck = (n === parseInt(n) && n >= 10 && n <= 1000);
	var gCheck = (g === parseInt(g) && g >= 50 && g <= 2500);
	
	if(! pCheck) form.elements["p"].style.color = "red";
	else form.elements["p"].style.color = "8c8c8c";
	if(! nCheck) form.elements["N"].style.color = "red";
	else form.elements["N"].style.color = "8c8c8c";
	if(! gCheck) form.elements["Generations"].style.color = "red";
	else form.elements["Generations"].style.color = "8c8c8c";
	
	if(pCheck && nCheck && gCheck)
	{
		if(g != window.graph.xDomain[1])
		{
			window.graph.xDomain = [0, g]
			window.graph.xScale = window.graph.setXScale()
			window.graph.xAxis = window.graph.setXAxis()
			clearData()
		}
		
		data = runSimuation(p, n, g)
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

