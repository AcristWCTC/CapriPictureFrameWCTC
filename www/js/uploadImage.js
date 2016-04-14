    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }


    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {

        // Show the selected image
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
        smallImage.src = imageURI;
    }


    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    function uploadPhoto() {

        //selected photo URI is in the src attribute (we set this on getPhoto)
        var imageURI = document.getElementById('smallImage').getAttribute("src");
        if (!imageURI) {
            alert('Please select an image first.');
            return;
        }

        //set upload options
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        options.params = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            workplace: document.getElementById("date").value
        };

        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI("http://some.server.com/upload.php"), win, fail, options);
    }

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
        console.log("upload error target " + error.target);
    }
    
    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
