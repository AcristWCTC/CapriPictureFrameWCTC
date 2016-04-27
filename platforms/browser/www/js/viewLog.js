// JavaScript Document

(function($, window, document) {
    $(function() {
		var baseURL = "http://m.capripictureframe.com/api/logs";
		getLogs();
		
		function getLogs(){
			$.ajax({
				type: 'GET',
				url: baseURL + "?residentId=" + localStorage.getItem("cpfResident"),
			success: function(data){
				console.log(data);
			},
			error: function(jqXHR, textStatus, error){
				console.log(jqXHR);
				console.log(error);
			}
			});
		}
		
	});
}(window.jQuery, window, document));