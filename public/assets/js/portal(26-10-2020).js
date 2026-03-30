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
	this.DrawQuickCharting = function(graphData, divID, log, datatype_id) {
		var graphData = JSON.parse(graphData);
		var chart = AmCharts.makeChart(divID, {		
		  "type": "serial",
		  "zoomOutText": '',
	      "numberFormatter": {precision:-1, decimalSeparator:'.', thousandsSeparator:','},
	      "usePrefixes": true,
	      "pathToImages": "https://nevadabuilders.org/wp-content/themes/x-child/assets/img/",
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
		  "autoMargins": true,
		  "balloon": {
		    "adjustBorderColor": false,
		    "horizontalPadding": 10,
		    "verticalPadding": 8,
		    "color": "#ffffff"
		  },/*
		  "chartCursor": {
			"cursorAlpha":1,
			"cursorColor":"#4472c3",
		  },*/
		  "dataProvider": graphData,
		  "valueAxes": [ {
		    "axisAlpha": 0,
		    "position": "left",
          	"fontSize": 14,
          	"autoGridCount": false,
          	"gridCount": 5,
          	"logarithmic": log,
		  } ],
		  "startDuration": 1,
		  "graphs": [ {
		    "alphaField": "alpha",
		    "balloonText": "<span style='font-size:20px;'>[[fvalue]]</span>",
		    "fillAlphas": 1,
		    "type": "column",
		    "valueField": "value",
    		"lineColor": "#4472c3",
    		"lineAlpha": 0.5
		  } ],
		  "categoryField": "date",
		  "categoryAxis": {
		  	"labelsEnabled": true,
		    "gridThickness": 0,
		    "autoGridCount": false,
          	"gridCount": 52,
		    "gridPosition": "start",
		    "axisAlpha": 0,
		    "tickLength": 0,
    		"labelRotation": 45,
          	"fontSize": 14,
          	"labelOffset": 10,
			labelFunction : function(valueText, date, categoryAxis) {
				date = date.category;
				var t = date.toString().split(/[- :]/);
				// Apply each element to the Date function
				var dObj = new Date(t[0], t[1]-1, t[2]);

				/* Date Format m/1/Y */
				return (dObj.getMonth()+1)+"/"+dObj.getDate()+"/"+dObj.getFullYear().toString().substr(2, 2);

				/* Month of the Year */
				// var month = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'};
				// return month[dObj.getMonth()]+"-"+dObj.getFullYear().toString().substr(2, 2);				
			}
		  },
		});
	}

	// Create linechart for given tab on the index page
	this.DrawQuickChart = function(graphData, divID, log, datatype_id) {
		var unit = '';
		var prefix = '';
		var gridCount = 0;
		if(datatype_id == 3){
			gridCount = 5;
			unit = '%';
		}else if(datatype_id == 2){
			gridCount = 6;
			prefix = '$';
		}else{
			gridCount = 5;
		}
		// console.log(divID + " prefix: " + prefix);
		var graphData = JSON.parse(graphData);
		var chart = AmCharts.makeChart(divID, {		
		  "type": "serial",
	      "numberFormatter": {precision:-1, decimalSeparator:'.', thousandsSeparator:','},
	      "usePrefixes": true,
	      "pathToImages": "https://nevadabuilders.org/wp-content/themes/x-child/assets/img/",
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
		  "autoMargins": true,
		  "balloon": {
		    "adjustBorderColor": false,
		    "horizontalPadding": 10,
		    "verticalPadding": 8,
		    "color": "#ffffff"
		  },
		  "chartCursor": {
			"cursorAlpha":1,
			"cursorColor":"#4472c3",
		  },
		  "dataProvider": graphData,
		  "valueAxes": [ {
		    "axisAlpha": 0,
		    "position": "left",
          	"fontSize": 14,
          	"autoGridCount": false,
          	"gridCount": gridCount,
          	"logarithmic": log,
			"unit" : unit,
	        labelFunction : function(value, valueText, valueAxis) {
	        	// console.log(value);
	        	if(divID == 'average-weekly-hours-private'){
	        		return prefix+""+value.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	        	}else if(divID == 'taxable-rental-sales' || divID == 'gross-casino-gaming-revenue'){
	        		return "$" + (value/1000000000).toFixed(1) + " B";
	        	}else{
	        		return prefix+""+parseInt(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	        	}
	        }
		  } ],
		  "startDuration": 1,
		  "graphs": [ {
		    "alphaField": "alpha",
		    "balloonText": "<span style='font-size:20px;'>[[fvalue]]</span>",
		    "fillAlphas": 1,
		    "type": "column",
		    "valueField": "value",
    		"lineColor": "#4472c3",
    		"lineAlpha": 0.5
		  } ],
		  "categoryField": "date",
		  "categoryAxis": {
		  	"labelsEnabled": true,
		    "gridThickness": 0,
		    "autoGridCount": false,
          	"gridCount": 13,
		    "gridPosition": "start",
		    "axisAlpha": 0,
		    "tickLength": 0,
    		"labelRotation": 45,
          	"fontSize": 14,
          	"labelOffset": 10,
			labelFunction : function(valueText, date, categoryAxis) {
				date = date.category;
				var t = date.toString().split(/[- :]/);
				// Apply each element to the Date function
				var dObj = new Date(t[0], t[1]-1, t[2]);

				/* Date Format m/1/Y */
				// return (dObj.getMonth()+1)+"/"+dObj.getDate()+"/"+dObj.getFullYear().toString().substr(2, 2);

				/* Month of the Year */
				var month = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'};
				// return month[dObj.getMonth()]+"-"+dObj.getFullYear().toString().substr(2, 2);				
				return month[dObj.getMonth()]+"-"+dObj.getFullYear().toString();				
			}
		  },
		});
	}

	// Create linechart for given tab on the index page
	this.DrawLineChart = function(graphData, divID, log=false, datatype_id) {
		// console.log(graphData);
		if(datatype_id == 3)
			unit = '%';
		else
			unit = '';
		var graphData = JSON.parse(graphData);
		var chart = AmCharts.makeChart(divID, {
		  "type": "serial",
	      "numberFormatter": {precision:-1, decimalSeparator:'.', thousandsSeparator:','},
	      "usePrefixes": true,
	      "pathToImages": "https://nevadabuilders.org/wp-content/themes/x-child/assets/img/",
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
		  "autoMargins": true,
          "balloon": {
            "adjustBorderColor": false,
            "horizontalPadding": 10,
            "verticalPadding": 8,
            "color": "#ffffff"
          },
          "chartCursor": {
                "cursorAlpha":1,
                "cursorColor":"#4472c3",
          },
		  "dataProvider": graphData,
		  "valueAxes": [{
		    "axisAlpha": 0,
		    "position": "left",
          	"fontSize": 14,
          	"autoGridCount": false,
          	"gridCount": 5,
			"unit" : unit
		  }],
		  "startDuration": 1,
		  "graphs": [{
		  	"alphaField": "alpha",
		    "balloonText": "<span style='font-size:20px;'>[[fvalue]]</span>",
		    // "fillColors": color,
		    "fillAlphas": 1,
		    "lineColor" : '#3e6fb6',
		    "fillAlphas": 0,
		    "lineAlpha": 1,
		    "lineThickness": 5,
		    "type": "line",
		    "valueField": "value"
		  }],
		  "categoryField": "date",
    	  "dataDateFormat": "YYYY-MM-DD",
		  "categoryAxis": {
		  	"labelsEnabled" : true,
		    "gridThickness": 0,
		    "autoGridCount": false,
          	"gridCount": 13,
		    "gridPosition": "start",
		    "axisAlpha": 0,
		    "tickLength": 0,
    		"labelRotation": 45,
          	"fontSize": 14,
          	"labelOffset": 10,
			labelFunction : function(valueText, date, categoryAxis) {
				date = date.category;
				var t = date.toString().split(/[- :]/);
				// Apply each element to the Date function
				var dObj = new Date(t[0], t[1]-1, t[2]);

				/* Week of the Year */
				// var onejan = new Date(dObj.getFullYear(),0,1);
				// var weekNumber = Math.ceil((((dObj - onejan) / 86400000) + onejan.getDay()+1)/7);
				// console.log("Week Number:-  " + weekNumber); // Returns the week number as an integer
				// return "W"+weekNumber+"-"+dObj.getFullYear().toString().substr(2, 2);

				/* Month of the Year */
				var month = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'};
				// return "'"+dObj.getFullYear().toString().substr(2, 2);
				return month[dObj.getMonth()]+"-"+dObj.getFullYear().toString();

				/* Quarter of the Year */
	            // date = date.category;
	            // var t = date.toString().split(/[- :]/);
	            // var dObj = new Date(t[0], t[1] - 1, t[2]);
	            // var qtr = parseInt(dObj.getMonth() / 3) + 1;
	            // return 'Q' + qtr + '\n\'' + dObj.getFullYear().toString().substr(2, 2);

			}
		  }
		});
		// console.log(arr);
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
	this.DrawMainChart = function(graphData, divID, datatype_id, period, details) {
		// console.log(graphData);
		// console.log("divID: " + divID);
		// console.log("datatype_id: " + datatype_id);
		// console.log("period: " + period);
		var graphData = JSON.parse(graphData);
		if(datatype_id == 3)
			unit = '%';
		else
			unit = '';
		// console.log("unit: " + unit);

		// console.log(details);
		if(details.view == "peak_to_trough"){
			var value1 = details.peak_value;
			var value2 = details.trough_value;
		}else if(details.view == "peak_to_current"){
			var value1 = details.peak_value;
			var value2 = details.current_value;
		}else if(details.view == "current_to_trough"){
			var value1 = details.current_value;
			var value2 = details.trough_value;
		}else{
			var value1 = "";
			var value2 = "";
		}
		var difference = details.difference;
		var label1 = details.label1;
		var label2 = details.label2;		
		var label1color = details.label1color;
		var label2color = details.label2color;
		if(label1 == '' || label2 == ""){
			thickness = 0;
		}else{
			thickness = 2;
		}
		// console.log("thickness: " + thickness);

		var chart = AmCharts.makeChart(divID, {
	      "type": "serial",
	      "numberFormatter": {precision:-1, decimalSeparator:'.', thousandsSeparator:','},
	      "usePrefixes": true,
	      "pathToImages": "https://nevadabuilders.org/wp-content/themes/x-child/assets/img/",
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
	      "marginRight": 40,
	      "marginLeft": 80,
	      "autoMarginOffset": 20,
		  "autoMargins": true,
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
		            "lineThickness" : thickness
	        	},{
					"id": "g2",
		            "dashLength": 8,
		            "lineAlpha": 5,
		            "value": value2,
		            "lineColor" : label2color,
		            "lineThickness" : thickness
	        	}
	        ],
	      } ],
	      "balloon": {
	        "borderThickness": 1,
	        "shadowAlpha": 0
	      },
		  "allLabels": [{
			"text": label1,
			"bold": true,
			// "color": "#ffffff",
			"size": 16,
			"x": 80,
			"y": 30
		  },{
			"text": label2,
			"bold": true,
			// "color": "#ffffff",
			"size": 16,
			"x": 80,
			"y": 150
		  },{
			"text": difference,
			"bold": true,
			// "color": "#ffffff",
			"size": 16,
			"x": 80,
			"y": 90
		  }],	      
	      "graphs": [ {
	        "id": "g1",
	        "type": "column",
	        "fillAlphas": 0.2,
	        "fillColorsField": "color",
	        "bullet": "round",
	        "bulletBorderAlpha": 1,
	        "bulletColor": "#FFFFFF",
	        "bulletSize": 5,
	        "hideBulletsCount": 50,
	        "lineThickness": 2,
	        "lineColorField": "color",
	        "title": "red line",
	        "useLineColorForBulletBorder": true,
	        "valueField": "value",
	        "balloonText": "<span style='font-size:18px;font-style:bold;'>[[description]]</span>"
	      } ],
	      "categoryField": "date",
	      "categoryAxis": {
	        "parseDates": true,
	        "fontSize": 13,
	        "boldLabels": true,
	        "dashLength": 1,
	        "minorGridEnabled": true
	      },
	      "dataProvider": graphData
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
						$('tr#'+(v.indicator_id)).attr('data-rel', JSON.stringify(v['trend']));
						myScript.DrawTrendChart($('tr#'+(v.indicator_id)).attr('data-rel'), "trend_"+(v.indicator_id));
					});
					// mainloading(false);
				});
			// }, 5000);
			// mainloading(false);
		}
	}catch(e){
		console.log('table not intialized');
	}
	/**/

	/* Show demographics data */
	$(document).on('click', 'tr', function(){
		if($(this).hasClass('active')){
			$('tr').removeClass('active');
			$(".rs_chart_content").hide("slow");
		}else{
			$('tr').removeClass('active');
			$(this).addClass('active');
			var indicator_id = $(this).attr("id");
			var data 		 = $(this).attr("data-rel");
			var datatype 	 = $(this).attr("data-datatype");
			var period 		 = $(this).attr("data-period");
			var type 		 = $(this).attr("data-type");
			var current_date = $(this).attr("data-date");
			// console.log("Current Date: " + current_date);
			// console.log(data);
			var indicator_name = $.trim($(this).find('td:nth-child(2)').html());
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

			// myScript.DrawMainChart(data, "chart-sec", datatype. period);
			param = { 'urls' : 'get_trend_data', 'indicator_id': indicator_id, 'transform': 0, 'view': '' },
			myScript.sendAjax(param, function(xhr){
				if(xhr.result!=1){
					console.log('error in request');
					return false
				}
				var resultData = xhr.data;
				// console.log(resultData);
				// $('tr#'+(v.indicator_id)).attr('data-rel', JSON.stringify(v['trend']));
				myScript.DrawMainChart(JSON.stringify(resultData.graph), "chart-sec", datatype, period, resultData.details);
				// mainloading(false);
			});
			$(".rs_chart_content").show("slow");
		}
	});

	$('#transform').on('click', function (e) {
		$(".chart-bottom").hide();
		if($(this).attr("data-rel") == "0"){
			$(this).attr("data-rel", 1);
			$(this).html("View Monthly Totals");
			$(".transform_1").show();
		}else{
			$(this).attr("data-rel", 0);
			$(this).html("View Growth");
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
			console.log("Check");
		    var optionSelected = $("select").find("option:selected");
		    var valueSelected  = optionSelected.val();
		    // var textSelected   = optionSelected.text();
		    // console.log(optionSelected);
		    console.log("value selected: " + valueSelected);
		    // console.log("text selected: " + textSelected);
		    if(valueSelected == "peak_to_trough"){
		    	view = 'peak_to_trough';
		    }else if(valueSelected == "peak_to_current"){
		    	view = 'peak_to_current';
		    }else if(valueSelected == "current_to_trough"){
		    	view = 'current_to_trough';
		    }else{ }
		}
	    console.log("View: " + view + ", transform: " + transform);
		param = { 'urls' : 'get_trend_data', 'indicator_id': indicator_id, 'transform': transform, 'view': view },
		myScript.sendAjax(param, function(xhr){
			if(xhr.result!=1){
				console.log('error in request');
				return false
			}
			var resultData = xhr.data;
			console.log("dataType: " + datatype);
			console.log("period: " + period);
			console.log(resultData);
			// $('tr#'+(v.indicator_id)).attr('data-rel', JSON.stringify(v['trend']));
			myScript.DrawMainChart(JSON.stringify(resultData.graph), "chart-sec", datatype, period, resultData.details);
			// mainloading(false);
		});
	}

});