// /public/javascripts/controllers/output.js

mapApp.controller('outputController', function ($scope, $location, $window){


	var map;
	var geocoder;
	var bounds = new google.maps.LatLngBounds();
	var markersArray = [];

	// hard-coding locations for the demp
	var origin1 = new google.maps.LatLng(47.614478, -122.349847); // Prizmiq office
	//var origin2 = 'Greenwich, England';
	var destinationA = new google.maps.LatLng(47.544207,-122.375851);
	var destinationB = new google.maps.LatLng(47.5022628, -122.3373059);
	var destinationC = new google.maps.LatLng(47.5221435, -122.3591188);
	var destinationD = new google.maps.LatLng(47.581426,-122.388815);

	var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';
	var destinationIcon = [
		'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=A|FF0000|000000',
		'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=B|FF0000|000000',
		'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=C|FF0000|000000',
		'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000'
	];


	var destinationIconA = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=A|FF0000|000000';
	var destinationIconB = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=B|FF0000|000000';
	var destinationIconC = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=C|FF0000|000000';
	var destinationIconD = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';		


	function initialize() {
	  var opts = {
	    center: new google.maps.LatLng(47.614848, -122.3359059), // seattle
	    zoom: 10
	  };
	  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
	  geocoder = new google.maps.Geocoder();
	}

	$scope.calculateDistances = function() {
	  var service = new google.maps.DistanceMatrixService();
	  service.getDistanceMatrix(
	    {
	      origins: [origin1],
	      destinations: [destinationA, destinationB, destinationC, destinationD],
	      travelMode: google.maps.TravelMode.DRIVING,
	      unitSystem: google.maps.UnitSystem.IMPERIAL,
	      avoidHighways: false,
	      avoidTolls: false
	    }, callback);
	}

	function callback(response, status) {

		var letters = ['A', 'B', 'C', 'D'];

	  if (status != google.maps.DistanceMatrixStatus.OK) {
	    alert('Error was: ' + status);
	  } else {
	    var origins = response.originAddresses;
	    var destinations = response.destinationAddresses;
	    var outputDiv = document.getElementById('outputDiv');
	    outputDiv.innerHTML = '';
	    deleteOverlays();

	    for (var i = 0; i < origins.length; i++) {
	      var results = response.rows[i].elements;
	      addMarker(origins[i], false, i);

		outputDiv.innerHTML += 
			'Work address: ' + origins[i] + '<br>';

	      for (var j = 0; j < results.length; j++) {

	        addMarker(destinations[j], true, j);
	        outputDiv.innerHTML += 
	        	letters[j] + ': ' + results[j].distance.text + ' to ' + destinations[j] + ', ' + results[j].duration.text + ' by car.<br>';
/*
	        origins[i] + ' to ' + destinations[j]
	            + ': ' + results[j].distance.text + ' in '
	            + results[j].duration.text + '<br>';
*/
	      }
	    }
	  }
	}

	function addMarker(location, isDestination, count) {
	  var icon;
	  if (isDestination) {
	    icon = destinationIcon[count];
	  } else {
	    icon = originIcon;
	  }
	  geocoder.geocode({'address': location}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      bounds.extend(results[0].geometry.location);
	      map.fitBounds(bounds);
	      var marker = new google.maps.Marker({
	        map: map,
	        position: results[0].geometry.location,
	        icon: icon
	      });
	      markersArray.push(marker);
	    } else {
	      alert('Geocode was not successful for the following reason: '
	        + status);
	    }
	  });
	}

	function deleteOverlays() {
	  for (var i = 0; i < markersArray.length; i++) {
	    markersArray[i].setMap(null);
	  }
	  markersArray = [];
	}
	

	initialize();


});