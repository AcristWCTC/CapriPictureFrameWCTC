// JavaScript Document

(function($, window, document) {
    $(function() {
		var baseURL = "http://m.capripictureframe.com/api/logs";
		var formatDate;
		getLogs();
		
		function getLogs(){
			$.ajax({
				type: 'GET',
				url: baseURL + "?residentId=35",
			success: function(data){
				displayLogs(data);
			},
			error: function(jqXHR, textStatus, error){
				console.log(jqXHR);
				console.log(error);
			}
			});
		}
		
		function displayLogs(logs){
			$('#logs div').remove();
			if(logs.length == 0){
				$('.date').html("No Logs Found for " + formatDate);
			}else{
				logs.forEach(function(text){
					var date = new Date(text.log_date);
					var div = '<div class="logBx"><h4 style="text-align:center">' + date.toDateString() + ' ' + formatAMPM(date) + '</h4><p>' + text.log_text + '</p></div>';
					$('#logs').append(div);
				});
			}
		}
		
		//Calendar
		 $('.showCalendar').click(function(){
			 $('#logs').hide();
			 $('.title').hide();
        	$('.calendar').show();
   		 });
    
		$('#showAll').click(function(){
			$('#logs').show();
			$('.title').show();
			$('.date').html("Logs");
			$('.calendar').hide();
			getLogs();
		});

		  $('input').change(function(){
			  var datePicked = $('input').val();
				$.ajax({
					type: 'GET',
					url: baseURL + "?residentId=35&date=" + datePicked,
					success: function(data){
						$('#logs').show();
						$('.date').html("Logs for " + datePicked);
						 formatDate = datePicked;
			 			$('.title').show();
						displayLogs(data);
					},
					error: function(jqXHR, textStatus, error){
						console.log(jqXHR);
						console.log(error);
					}
				});
				$('.calendar').hide();
		  });
  
		//Utils
		function formatAMPM(date) {
		  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'pm' : 'am';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  return strTime;
		}
	});
}(window.jQuery, window, document));