'use strict';

function TweetController($route, twitterService) {
	var vm = this;
	vm.inputText = '';
	vm.showTweet = false;

	twitterService.initialize();
	if (twitterService.isReady()) {
		vm.showTweet = true;
	}

	vm.submit = function() {
		twitterService.postTweet(vm.inputText)
			.then(function(result) {
				$route.reload();
			}, function(err) {
				alert('Twitter投稿に失敗しました。');
			});
	};
}

angular.module('mytwitterApp')
	.controller('TweetCtrl', TweetController);