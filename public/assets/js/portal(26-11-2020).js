var myScript = new ( function($) {
	var self = this;
	
	this.sendAjax = function(param, afterloadback)
	{
		// console.log(param);
		$.ajax({
			url: BaseUrl+"home/getdata",
			data: param,
			cache: false,
			type: 'post',
			dataType: 'json',
			beforeSend: function(){
				mainloading(true);
			},
			error: function(jqXHR, textStatus, errorThrown){
		        // will fire when timeout is reached
		        console.log("jqXHR:- " + JSON.stringify(jqXHR));
		        console.log("textStatus:- " + textStatus);
		        console.log("errorThrown:- " + errorThrown);
		    },
			success: function(reData, status, xhr) {
				// console.log(reData);
				// mainloading(false);
				afterloadback(reData);
				mainloading(false);
			}
		});
	}

	// Create linechart for given tab on the index page
	this.DrawTrendChart = function(graphData, divID) {
		// console.log(graphData);
		// console.log("divID: " + divID);
		// console.log("datatype_id: " + datatype_id);
		var graphData = JSON.parse(graphData);
		var chart = AmCharts.makeChart(divID, {
	      "type": "serial",
	      "theme": "none",
		  "autoMargins": true,
		  "marginBottom": 20,
	      "pathToImages": BaseUrl+"assets/images/",
	      "dataDateFormat": "YYYY-MM-DD",
	      "valueAxes": [ {
	        "axisAlpha": 0,
	        "labelsEnabled" : false,
	        "gridThickness": 0,
	      } ],
	      "graphs": [ {
	        "type": "column",
	        "fillAlphas": 0,
	        "lineThickness": 2,
	        "lineColor": "#d53d4a",
	        "valueField": "value",
	        "balloonText": ""
	      } ],
	      "categoryField": "date",
	      "categoryAxis": {
	        "parseDates": true,
	        "labelsEnabled" : false,
	        "gridThickness": 0,
	        "axisThickness": 0
	      },
	      "dataProvider": graphData
		});
	}

	// Create linechart for given tab on the index page
	this.DrawMainChart = function(graphData, divID, datatype_id, period, details, indicator_id) {
		// console.log(graphData);
		// console.log("divID: " + divID);
		// console.log("datatype_id: " + datatype_id);
		// console.log("period: " + period);
		// console.log("indicator_id: " + indicator_id);

		var gridCount = 30;
		var labelRotation = 0;
		if(indicator_id == '492'){	// Las Vegas MSA Employment
			gridCount = 5;
		}
		if(indicator_id == '1310'){	// Average Weekly Hours Worked
			gridCount = 2;
		}
		if(indicator_id == '2450964' || indicator_id == '2450963'){	// Continued Claims && Initial Unemployment Insurance Claims
			gridCount = 10;
			labelRotation = 35;
		}
		console.log("indicator_id: " + indicator_id + " gridCount: " + gridCount);

		var unit = prefix = "";
		var graphData = JSON.parse(graphData);
		if(datatype_id == 3)
			unit = '%';
		else if(datatype_id == 2)
			prefix = '$';
		// console.log("unit: " + unit + " prefix: " + prefix);

		// console.log(details);
		if(details.view == "peak_to_trough"){
			var value1 = details.peak_value;
			var value2 = details.trough_value;
			// var diff_value = ((parseFloat(value1)+parseFloat(value2))/2);
		}else if(details.view == "peak_to_current"){
			var value1 = details.peak_value;
			var value2 = details.current_value;
			// var diff_value = ((parseFloat(value1)+parseFloat(value2))/2);
		}else if(details.view == "trough_to_current"){
			var value1 = details.trough_value;
			var value2 = details.current_value;
			// var diff_value = ((parseFloat(value1)+parseFloat(value2))/2);
		}else{
			var value1 = "";
			var value2 = "";
			// var diff_value = "";
		}
		var difference = details.difference;
		/*if(difference != "" && difference != "undefined"){
			difference = "↓"+difference;
		}*/
		var label1 = details.label1;
		var label2 = details.label2;		
		var label1color = details.label1color;
		var label2color = details.label2color;
		if(label1 == '' || label2 == ""){
			thickness = 0;
		}else{
			thickness = 2;
		}
		var label1X = label2X = diffX = 80;
		var label1Y = 30;
		var label2Y = 150;
		var diffY = 90;

		if(details.view != '' && details.view != 'undefined'){
			$("#first").html(label1);
			$("#first").css("color", label1color);
			$("#second").html(label2);
			$("#second").css("color", label2color);
			$("#difference").html(difference);
			$("#difference").css("color", "#000000");
		}else{
			$(".show_labels").hide();
		}

		/*if(value1 == value2 || diff_value == 0){
			value1 = parseFloat(value1)*(1.01);
			value2 = parseFloat(value1)*(.90);
		}*/

		// console.log("thickness: " + thickness);
		// console.log("value1: " + value1);
		// console.log("value2: " + value2);
		// console.log("difference value: " + diff_value);
		var year = [];
		var chart = AmCharts.makeChart(divID, {
	      "type": "serial",
	      "numberFormatter": {precision:-1, decimalSeparator:'.', thousandsSeparator:','},
	      "usePrefixes": true,
	      "prefixesOfBigNumbers": [
			{number:1e+3,prefix:"K"},
			{number:1e+6,prefix:"M"},
			{number:1e+9,prefix:"B"},
			{number:1e+12,prefix:"T"},
			{number:1e+15,prefix:"P"},
			{number:1e+18,prefix:"E"},
			{number:1e+21,prefix:"Z"},
			{number:1e+24,prefix:"Y"}],
		  "addClassNames": true,
	      "theme": "none",
	      "autoMargins": false,
	      "marginRight": 50,
	      "marginLeft": 60,
	      "marginBottom": 50,
	      // "autoMarginOffset": 20,
		  "balloon": {
            "adjustBorderColor": false,
            "horizontalPadding": 10,
            "verticalPadding": 8,
            "color": "#ffffff"
          },
	      "pathToImages": BaseUrl+"assets/images/",
	      "dataDateFormat": "YYYY-MM-DD",
	      "valueAxes": [ {
	        "id": "v1",
	        "axisAlpha": 0,
	        "position": "left",
	        "fontSize": 13,
	        "boldLabels": true,
	        "ignoreAxisWidth": true,
			"unit" : unit,
			"guides": [
				{
					"id": "g1",
		            "dashLength": 8,
		            "lineAlpha": 5,
		            "value": value1,
		            "lineColor" : label1color,
		            "lineThickness" : thickness,
		            // "balloonText": "<span style='font-size:14px;font-style:bold;'>[[description]]</span>",
		            // "label": label1,
		            // "position": "top",
		            // "boldLabel": true,
		            // "color": label1color,
		            // "fontSize": 16,
		            "above": true
	        	},{
					"id": "g2",
		            "dashLength": 8,
		            "lineAlpha": 5,
		            "value": value2,
		            "lineColor" : label2color,
		            "lineThickness" : thickness,
		            // "balloonText": "<span style='font-size:14px;font-style:bold;'>[[description]]</span>",
		            // "label": label2,
		            // "position": "top",
		            // "boldLabel": true,
		            // "color": label2color,
		            // "fontSize": 16,
		            "above": true
	        	}/*,{
					"id": "g3",
		            "dashLength": 0,
		            "lineAlpha": 0,
		            "value": diff_value,
		            "lineColor" : "#000000",
		            "lineThickness" : 0,
		            // "balloonText": "<span style='font-size:14px;font-style:bold;'>[[description]]</span>",
		            "label": difference,
		            "position": "top",
		            "boldLabel": true,
		            "color": "#000000",
		            "fontSize": 16,
		            "above": true
	        	}*/
	        ],
	        labelFunction : function(value, valueText, valueAxis) {
	        	// console.log(valueAxis);
	        	// valueAxis.x, valueAxis.y, axisX, axisY
	        	// console.log("value: " + value + " valueText: " + valueText);
	        	if(indicator_id == '60228' || indicator_id == '176' || indicator_id == '404'
	        	 || indicator_id == '401' || indicator_id == '402' || indicator_id == '172' || indicator_id == '173'){
	        	 	/*if(value >= 1000000000)
	        			return "$" + (value/1000000000).toFixed(1) + " B";
	        		else if(value >= 10000000)
	        			return "$" + (value/1000000).toFixed(1) + " M";
	        		else if(value >= 100000)
	        			return "$" + (value/1000).toFixed(1) + " K";
	        		else
	        			return "$" + value;*/
	        		return prefix + "" + valueText;
	        	}else{
	        		return valueText;
	        	}
				// var label1X = label2X = diffX = 200;
				// var label1Y = 40;
				// var label2Y = 170;
				// var diffY = 110;
				// chart.write(divID);
	        	// if(prefix == 'average-weekly-hours-private'){
	        	// 	return prefix+""+value.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	        	// }else if(divID == 'taxable-rental-sales' || divID == 'gross-casino-gaming-revenue'){
	        	// 	return "$" + (value/1000000000).toFixed(1) + " B";
	        	// }else{
	        	// 	return prefix+""+parseInt(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	        	// }
	        }	        
	      } ],
	      "balloon": {
	        "borderThickness": 1,
	        "shadowAlpha": 0
	      },
	      /*"image": {
	      	"url": "https://recoverydashboard.myresearcher.com/assets/images/down-arrow.svg",
	      	"height": 500,
	      	"width": 500
	      },*/
		  /*"allLabels": [{
			"text": label1,
			"bold": true,
			"color": label1color,
			"size": 16,
			"x": label1X,
			"y": label1Y
		  },{
			"text": label2,
			"bold": true,
			"color": label2color,
			"size": 16,
			"x": label2X,
			"y": label2Y
		  },{
			"text": difference,
			"bold": true,
			// "color": "#ffffff",
			"size": 16,
			"x": diffX,
			"y": diffY
		  }],*/
	      "graphs": [ {
	        "id": "g1",
	        "type": "column",
	        "fillAlphas": 1,
	        "fillColorsField": "color",
	        // "bullet": "round",
	        // "bulletBorderAlpha": 1,
	        // "bulletColor": "#FFFFFF",
	        // "bulletSize": 5,
	        // "hideBulletsCount": 50,
	        "lineThickness": 1,	// 25-11-2020
	        "lineAlpha": 1,
	        "lineColorField": "color",
	        // "title": "red line",
	        "useLineColorForBulletBorder": true,
	        "valueField": "value",
	        "balloonText": "<span style='font-size:14px;font-style:bold;'>[[description]]</span>",
	        "patternField": "pattern",
	      } ],
	      "categoryField": "date",
	      "categoryAxis": {
	        "parseDates": false,
	        "fontSize": 13,
	        "boldLabels": true,
	        "dashLength": 1,
	        "minorGridEnabled": true,
		    "autoGridCount": false,
          	"gridCount": gridCount,
		    // "gridPosition": "start",
		    "labelRotation": labelRotation,
	        "guides": [{
	            "category": "1980-01-01",
	            "toCategory": "1980-07-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "1981-07-01",
	            "toCategory": "1982-11-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "1990-07-01",
	            "toCategory": "1991-03-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "2001-03-01",
	            "toCategory": "2001-11-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "2007-12-01",
	            "toCategory": "2009-06-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "2020-03-01",
	            "toCategory": "2020-08-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	}],
			labelFunction : function(valueText, date, categoryAxis) {
				date = date.category;
				var t = date.toString().split(/[- :]/);
				var dObj = new Date(t[0], t[1]-1, t[2]);

				/*if(indicator_id == '2450964' || indicator_id == '2450963'){
					var onejan = new Date(dObj.getFullYear(),0,1);
					var weekNumber = Math.ceil((((dObj - onejan) / 86400000) + onejan.getDay()+1)/7);
					// console.log("Week Number:-  " + weekNumber); // Returns the week number as an integer
					return "W"+weekNumber+"-"+dObj.getFullYear().toString().substr(2, 2);
				}*/

				if(indicator_id == '2450964' || indicator_id == '2450963'){
					return "W1-"+dObj.getFullYear().toString();
				}

				if(indicator_id == '492' || indicator_id == '1310'){
					return dObj.getFullYear().toString();	
				}
				// console.log("Year: "+ t[0] + " => " + year.indexOf(t[0]));
				if( t[0] % 5 === 0 && year.indexOf(t[0]) === -1 ){
					// console.log("Year: " + t[0]);
					year.push(t[0]);
					return dObj.getFullYear().toString();
				}
			}
	      },
	      "dataProvider": graphData
		});
		// $(".amcharts-guide-g1").attr("transform", "translate(230,182)");
		// console.log($(".amcharts-guide-g1").attr("transform"));
		// $(".amcharts-guide-g1 tspan").attr("x",function(index,currentvalue){ return currentvalue += 180; console.log("index: " + index + " value: " + currentvalue); });
		// $(".amcharts-guide-g1 tspan").attr("x",function(index,currentvalue){ console.log("currentvalue: " + currentvalue); return currentvalue = 230; });
		// $(".amcharts-guide-g1 tspan").attr("y",function(index,currentvalue){ console.log("currentvalue: " + currentvalue); return currentvalue = -1; });
		// $(".amcharts-guide-g2 tspan").attr("x",function(index,currentvalue){ console.log("currentvalue: " + currentvalue); return currentvalue = 230; });
		// $(".amcharts-guide-g2 tspan").attr("y",function(index,currentvalue){ console.log("currentvalue: " + currentvalue); return currentvalue = -1; });
		// $(".amcharts-guide-g3 tspan").attr("x",function(index,currentvalue){ console.log("currentvalue: " + currentvalue); return currentvalue = 230; });
		// $(".amcharts-guide-g3 tspan").attr("y",function(index,currentvalue){ console.log("currentvalue: " + currentvalue); return currentvalue = -1; });
		// 230-Min, 280-Des
		// $(".amcharts-guide tspan").attr("x",function(index,currentvalue){ return currentvalue = 280; });
		// $(".amcharts-guide tspan").attr("y",function(index,currentvalue){ return currentvalue = -1; });

		// console.log($(".amcharts-guide-g1 tspan").attr("x"));
		// console.log($(".amcharts-guide-g1 tspan").attr("y"));

		/*
	    var optionSelected = $("select").find("option:selected");
	    var valueSelected  = optionSelected.val();

		if( indicator_id == 446 && valueSelected != "peak_to_current" ){
			$(".amcharts-guide-g1 tspan").attr("x",function(index,currentvalue){ return currentvalue = 300; });
			$(".amcharts-guide-g1 tspan").attr("y",function(index,currentvalue){ return currentvalue = -9; });
			$(".amcharts-guide-g2 tspan").attr("x",function(index,currentvalue){ return currentvalue = 300; });
			$(".amcharts-guide-g2 tspan").attr("y",function(index,currentvalue){ return currentvalue = 29; });
			$(".amcharts-guide-g3 tspan").attr("x",function(index,currentvalue){ return currentvalue = 300; });
			$(".amcharts-guide-g3 tspan").attr("y",function(index,currentvalue){ return currentvalue = 11; });
		}else if( (value1 - value2) >= 0 ){
			$(".amcharts-guide-g1 tspan").attr("x",function(index,currentvalue){ return currentvalue = 300; });
			$(".amcharts-guide-g1 tspan").attr("y",function(index,currentvalue){ return currentvalue = -9; });
			$(".amcharts-guide-g2 tspan").attr("x",function(index,currentvalue){ return currentvalue = 300; });
			$(".amcharts-guide-g2 tspan").attr("y",function(index,currentvalue){ return currentvalue = 29; });
			$(".amcharts-guide-g3 tspan").attr("x",function(index,currentvalue){ return currentvalue = 300; });
			$(".amcharts-guide-g3 tspan").attr("y",function(index,currentvalue){ return currentvalue = 11; });
		}else{
			$(".amcharts-guide-g2 tspan").attr("x",function(index,currentvalue){ return currentvalue = 300; });
			$(".amcharts-guide-g2 tspan").attr("y",function(index,currentvalue){ return currentvalue = -9; });
			$(".amcharts-guide-g1 tspan").attr("x",function(index,currentvalue){ return currentvalue = 300; });
			$(".amcharts-guide-g1 tspan").attr("y",function(index,currentvalue){ return currentvalue = 29; });
			$(".amcharts-guide-g3 tspan").attr("x",function(index,currentvalue){ return currentvalue = 300; });
			$(".amcharts-guide-g3 tspan").attr("y",function(index,currentvalue){ return currentvalue = 11; });
		}
		*/

	}

	// Create linechart for given tab on the index page
	this.DrawMainCharting = function(graphData, divID, datatype_id, period, details, indicator_id) {
		var unit = prefix = "";
		var graphData = JSON.parse(graphData);
		if(datatype_id == 3)
			unit = '%';
		else if(datatype_id == 2)
			prefix = '$';

		var gridCount = 5;
		labelRotation = 0;
		if(indicator_id == '1310'){
			gridCount = 2;
		}
		if(indicator_id == '2450964' || indicator_id == '2450963'){	// Continued Claims && Initial Unemployment Insurance Claims
			gridCount = 10;
			labelRotation = 35;
		}
		console.log("indicator_id: " + indicator_id + " gridCount: " + gridCount);

		var chart = AmCharts.makeChart(divID, {
	      "type": "serial",
	      "numberFormatter": {precision:-1, decimalSeparator:'.', thousandsSeparator:','},
	      "usePrefixes": true,
	      "prefixesOfBigNumbers": [
			{number:1e+3,prefix:"K"},
			{number:1e+6,prefix:"M"},
			{number:1e+9,prefix:"B"},
			{number:1e+12,prefix:"T"},
			{number:1e+15,prefix:"P"},
			{number:1e+18,prefix:"E"},
			{number:1e+21,prefix:"Z"},
			{number:1e+24,prefix:"Y"}],
		  "addClassNames": true,
	      "theme": "none",
	      "autoMargins": false,
	      "marginRight": 50,
	      "marginLeft": 60,
	      "marginBottom": 50,
		  "balloon": {
            "adjustBorderColor": false,
            "horizontalPadding": 10,
            "verticalPadding": 8,
            "color": "#ffffff"
          },
	      "pathToImages": BaseUrl+"assets/images/",
	      "dataDateFormat": "YYYY-MM-DD",
	      "valueAxes": [ {
	        "id": "v1",
	        "axisAlpha": 0,
	        "position": "left",
	        "fontSize": 13,
	        "boldLabels": true,
	        "ignoreAxisWidth": true,
			"unit" : unit,
	        labelFunction : function(value, valueText, valueAxis) {
	        	if(indicator_id == '60228' || indicator_id == '176' || indicator_id == '404'
	        	 || indicator_id == '401' || indicator_id == '402' || indicator_id == '172' || indicator_id == '173'){
	        		return prefix + "" + valueText;
	        	}else{
	        		return valueText;
	        	}
	        }	        
	      } ],
	      "balloon": {
	        "borderThickness": 1,
	        "shadowAlpha": 0
	      },
	      "graphs": [ {
	        "id": "g1",
	        "type": "column",
	        "fillAlphas": 1,
	        "fillColorsField": "color",
	        "lineThickness": 2,
	        "lineColorField": "color",
	        "title": "red line",
	        "useLineColorForBulletBorder": true,
	        "valueField": "value",
	        "balloonText": "<span style='font-size:14px;font-style:bold;'>[[description]]</span>",
	        "patternField": "pattern"
	      } ],
	      "categoryField": "date",
	      "categoryAxis": {
	        "parseDates": false,
	        "fontSize": 13,
	        "boldLabels": true,
	        "dashLength": 1,
	        "minorGridEnabled": true,
		    "autoGridCount": false,
          	"gridCount": gridCount,
          	"labelRotation": labelRotation,
		    // "gridPosition": "start",
	        "guides": [{
	            "category": "1980-01-01",
	            "toCategory": "1980-07-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "1981-07-01",
	            "toCategory": "1982-11-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "1990-07-01",
	            "toCategory": "1991-03-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "2001-03-01",
	            "toCategory": "2001-11-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "2007-12-01",
	            "toCategory": "2009-06-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	},{
	            "category": "2020-03-01",
	            "toCategory": "2020-08-01",
	            "lineColor": "#666666",
	            "lineAlpha": 0.2,
	            "fillAlpha": 0.2,
	            "fillColor": "#666666",
	            "dashLength": 2,
	            "inside": true,
        	}],
			labelFunction : function(valueText, date, categoryAxis) {
				date = date.category;
				var t = date.toString().split(/[- :]/);
				var dObj = new Date(t[0], t[1]-1, t[2]);
				if(indicator_id == '2450964' || indicator_id == '2450963'){
					return "W1-"+dObj.getFullYear().toString();
				}
				return dObj.getFullYear().toString();
			},
			/*labelFunction : function(valueText, date, categoryAxis) {
				date = date.category;
				var t = date.toString().split(/[- :]/);
				var dObj = new Date(t[0], t[1]-1, t[2]);
				if(indicator_id == '2450964' || indicator_id == '2450963'){
					/* Week of the Year * /
					var onejan = new Date(dObj.getFullYear(),0,1);
					var weekNumber = Math.ceil((((dObj - onejan) / 86400000) + onejan.getDay()+1)/7);
					// console.log("Week Number:-  " + weekNumber); // Returns the week number as an integer
					return "W"+weekNumber+"-"+dObj.getFullYear().toString();					
					// return "W1-"+dObj.getFullYear().toString();
				}
				var month = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'};
				return month[dObj.getMonth()]+"-"+dObj.getFullYear().toString();
				// return dObj.getFullYear().toString();
			}*/
	      },
	      "dataProvider": graphData,
		  /*"chartCursor": {
			    "cursorAlpha": 0
		  }*/
		});
	}

})(jQuery)
 
var mainloading = function (show) {
	if (show)
	   $('#preloader').show();
	else
	   $('#preloader').hide();
}

jQuery(document).ready(function($){

	/* Load Contents */
	try{
		// mainloading(true);
		if($(".table-sec").length > 0){
			// setTimeout(function(){ 
				param = { 'urls' : 'alltabs' },
				myScript.sendAjax(param, function(xhr){
					if(xhr.result!=1){
						console.log('error in request');
						return false
					}
					var resultData = xhr.data;
					// console.log(resultData);
		  			var tblContainer = $('.table-sec table tbody');
					tblContainer.empty();
					$.each(resultData,function(k,v){
						// console.log("indicator_id: " + v.indicator_id + ", datatype_id: " + v.datatype);
						$("#my-table-template").template("tabledata");
						$.tmpl( "tabledata", v ).appendTo( ".table-sec table tbody" );
						// $('tr#'+(v.indicator_id)).attr('data-rel', JSON.stringify(v['trend']));
						// myScript.DrawTrendChart($('tr#'+(v.indicator_id)).attr('data-rel'), "trend_"+(v.indicator_id));
					});
					// mainloading(false);
				});
			// }, 5000);
			// mainloading(false);
			param = { 'urls' : 'graphData' },
			myScript.sendAjax(param, function(xhr){
				if(xhr.result!=1){
					console.log('error in request');
					return false
				}
				var resultData = xhr.data;
				// console.log(resultData);
				$.each(resultData,function(k,v){
					// console.log("K: " + k);
					// $('tr#'+k).attr('data-rel', JSON.stringify(v));
					// myScript.DrawTrendChart($('tr#'+k).attr('data-rel'), "trend_"+k);
					myScript.DrawTrendChart(JSON.stringify(v), "trend_"+k);
				});
			});			
		}
	}catch(e){
		console.log('table not intialized');
	}
	/**/

	/* Show demographics data */
	$(document).on('click', 'table#recoverydatatable tbody#dashboard tr', function(){
		if($(this).hasClass('active')){
			$('tr').removeClass('active');
			$(".rs_chart_content").hide();
		}else{
			$('tr').removeClass('active');
			$(this).addClass('active');
			var indicator_id = $(this).attr("id");
			var data 		 = $(this).attr("data-rel");
			var datatype 	 = $(this).attr("data-datatype");
			var period 		 = $(this).attr("data-period");
			var type 		 = $(this).attr("data-type");
			var start_date = $(this).attr("data-startdate");
			var current_date = $(this).attr("data-date");
			var indicator_name = $(this).attr("data-name");
			$("#start_date").html(start_date);
			$("#latest_date").html(current_date);
			// console.log("Current Date: " + current_date);
			// console.log("Start Date: " + start_date);
			// console.log(data);
			// var indicator_name = $.trim($(this).find('td:nth-child(2)').html());
			// console.log("Name: " + indicator_name);
			if(indicator_name !== undefined && indicator_name != ''){
				$(".rs_chart_content h2").html(indicator_name);
			}

			var peak_date 		= $.trim($(this).find('td:nth-child(3)').html());
			// console.log("peak_date: " + peak_date);
			$("#peak_date").html(peak_date);
			var peak_value 		= $.trim($(this).find('td:nth-child(4)').html());
			// console.log("peak_value:" + peak_value);
			$("#peak_value").html(peak_value);
			var trough_date 	= $.trim($(this).find('td:nth-child(5)').html());
			// console.log("trough_date:" + trough_date);
			$("#trough_date").html(trough_date);
			var trough_value 	= $.trim($(this).find('td:nth-child(6)').html());
			// console.log("trough_value:" + trough_value);
			$("#trough_value").html(trough_value);
			var current_date 	= $.trim($(this).find('td:nth-child(7)').html());
			// console.log("current_date:" + current_date);
			$("#current_date").html(current_date);
			var current_value 	= $.trim($(this).find('td:nth-child(8)').html());
			// console.log("current_valu:" + current_value);
			$("#current_value").html(current_value);
			var percent_peak 	= $.trim($(this).find('td:nth-child(9)').html());
			// console.log("percent_peak:" + percent_peak);
			$("#percent_peak").html(percent_peak);

			var change_peak 			= $.trim($(this).find('td:nth-child(10)').html());
			// console.log("change_peak:" + change_peak);
			$("#change_peak").html(change_peak);
			var change_percent_peak 	= $.trim($(this).find('td:nth-child(11)').html());
			// console.log("change_percent_peak:" + change_percent_peak);
			$("#change_percent_peak").html(change_percent_peak);
			var change_trough 			= $.trim($(this).find('td:nth-child(12)').html());
			// console.log("change_trough:" + change_trough);
			$("#change_trough").html(change_trough);
			var change_percent_trough 	= $.trim($(this).find('td:nth-child(13)').html());
			// console.log("change_percent_trough:" + change_percent_trough);
			$("#change_percent_trough").html(change_percent_trough);

			// $(".rs_monthly_data span#charttype").html("Monthly Year-Over-Year");
			// $(".rs_monthly_data span#current_date").html(current_date);

			$(".chart-bottom").hide();
			$('#transform').attr("data-rel", 0);
			$('#transform').html("View Growth");
			$(".transform_0").show();
			$('select.ml-4').val("");
			if(type == "0"){
				$("#charttype").html("Monthly Totals");
				// $("#indicator_legend").html("Monthly "+indicator_name);
				// $("#indicator_legend").attr("title", "Monthly "+indicator_name);
			}
			else if(type == "1"){
				$("#charttype").html("Trailing 12 Month Totals");
				// $("#indicator_legend").html("Trailing 12 Month "+indicator_name);
				// $("#indicator_legend").attr("title", "Trailing 12 Month "+indicator_name);
			}
			else if(type == "2"){
				$("#charttype").html("YoY Change Trailing 12 Month Average");
				// $("#indicator_legend").html("YoY Change Trailing 12 Month Average "+indicator_name);
				// $("#indicator_legend").attr("title", "YoY Change Trailing 12 Month Average "+indicator_name);
			}else{
				$("#charttype").html("Weekly Totals");
			}
			$(".show_labels").hide();
			// myScript.DrawMainChart(data, "chart-sec", datatype, period);
			param = { 'urls' : 'get_trend_data', 'indicator_id': indicator_id, 'transform': 0, 'view': '' },
			myScript.sendAjax(param, function(xhr){
				if(xhr.result!=1){
					console.log('error in request');
					return false
				}
				var resultData = xhr.data;
				// console.log(resultData);
				// $('tr#'+(v.indicator_id)).attr('data-rel', JSON.stringify(v['trend']));
				if(indicator_id == "492" || indicator_id == "1310" || indicator_id == "44166" || indicator_id == "2450963" || indicator_id == "2450964"){
					myScript.DrawMainCharting(JSON.stringify(resultData.graph), "chart-sec", datatype, period, resultData.details, indicator_id);
				}else{
					myScript.DrawMainChart(JSON.stringify(resultData.graph), "chart-sec", datatype, period, resultData.details, indicator_id);
				}
				
				// mainloading(false);
			});
			$(".rs_chart_content").show();
		}
	});

	$('.close_btn').on('click', function (e) {
		// $('tr').removeClass('active');
		// $(".rs_chart_content").hide("slow");
		$('tr.active').trigger('click');
	});

	$('#transform').on('click', function (e) {
		$(".chart-bottom").hide();
		if($(this).attr("data-rel") == "0"){
			$(this).attr("data-rel", 1);
			$(this).html("View Monthly Totals");
			if($('tr.active').attr('data-type') == 0)
				$("#charttype").html("Monthly Year-Over-Year Comparison");
			else if($('tr.active').attr('data-type') == 1)
				$("#charttype").html("Trailing 12 Months Year-Over-Year Comparison");
			else if($('tr.active').attr('data-type') == 2)
				$("#charttype").html("YoY Change Trailing 12 Month Average Year-Over-Year Comparison");
			else
				$("#charttype").html("Weekly Year-Over-Year Comparison");
			// $("#charttype").html("Monthly Year-Over-Year Comparison");
			$(".transform_1").show();
		}else{
			$(this).attr("data-rel", 0);
			$(this).html("View Growth");
			if($('tr.active').attr('data-type') == 0)
				$("#charttype").html("Monthly Totals");
			else if($('tr.active').attr('data-type') == 1)
				$("#charttype").html("Trailing 12 Month Totals");
			else if($('tr.active').attr('data-type') == 2)
				$("#charttype").html("YoY Change Trailing 12 Month Average");
			else
				$("#charttype").html("Weekly Totals");
			$(".transform_0").show();
		}
		showChart();
	});

	$('select.ml-4').on('change', function (e) {
		showChart();
	});

	function showChart(){
		var indicator_id = $("tr.active").attr("id");
		if(indicator_id === undefined || indicator_id == ''){
			return false;
		}
		var datatype 	= $("tr.active").attr("data-datatype");
		var period 		= $("tr.active").attr("data-period");
		var transform = $("#transform").attr("data-rel");
		var view = "";
		if(transform == 0){
			// console.log("Check");
		    var optionSelected = $("select").find("option:selected");
		    var valueSelected  = optionSelected.val();
		    // var textSelected   = optionSelected.text();
		    // console.log(optionSelected);
		    // console.log("value selected: " + valueSelected);
		    // console.log("text selected: " + textSelected);
		    if(valueSelected == "peak_to_trough"){
		    	view = 'peak_to_trough';
		    }else if(valueSelected == "peak_to_current"){
		    	view = 'peak_to_current';
		    }else if(valueSelected == "trough_to_current"){
		    	view = 'trough_to_current';
		    }else{ }
		}else{
			datatype = 3;
		}
		if(view != '' && view != 'undefined'){
			$(".show_labels").css("display", "flex");
		}
	    // console.log("View: " + view + ", transform: " + transform);
		param = { 'urls' : 'get_trend_data', 'indicator_id': indicator_id, 'transform': transform, 'view': view },
		myScript.sendAjax(param, function(xhr){
			if(xhr.result!=1){
				console.log('error in request');
				return false
			}
			var resultData = xhr.data;
			// console.log("dataType: " + datatype);
			// console.log("period: " + period);
			// console.log(resultData);
			// $('tr#'+(v.indicator_id)).attr('data-rel', JSON.stringify(v['trend']));
			myScript.DrawMainChart(JSON.stringify(resultData.graph), "chart-sec", datatype, period, resultData.details, indicator_id);
			// mainloading(false);
		});
	}

});