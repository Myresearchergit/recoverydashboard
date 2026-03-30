<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Recovery Dashboard</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
      <meta name="format-detection" content="telephone=no" />
      <meta name="SKYPE_TOOLBAR" content ="SKYPE_TOOLBAR_PARSER_COMPATIBLE"/>
      <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> -->
      <link href="https://fonts.googleapis.com/css?family=Lusitana:400,700" rel="stylesheet">
      <!-- <link rel="stylesheet" type="text/css" href="assets/css/lvn-gov-cd-style-new.css"> -->
      <link href="https://fonts.googleapis.com/css?family=Poppins:400,700" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Lusitana:wght@400;700&display=swap" rel="stylesheet">
      <!-- global css end -->
      <script type="text/javascript">
         var BaseUrl = '<?php echo url('/'); ?>';
      </script>
   </head>
   <body>

       <div class="preloader" id="preloader" style="display: block !important;">
         <div class="loader"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div>
      </div>

      <!-- Header Start -->
      <header class="rs_blue">
         <div class="wrapper-full py-3">
            <div class="logo">
               <!-- <a href=""><img src="<?php// echo base_url() ?>assets/img/lasvegasnevada-gov-logo.png"></a> -->
               <ul>
                  <li>
                     <a href="http://lasvegasnevada.gov">
                        <p class="mb-0">Return to</p>
                        <span>lasvegasnevada.<span class="font-normal">gov</span></span>
                     </a>
                  </li>
                  <li>
                     <a href="http://communitydashboard.vegas/">
                        <p class="mb-0">Return to Homepage for</p>
                        <span>Community Dashboard</span>
                     </a>
                  </li>
               </ul>
            </div>
            <div class="small_header_sec">
               <div class="head-text rs_head_text">
                  <h4>City of Las Vegas</h4>
                  <h1>Community Dashboard</h1>
               </div>
               <div class="nav-icon">
                  <div class="nav-drop">
                     <ul>
                        <li><a href="https://communitydashboard.vegas/economicoverview">City of Las Vegas Economic Overview</a></li>
                        <li><a href="https://communitydashboard.vegas/economic">Economic Update</a></li>
                        <li><a href="https://communitydashboard.vegas/workforce">Workforce Summary</a></li>
                        <li><a href="https://communitydashboard.vegas/urban">Redevelopment Agency Data Portal</a></li>
                        <li><a href="https://communitydashboard.vegas/business">Business Overview</a></li>
                        <li><a href="https://communitydashboard.vegas/neighborhood">Neighborhood Demographics</a></li>
                        <li><a href="https://communitydashboard.vegas/jurisdictional">Jurisdictional Comparison</a></li>
                        <li><a href="https://communitydashboard.vegas/foreclosure">Foreclosure Analysis</a></li>
                        <li><a href="https://communitydashboard.vegas/schooltracker">School Tracker</a></li>
                        <li><a href="https://communitydashboard.vegas/clv-medical">LV Medical District Employment Concentration</a></li>
                     </ul>
                  </div>
               </div>
            </div>
            <div class="clr"></div>
         </div>
      </header>
      <!-- Header End -->
      <!-- Center Start -->
      <div class="bg-ptrn">
         <div class="wrapper-full py-3">
            <div class="wrapper">
            <div class="rs_las_chart">
               <h1>City of Las Vegas <strong>Recovery Dashboard</strong></h1>
               <div class="rs_chart_content" style="display: none;">
                   <h2>Las Vegas MSA Employment Growth</h2>
                  <span class="bg-yellow" id="transform" data-rel="0">View Growth</span>
                  <p class="rs_monthly_data">
                     <span id="charttype">Monthly Totals</span> | <span id="start_date">January 1990</span> – <span id="latest_date">August 2020</span>
                  </p>
                  <div class="chart_sidebar_sec">
                  <div class="left_bar_sec">
                   <div class="chart-bottom transform_0" style="display: block;">
                  <ul class="list-square">
                     <li class="drop-down"><strong>View</strong>
                        <select class="ml-4">
                           <option value="">Select a View</option>
                           <option value="peak_to_trough">Peak to Trough</option>
                           <option value="peak_to_current">Peak to Current</option>
                           <option value="trough_to_current">Trough to Current</option>
                        </select>
                     </li>
                     <li><strong>Legend</strong></li>
                     <!-- <li><span class="lightwhite-color">&nbsp</span><span id="indicator_legend" title="Monthly Employment">Monthly Employment</span></li> -->
                     <li><span class="yellow-color">&nbsp</span>Current Period</li>
                     <li><span class="blue-color">&nbsp</span>Cycle Peak</li>
                     <li><span class="red-color">&nbsp</span>Cycle Trough</li>
                     <li><span class="grey-color">&nbsp</span>National Recession</li>
                  </ul>
               </div>
               <div class="chart-bottom transform_1" style="display: none;">
                  <ul class="list-square">
                     <li><strong>Legend</strong></li>
                     <li><span class="blue-color">&nbsp</span>Expansion</li>
                     <li><span class="red-color">&nbsp</span>Contraction</li>
                     <li><span class="grey-color">&nbsp</span>National Recession</li>
                  </ul>
               </div>
            </div>
                  <div class="rs_white_bg">
                     <span class="close_btn"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                 
                  <div class="chart_area_div">
                     <ul class="show_labels" style="display:none; text-align:center; margin-left:50px; margin-bottom:0px;">
                        <li style="font-size:16px; font-weight:bold; margin-left:50px; list-style:none;" id="first"></li>
                        <li style="font-size:16px; font-weight:bold; margin-left:30px;" id="second"></li>
                        <li style="font-size:16px; font-weight:bold; margin-left:30px;" id="difference"></li>
                     </ul>
                     <div id="chart-sec" class="chart-sec" style="height: 350px; width: 100%;max-width: 870px;min-width: 870px;">
                        <!-- <img src="<?php // echo base_url()  ?>assets/images/gra_ph.png"> -->
                     </div>
                  </div>
               </div>
            </div>
              
               <div class="data_card">
                  <div class="data_list">
                     <ul>
                        <li>
                           <div class="currnet_value">
                              <h3>Current Value</h3>
                              <h1 class="rs_yellow" id="current_value">908,500</h1>
                              <p class="ls-font" id="current_date">Aug-20</p>

                              <h1 class="rs_second_data rs_yellow" id="percent_peak">87.8%</h1>
                              <p class="ls-font">% of Peak</p>
                           </div>
                        </li>

                        <li>
                           <div class="rs_grey_box">
                              <h3>Great<br>Expansion</h3>
                              <p>Peak</p>
                              <h1 id="peak_value">1.05M</h1>
                              <p class="ls-font" id="peak_date">Feb-20</p>
                           </div>
                        </li>
                        <li>
                           <div class="rs_red_box">
                              <h3>Covid-19<br>Contraction</h3>
                              <p>Trough</p>
                              <h1 id="trough_value">792,600</h1>
                              <p class="ls-font" id="trough_date">Apr-20</p>
                           </div>
                        </li>

                        <li class="last-li-sec">
                           <div class="rs_light_box">
                              <h3>Recovery</h3>
                              <div class="flex_area_sec">
                              <div class="rs_peak_data">
                                 <p>Change from Peak</p>
                                 <h1 class="rs_yellow" id="change_peak">-126,000</h1>
                                 <p class="ls-font"><span id="change_percent_peak">12.2%</span> from peak</p>
                              </div>
                              <div class="rs_peak_data">
                                 <p>Change from Trough</p>
                                 <h1 class="rs_yellow" id="change_trough">115,900</h1>
                                 <p class="ls-font"><span id="change_percent_trough">14.6%</span> from trough</p>
                              </div>
                              </div>
                           </div>
                        </li>

                     </ul>
                  </div>
               </div>

               </div>
                  <div class="wrapper">     
                     <div class="table-sec" id="table-sec">
                        <table cellpadding="0" cellspacing="0" border="0" class="table-responsive" id="recoverydatatable">
                           <thead>
                           <tr style="padding: 10px;">
                              <th colspan="1" style="background-color:transparent;">&nbsp</th> 
                              <th colspan="1" style="min-width: 180px;background-color:transparent;">&nbsp</th>  
                              <th colspan="2" style="border-right:2px solid #fff;border-bottom:2px solid #fff;text-align: center;">Great<br> Expansion<sup>4</sup></th>
                              <th colspan="2" style="border-right:2px solid #fff;border-bottom:2px solid #fff;text-align: center;">Covid-19<br> Contraction<sup>5</sup></th>
                              <th colspan="7" style="border-bottom:2px solid #fff;text-align: center;">Recovery</th>
                           </tr>
                              <tr>
                              <th>&nbsp</th>
                                 <th class="tex-left">Economic Metric</th>
                                 <th>Peak<br>Date</th>
                                 <th>Peak<br> Value</th>
                                 <th>Trough<br> Date</th>
                                 <th>Trough<br> Value</th>
                                 <th>Current<br> Period</th>
                                 <th>Current<br> Value</th>
                                 <th>% Of<br> Peak</th>
                                 <th>Change<br> From<br> Peak</th>
                                 <th>% Of<br> Peak</th>
                                 <th>Change<br> From<br> Trough</th>
                                 <th>% Of<br> Trough</th>
                              </tr>
                           </thead>
                           <tbody id="dashboard">

                           </tbody>
                        </table>                        
                     </div>

                     <div class="rs_note">
                        <p><b>Notes:</b> <sup>1</sup>Monthly data. <sup>2</sup>Trailing 12-months data. <sup>3</sup>Weekly data. <sup>4</sup>Reflects the highest recorded value during the expansion period. <sup>5</sup>Reflects the lowest recorded period during the contraction. <sup>6</sup>Reflects the current value and where the metric is versus both the peak and the trough.</p>
                     </div>
                  </div>
                </div>
           </div>
            </div>
         </div>
      <footer class="rs_footer">
         <div class="wrapper-full py-3">
            <div class="navi">
               <h3><span>City of Las Vegas</span><br>Community Dashboard</h3>
               <ul>
                  <li><a href="https://communitydashboard.vegas/economicoverview">City of Las Vegas Economic Overview</a></li>
                  <li><a href="https://communitydashboard.vegas/neighborhood">Neighborhood Demographics</a></li>
                  <li><a href="https://communitydashboard.vegas/economic">Economic Update</a></li>
                  <li><a href="https://communitydashboard.vegas/jurisdictional">Local & Regional Comparisons</a></li>
                  <li><a href="https://communitydashboard.vegas/workforce">Workforce Summary</a></li>
                  <li><a href="https://communitydashboard.vegas/foreclosure">Residential Foreclosure Analysis</a></li>
                  <li><a href="https://communitydashboard.vegas/urban">Redevelopment Agency Data Portal</a></li>
                  <li><a href="https://communitydashboard.vegas/schooltracker">School Performance Tracker</a></li>
                  <li><a href="https://communitydashboard.vegas/business">Business Overview</a></li>
                  <li><a href="https://communitydashboard.vegas/clv-medical">Las Vegas Medical District Employment Concentration</a></li>
               </ul>
            </div>
            <div class="clr"></div>
            <p class="copy">&copy; <?php echo date('Y'); ?>. All Rights Reserved. Powered by <img src="<?php echo url('/'); ?>assets/images/paw.svg"> <a href="http://myresearcher.com/" target="_blank">myResearcher.com</a></p>
            <div class="clr"></div>
         </div>
      </footer>
   <script id="my-table-template" type="text/x-jquery-tmpl">
<?php 
echo <<<'HTML'
<tr id='${indicator_id}' data-rel="" data-datatype='${datatype}' data-name='${Name}' data-period='${period}' data-type='${type}' data-date='${current_date}' data-startdate='${start_date}' data-beneficial='${is_beneficial}'>
   <td id='trend_${indicator_id}' style="height:50px; width: 80px">
      <img style="height:30px; width: 60px;object-fit:cover;" class="loader_imgs" src='/assets/images/loader.gif'>
   </td>
   <td>${Name}
      {{if type == 0}} <sup>1</sup> {{/if}}
      {{if type == 1 || type == 2}} <sup>2</sup> {{/if}}
      {{if type == 3}} <sup>3</sup> {{/if}}
   </td>
   <td>${peak_date}</td>
   <td>${peak_value}</td>
   <td>${trough_date}</td>
   <td>${trough_value}</td>
   <td>${current_period}</td>
   <td>${current_value}</td>
   <td>${current_peak_per}</td>
   <td>{{if change_from_peak == ''}}<span>At Peak</span>{{else}}${change_from_peak}{{/if}}</td>
   <td>${change_from_peak_per}</td>
   <td>{{if change_from_trough == ''}}<span>At trough</span>{{else}}${change_from_trough}{{/if}}</td>
   <td>${change_from_trough_per}</td>
</tr>
HTML;
?>
</script> 
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="/assets/js/amcharts.js"></script>
      <script src="/assets/js/serial.js"></script> 
      <script src="/assets/js/jquery.tmpl.min.js"></script>
      <script src="/assets/js/portal.js?<?php echo time(); ?>"></script>
   </body>
</html>