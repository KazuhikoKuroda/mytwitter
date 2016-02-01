'use strict';

function TweetController($route, $uibModal, twitterService) {
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
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'views/modal.html',
					controller: 'ModalCtrl',
					controllerAs: 'modal',
					size: 'lg',
					resolve: {
						items: function() {
							return result;
						}
					}
				});
				modalInstance.result.then(function(result) {
					// ok
					console.log(result);
					$route.reload();
				}, function() {
					// dismiss
				});

			}, function(err) {
				alert('Twitter投稿に失敗しました。');
			});
	};


}

angular.module('mytwitterApp')
	.controller('TweetCtrl', TweetController);

