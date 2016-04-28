(function($, window, document) {
    $(function() {
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var baseURL = "http://m.capripictureframe.com/api/";

$(document).ready(function(){
	if($('body').attr('id') === 'editPicture'){
		console.log("Picture");
		getRoom();
	}
});
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}


// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
	pictureSource = imageURI;
	console.log(imageURI);
    // Show the selected image
    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'block';
    smallImage.src = imageURI;
}


// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source});
}

//function uploadPhoto() {
//	console.log("Uploading");
//    //selected photo URI is in the src attribute (we set this on getPhoto)
//    var imageURI = document.getElementById('smallImage').getAttribute("src");
//    if (!imageURI) {
//        alert('Please select an image first.');
//        return;
//    }
//
//    //set upload options
//    var options = new FileUploadOptions();
//    options.fileKey = "file";
//    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
//    options.mimeType = "image/jpeg";
//    options.chunkedMode = false;
//    options.headers = {
//          Connection: "close"
//        };
//
//    options.params = {
//        caption: document.getElementById("caption").value,
//        residentId: "35"
//    };
//	
//	var ft = new FileTransfer();
//    ft.upload(imageURI, encodeURI("http://m.capripictureframe.com/api/photos"), win, fail, options);
//	console.log(options + "--------------------------");
//}

$("#regform").submit(function(e){
	console.log("Hit");
	e.preventDefault();
    var fd = new FormData($(this)[0]);
	
	//fd.append("file", pictureSource);
	console.log(fd + "--------------------------");
    var data = {
			caption: $('#caption').val(),
			resident_id: "35"
		};
    fd.append("data", JSON.stringify(data));
    $.ajax({
        url: 'http://m.capripictureframe.com/api/photos',
        type: 'POST',
        contentType: false,
        data: fd,
        processData: false,
        success: function (data) {
            console.log("Success!" + data);
            //getPhotos();
        },
        error: function (data) {
            console.log(data);
        }
    });
        
});

// Called if something bad happens.
//
function onFail(message) {
    console.log('Failed because: ' + message);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    //alert("Response =" + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
	console.log("HTTP ERROR: " + error.http_status);
    console.log("upload error target " + error.target);
	console.log("Body: " + error.body);
}

//Edit/Delete Picture Code
	var photos;
	var room;
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
		//$('#photos div').remove();
		photos.forEach(function(photo){
			var div = '<div class="imageBox"><img src="http://capripictureframe.com/images/capri/' + room.building.directory_name + '/' + room.room_number + '/' + photo.image_name + '"></div>';
			console.log(div);
			$('#photos').append(div);
		});
	}
});
}(window.jQuery, window, document));
