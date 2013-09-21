	<!-- Page & Module Specific JS -->
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>

	<script>
	var map;
	function initialize() {
	  var mapOptions = {
	    zoom: 8,
	    center: new google.maps.LatLng(33.520751, -86.802646),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);
	}
	
	google.maps.event.addDomListener(window, 'load', initialize);
    </script>
