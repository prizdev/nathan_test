// /public/javascripts/controllers/input.js

// I originally used ng-switch to move between input panes, but found that that was creating a new scope
// each time and wiping input values

mapApp.controller('inputController', function ($scope, $location){

	// set up some initial values
	var pageIndex = 0;
	var pageArray = ['pageIntro', 'pageOrigin', 'pagePrice', 'pageTime', 'pageTrans'];
	//$scope.formPage = pageArray[pageIndex];
	$scope.showBack = false;
	$scope.showForward = true;
	$scope.showSubmit = false;

	// init input panes
	pageArray.forEach(function(page){
		$scope[page] = false;
	});
	$scope[pageArray[0]] = true;

	// move page forward on click and handle button visibility until...
	$scope.moveForward = function() {

		// hide old pane
		$scope[pageArray[pageIndex]] = false;

		pageIndex++;
		
		$scope.showBack = true;

		// an array of page titles looks more verbose than it needs to be, but makes validation
		// easier and allows for more flexibility if extending the form
		if (pageArray[pageIndex] == 'pageTrans') {
			$scope.showForward = false;
			$scope.showSubmit = true;
		}

		//$scope.formPage = pageArray[pageIndex];
		$scope[pageArray[pageIndex]] = true;

		// here I started to play around with setting focus and realized it was a bit of a rabbit hole for me right now

	}

	// move page backwards on click and handle button visibility unless...
	$scope.moveBack = function() {
		
		// hide old pane
		$scope[pageArray[pageIndex]] = false;

		pageIndex--;
		
		$scope.showForward = true;
		$scope.showSubmit = false;

		// and here that sort of flexibility would actually be detrimental
		if (pageIndex == 0) {
			$scope.showBack = false;
		}

		//$scope.formPage = pageArray[pageIndex];
		$scope[pageArray[pageIndex]] = true;

	}


	// note: needed to add type='button' to ng-click buttons on input.jade to avoid this firing every click
	$scope.handleForm = function() {

		// begin validation
		//$scope.submitted = true;

		// build url for api
		// format is /api/V/:version/origin/:origin/maxprice/:price/maxtime/:time/trans/:walk:bike:bus:car/
		var apiVersion = '1'; // ideally set elsewhere =p

		var url = '/api';

		url += '/V/' + apiVersion;
		url += '/origin/' + escape($scope.origin);
		url += '/maxprice/' + $scope.price;
		url += '/maxtime/' + $scope.mtime;
		url += '/trans/';
		if ($scope.trans.walk) {
			url += '1';
		}
		else {
			url += '0';
		}
		if ($scope.trans.bike) {
			url += '1';
		}
		else {
			url += '0';
		}
		if ($scope.trans.bus) {
			url += '1';
		}
		else {
			url += '0';
		}
		if ($scope.trans.car) {
			url += '1';
		}
		else {
			url += '0';
		}				

		console.log(url);

	}



});