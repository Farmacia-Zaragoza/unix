
function reporting(testId, reportId, w,d){
	var test = d.getElementById(testId);
	var report = d.getElementById(reportId);
	if(test && report){
		var width = test.getBoundingClientRect().width;
		var fontSize = w.getComputedStyle(test, null).getPropertyValue('font-size');
		report.innerHTML = "width"+ parseInt(width, 10) + "px"+ " &mdash; font-size : " + fontSize;
		w.requestAnimationFrame(function(){
			reporting(testId, reportId, w,d);
		});
	}
}


reporting("report1", "report1", window, document);
reporting("test2", "report2", window, document);