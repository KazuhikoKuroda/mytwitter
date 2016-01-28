'use strict';

/**
 * @ngdoc overview
 * @name mytwitterApp
 * @description
 * # mytwitterApp
 *
 * Main module of the application.
 */
angular
	.module('mytwitterApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'mytwitterApp.services'
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'about'
			})
			.when('/profile', {
				templateUrl: 'views/profile.html',
				controller: 'ProfileCtrl',
				controllerAs: 'profile'
			})
.when('/tweet', {
  templateUrl: 'views/tweet.html',
  controller: 'TweetCtrl',
  controllerAs: 'tweet'
})
			.otherwise({
				redirectTo: '/'
			});
	})
	.filter('replace', function() {
		return function(input, pattern, replacement) {
			if ((typeof input) === 'string'){
				return input.replace(pattern, replacement, 'g');
			} else {
				return input;
			}
		};
	});