'use strict';

function ProfileControl($scope, twitterService) {
	$scope.profile = {};
	$scope.tweets = [];
	$scope.showProfile = false;

	twitterService.initialize();

	if (twitterService.isReady()) {
		twitterService.getMe()
			.then(function(result) {
				$scope.profile = result;
				$scope.showProfile = true;
			}, function() {
				// error
			});

		twitterService.getUserTimeline()
			.then(function(result) {
				$scope.tweets = $scope.tweets.concat(result);
			}, function() {
				// error
			});
	}
}

angular.module('mytwitterApp')
	.controller('ProfileCtrl', ProfileControl);