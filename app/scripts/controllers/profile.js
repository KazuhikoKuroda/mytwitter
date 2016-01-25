'use strict';


function ProfileControl($scope, twitterService) {
	$scope.profile = {};
	$scope.tweets = [];
	$scope.showProfile = false;

	twitterService.initialize();

	$scope.showMe = function() {
		twitterService.getMe()
			.then(function(result) {
				$scope.profile = result;
				$scope.showProfile = true;
			}, function() {
				// error
			});
	};

	$scope.getMyTweet = function() {
		twitterService.getUserTimeline()
			.then(function(result) {
				$scope.tweets = $scope.tweets.concat(result);
			}, function() {
				// error
			});
	};

	if (twitterService.isReady()) {
		$scope.showMe();
		$scope.getMyTweet();
	}
}

angular.module('mytwitterApp')
  .controller('ProfileCtrl', ProfileControl);
