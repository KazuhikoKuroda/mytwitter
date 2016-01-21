'use strict';

function MainController($scope, $q, twitterService) {
	$scope.tweets = [];

	twitterService.initialize();

	$scope.refresh = function() {
		twitterService.getLatestTweets().then(function(result) {
			$scope.tweets = $scope.tweets.concat(result);
		}, function() {
			// error
		});
	};

	$scope.connect = function() {
		twitterService.connectTwitter().then(function() {
			if (twitterService.isReady()) {
				$scope.refresh();
			} else {
				console.log('unable to connect twitter');
			}
		});
	};

	$scope.signOut = function() {
		twitterService.clearCache();
		$scope.tweets = [];
	};

	if (twitterService.isReady()) {
//		$scope.refresh();
	}
}

angular.module('mytwitterApp')
	.controller('MainCtrl', MainController);
