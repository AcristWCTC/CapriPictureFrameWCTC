$(function() {
	$( "#undo1" ).hide('fast');
	$( "#undo2" ).hide('fast');
	$( "#undo3" ).hide('fast');
	$( "#undo4" ).hide('fast');
	$( "#undo5" ).hide('fast');
	$( "#undo6" ).hide('fast');
});

$("#hide1Picture").click(function(e){
	$( "#undo1" ).show('fast');
	$( "#picture1" ).hide('fast');
	$( "#hide1Picture" ).hide('fast');
});

$("#undo1").click(function(e){
	$( "#undo1" ).hide('fast');
	$( "#picture1" ).show('fast');
	$( "#hide1Picture" ).show('fast');
});

$("#hide2Picture").click(function(e){
	$( "#undo2" ).show('fast');
	$( "#picture2" ).hide('fast');
	$( "#hide2Picture" ).hide('fast');
});

$("#undo2").click(function(e){
	$( "#undo2" ).hide('fast');
	$( "#picture2" ).show('fast');
	$( "#hide2Picture" ).show('fast');
});

$("#hide3Picture").click(function(e){
	$( "#undo3" ).show('fast');
	$( "#picture3" ).hide('fast');
	$( "#hide3Picture" ).hide('fast');
});

$("#undo3").click(function(e){
	$( "#undo3" ).hide('fast');
	$( "#picture3" ).show('fast');
	$( "#hide3Picture" ).show('fast');
});

$("#hide4Picture").click(function(e){
	$( "#undo4" ).show('fast');
	$( "#picture4" ).hide('fast');
	$( "#hide4Picture" ).hide('fast');
});

$("#undo4").click(function(e){
	$( "#undo4" ).hide('fast');
	$( "#picture4" ).show('fast');
	$( "#hide4Picture" ).show('fast');
});

$("#hide5Picture").click(function(e){
	$( "#undo5" ).show('fast');
	$( "#picture5" ).hide('fast');
	$( "#hide5Picture" ).hide('fast');
});

$("#undo5").click(function(e){
	$( "#undo5" ).hide('fast');
	$( "#picture5" ).show('fast');
	$( "#hide5Picture" ).show('fast');
});

$("#hide6Picture").click(function(e){
	$( "#undo6" ).show('fast');
	$( "#picture6" ).hide('fast');
	$( "#hide6Picture" ).hide('fast');
});

$("#undo6").click(function(e){
	$( "#undo6" ).hide('fast');
	$( "#picture6" ).show('fast');
	$( "#hide6Picture" ).show('fast');
});