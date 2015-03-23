//console.log('/public/javascripts/controllers/main.js');

// at this point I'm just using this bit to change page title...

var mapApp = angular.module('mappyBird', ['ngRoute', 'ngAnimate']);

mapApp.run(function ($location, $rootScope, $templateCache) {

	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		// not sure what's going on here, so...
		//$rootScope.title = current.$$route.title;
		$rootScope.title = current.title;
	});

	// removing this until I know why I'd need it
	/*
	$rootScope.$on('$viewContentLoaded', function() {
		$templateCache.removeAll();
	});
	*/
});