// JavaScript Document

(function($, window, document) {
    $(function() {
		var baseURL = "http://m.capripictureframe.com/api/logs";
		var formatDate;
		var logId;
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
			if(logs.length === 0){
				$('.date').html("No Logs Found for " + formatDate);
			}else{
				logs.forEach(function(text){
					var date = new Date(text.log_date);
					var div = '<div class="logBx"><div class="heading"><h4>' + date.toDateString() + ' ' + formatAMPM(date) + '</h4><span class="floatRight"><a href="#" class="editLog" id="' + text.log_id + '"><i class="fa fa-edit fa-larger"></i></a><a href="#" class="deleteLog" id="' + text.log_id + '"><i class="fa fa-trash-o fa-larger"></i></a></span></div><p id="showingLog' + text.log_id + '">' + text.log_text + '</p><div class="editBx" id="editingLog' + text.log_id + '"><textarea id="textarea' + text.log_id + '">' + text.log_text + '</textarea><input type="hidden" id="date' + text.log_id + '" value="' + text.log_date + '"><input type="button" id="submitEdit" value="Save Changes"></div></div>';
					$('#logs').append(div);
				});
			}
		}
		
		//Editing and Deleteing
		$('#logs').on('click', '.editLog', function(){
			console.log(this.id);
			logId = this.id;
			$('#editingLog' + this.id).show();
			$('#showingLog' + this.id).hide();
			
		});
		
		$('#logs').on('click', '#submitEdit', function(){
			console.log("Saving: " + logId);
			var newVal = $('#textarea' + logId).val();
			var json = JSON.stringify({
				"log_id":logId,
				"resident_id": 35,
				"log_text": newVal,
				"log_date": $('#date' + logId).val()
			});
			
			console.log(json);
			$.ajax({
				type: 'PUT',
				contentType:"application/json",
				url: baseURL + '/' + logId,
				dataType: 'html',
				data: json,
				success: function(){
					console.log("Success");
					$('#showingLog' + logId).html(newVal);
					$('#editingLog' + logId).hide();
					$('#showingLog' + logId).show();
				},
				error: function(jqXHR, textStatus, error){
					console.log(jqXHR);
					console.log(error);
				}
			});
		});
		
		$('#logs').on('click', '.deleteLog', function(){
			console.log(this.id);
			logId = this.id;
			$('#popupDialog').popup("open");
		});
		
		$('body').on('click', '#delete', function(){
			deleteLog();
			$('#popupDialog').popup("close");
		});
	
		function deleteLog(){
			console.log("Delete: " + logId);
			$.ajax({
				type: 'DELETE',
				url: baseURL + '/' + logId,
				success: function(data){
					console.log(data);
					logId = undefined;
					getLogs();
				},
				error: function(jqXHR, textStatus, error){
					console.log(jqXHR);
					console.log(error);
					alert("Could not connect to server.");
				}
			});
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

		  $('#dateChange').change(function(){
			  var datePicked = $('#dateChange').val();
				$.ajax({
					type: 'GET',
					url: baseURL + "?residentId=35&date=" + datePicked,
					success: function(data){
						$('#logs').show();
						$('.date').html("Logs for " + datePicked);
						 formatDate = datePicked;
						 datePicked = undefined;
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