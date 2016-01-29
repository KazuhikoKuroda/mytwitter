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
					templateUrl: 'myModalContent.html',
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

angular.module('mytwitterApp')
	.controller('ModalCtrl', function($scope, $uibModalInstance, items) {
		var vm = this;

		vm.items = items;
		if (vm.items.created_at) {
			vm.items.created_date = Date.parse(vm.items.created_at);
		}

		$scope.ok = function() {
			$uibModalInstance.close('OK!!!');
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	});
