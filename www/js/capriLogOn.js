$(document).on('pageinit', '#login', function(){ 
	if(localStorage.getItem('cpfname') && localStorage.getItem('cpfcode')){	
		$.mobile.changePage("home.html");
	}
	
    $(document).on('click', '#submit', function() { // catch the form's submit event
        if($('#username').val().length > 0 && $('#password').val().length > 0){
			var username = $('#username').val();
			var password = $('#password').val();
            // Send data to server through the Ajax call
			var data = JSON.stringify({
				"username":username,
				"password":password
			});
            // action is functionality we want to call and outputJSON is our data
                $.ajax({url: 'http://m.capripictureframe.com/api/login',
                    data: data,
                    type: 'post',  
                    dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.loading('show', {theme:"a", text:"Please wait...", textonly:true, textVisible: true}); // This will show ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete
                        $.mobile.loading('hide'); // This will hide ajax spinner
                    },
                    success: function (result, textStatus, jqXHR) {
						console.log(jqXHR.status);
                        if(jqXHR.status === 200 || jqXHR.status === 201) {
                            $.mobile.changePage("home.html"); 
							localStorage.cpfname = username;
							localStorage.cpfcode = password;                       
                        } else {
                            alert('Logon unsuccessful!');
                        }
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action               
                        alert('Logon unsuccessful!');
                    }
                });                  
        } else {
            alert('Please fill all necessary fields!');
        }          
        return false; // cancel original event to prevent form submitting
    });   
});
 
$(document).on('pagebeforeshow', '#second', function(){ 
    $.mobile.activePage.find('.ui-content').html('Welcome ' + user.name);
});
 
var user = {
    name : null
};