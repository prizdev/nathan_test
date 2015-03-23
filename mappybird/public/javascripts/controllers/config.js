//console.log('/public/javascripts/controllers/config.js');

// provides angular routing


// setting title here as well, not sure if I want to do that if I'm using one controller for several views

mapApp.config(function ($routeProvider, $locationProvider) {

	$routeProvider
		.when('/input', {
			title		: 'Input',
			templateUrl : '/inputPartial',    // defined in app.js at app.use('/inputPartial', require('./routes/partials/input'));
			controller  : 'inputController'   // included in index.jade at script(src='/javascripts/controllers/input.js') and defined therein
		})
		.when('/output', {
			title		: 'Output',
			templateUrl : '/outputPartial',
			controller  : 'outputController'
		})
		.otherwise({
			title		: 'Start',
			templateUrl : '/inputPartial',
			controller  : 'inputController'
		});

	$locationProvider.html5Mode(true);

});