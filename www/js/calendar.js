(function($, window, document){
$(function(){
    var today = new Date();
	today = today.setHours(0,0,0,0);
	console.log("Today: " + today);
    var day = dateDiff(today);
    console.log(day);
    
    showDate(day);
    
    function showDate(day){
        var numDays = 12;
        if(day < 0){
            $('#packingList').show();
        }else if(day >= numDays){
            $('#thankMsg').show();
        }else{
            $('#day' + day).show();
        }
    }
    
    
    $('.showCalendar').click(function(){
        $('.day').hide();
        $('.calendar').show();
    });
    

  $('input').change(function(){
      var datePicked = $('input').val();
        console.log(datePicked);
        day = dateDiff(new Date(datePicked));
        console.log(day);
        showDate(day);
        $('.calendar').hide();
  });

    $( ".day" ).on( "swipeleft", function(){
        $('.day').hide();
        day++;
        console.log(day);
        showDate(day);
    } );
    
    $(".day").on("swiperight", function(){
        $('.day').hide();
        day--;
        console.log(day);
        showDate(day);
    });
    
    //Calculates the difference of two days to tell us which day we are on.
    function dateDiff(date){
        var oneDay = 24*60*60*1000*-1;
        var startDate = new Date("2016-04-19");
        var day =  Math.floor((startDate.getTime() - date)/(oneDay));
        return day;
    }
	
});
}(window.jQuery, window, document));

