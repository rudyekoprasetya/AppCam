// Initialize your app
var myApp = new Framework7({
   swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
    // untuk dinamis navbar
    dynamicNavbar: true
});

mainView.router.refreshPage();

// memanggil halaman lain
myApp.onPageInit('index', function (page) {
	$$('#ambilpic').on('click',function(){
		//myApp.alert('fungsi jalan');
		navigator.camera.getPicture(onSuccess, onFail, { quality: 75,
	    destinationType: Camera.DestinationType.FILE_URI, correctOrientation: true });

		function onSuccess(imageURI) {
		    var image = document.getElementById('myImage');
		    image.src = imageURI;
		}

		function onFail(message) {
		    alert('Failed because: ' + message);
		}
	});
		
});

// memanggil halaman lain
myApp.onPageInit('gps', function (page) {
   
    //gps
   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
	
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
   	$$('#long').val(position.coords.longitude);
   	$$('#lat').val(position.coords.latitude);
      //maps   
   var lokasi = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

   var mapOptions = {
       center: lokasi,
       zoom: 16,
       gestureHandling: 'cooperative', //untuk gesture mobile
       disableDefaultUI: true, //disable control
       mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

   // var img="img/logo.png";
   var marker = new google.maps.Marker ( { //menambahkan marker
      position:lokasi,
      map:map,
      animation: google.maps.Animation.BOUNCE, //animasi
      // icon: img,
      title:"Aku bocah Kediri"
   });

   google.maps.event.addDomListener(marker, 'click', function() { //event
      myApp.alert('Marker was clicked!');
   });


   //    myApp.alert('Latitude: '          + position.coords.latitude          + '\n' +
   //       'Longitude: '         + position.coords.longitude         + '\n' +
   //       'Altitude: '          + position.coords.altitude          + '\n' +
   //       'Accuracy: '          + position.coords.accuracy          + '\n' +
   //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
   //       'Heading: '           + position.coords.heading           + '\n' +
   //       'Speed: '             + position.coords.speed             + '\n' +
   //       'Timestamp: '         + position.timestamp                + '\n');

   };


   function onError(error) {
      myApp.alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }  
});

// memanggil halaman lain
myApp.onPageInit('scan', function (page) {   
   //panggil plugin Scan 
   $$('#scan_qr').on('click',function(){
      cordova.plugins.barcodeScanner.scan( //scan qr code
         function (result) {
             myApp.alert("A barcode has been scanned \n" +
                   "Result: " + result.text + "\n" +
                   "Format: " + result.format + "\n" +
                   "Cancelled: " + result.cancelled);
         }, 
         function (error) {
             alert("Scanning failed: " + error);
         }
      );
   });

   //generate QR

   $$('#buat_qr').on('click', function(){
      var isi=$$('#text_qr').val();
      myApp.showPreloader();
      setTimeout(function () {
         myApp.hidePreloader(); 
         var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: isi,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
         });
      },500);
   });
});