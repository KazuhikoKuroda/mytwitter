'use strict';

function ModalController($uibModalInstance, items) {
	var vm = this;

	vm.items = items;
	if (vm.items.created_at) {
		vm.items.created_date = Date.parse(vm.items.created_at);
	}

	vm.ok = function() {
		$uibModalInstance.close('OK!!!');
	};
}

angular.module('mytwitterApp')
	.controller('ModalCtrl', ModalController);