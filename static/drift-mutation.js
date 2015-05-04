var main = function()
{					
	var form = document.getElementById("form1");
	form.elements["N"].value = 100
	form.elements["Mu"].value = 0.001
	
	var title = "Effect of Genetic Drift and Mutation";
	var xTitle = "Frequency (p)";
	var yTitle = "# Populations";
	var xDomain = [0.0, 1.0];
	var yDomain = [0, 32];
	options = {"title": title, "xTitle": xTitle, "yTitle": yTitle, "xDomain": xDomain, "yDomain": yDomain}
	
	window.graph = new BarGraph("graph", options)
	window.graph.draw()
}

/*Does the actual evolutionary genetics work!*/
var runSimuation = function(n, m)
{
	var data = [{x: 0, y: 5}]
	for(var i = 0; i < 11; i++)
	{
		var r = i / 10.0;
		data.push({x: r, y: 5});
	}
	return data;
}

var submitData = function()
{
	var form = document.getElementById("form1");
	var n = parseFloat(form.elements["N"].value);
	var m = parseFloat(form.elements["Mu"].value);
	
	var nCheck = (n === parseInt(n) && n >= 25 && n <= 250);
	var mCheck = (m >= 0.0 && m <= 0.01);
	
	if(! nCheck) form.elements["N"].style.color = "red";
	else form.elements["N"].style.color = "8c8c8c";
	if(! mCheck) form.elements["Mu"].style.color = "red";
	else form.elements["Mu"].style.color = "8c8c8c";
	
	if(nCheck && mCheck)
	{
		//need to check if input changed - how?
		data = runSimuation(n, m)
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

