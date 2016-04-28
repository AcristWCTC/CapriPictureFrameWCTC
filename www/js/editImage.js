(function($, window, document) {
    $(function() {
	var baseURL = "http://m.capripictureframe.com/api/";

	console.log("Picture");
	getRoom();

//Edit/Delete Picture Code
	var photos;
	var room;
	var photoId;
	function getPhotosFromServer(){
		$.ajax({
			type: 'GET',
			url: baseURL + "photos?residentId=" + localStorage.getItem("cpfResident"),
			success: function(data){
				console.log(data);
				photos = data;
				displayPictures();
			},
			error: function(jqXHR, textStatus, error){
				console.log(jqXHR);
				console.log(error);
			}
		});
	}
	
	function getRoom(){
		$.ajax({
			type: 'GET',
			url: baseURL + "residents/" + localStorage.getItem("cpfResident"),
			success: function(data){
				console.log(data);
				room = data.room;
				getPhotosFromServer();
			},
			error: function(jqXHR, textStatus, error){
				console.log(jqXHR);
				console.log(error);
			}
		});
	}
	
	function displayPictures(){
		$('#photos div').remove();
		photos.forEach(function(photo){
			var div = '<div class="imageBox" id="' + photo.photo_id + '"><img src="http://capripictureframe.com/images/capri/' + room.building.directory_name + '/' + room.room_number + '/' + photo.image_name + '"></div>';
			$('#photos').append(div);
		});
		console.log("display..");
	}
	
	$('#photos').on('click', '.imageBox', function(){
		console.log(this.id);
		photoId = this.id;
		$('#popupDialog').popup("open");	
	});
	
	$('body').on('click', '#delete', function(){
		deletePhoto();
		$('#popupDialog').popup("close");
	});
	
	function deletePhoto(){
		console.log("Delete: " + photoId);
		$.ajax({
			type: 'DELETE',
			url: baseURL + 'photos/' + photoId,
			success: function(data){
				console.log(data);
				photoId = undefined;
				getPhotosFromServer();
			},
			error: function(jqXHR, textStatus, error){
				console.log(jqXHR);
				console.log(error);
				alert("Could not connect to server.");
			}
		});
	}
	//Menu Functionality
});
}(window.jQuery, window, document));
