(function(){
	'use strict';
	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController',AlreadyBoughtController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService);


	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController (ShoppingListCheckOffService) {
		var toBuyCtrl = this;
		toBuyCtrl.getItems = function(){
			return ShoppingListCheckOffService.toBuy;
		}
		toBuyCtrl.setItemBought = function(itemIndex){
			ShoppingListCheckOffService.setItemBought(itemIndex);
		}
	};

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var boughtCtrl = this;
		boughtCtrl.getItems = function(){
			return ShoppingListCheckOffService.bought;
		}
	};

	function ShoppingListCheckOffService(){
		var checkOffService = this;
		checkOffService.toBuy = [
			{ name: "cookies", quantity: 2 },
			{ name: "chips", quantity: 4 },
			{ name: "milk", quantity: 2 },
			{ name: "chocolate", quantity: 3 },
			{ name: "candy", quantity: 1 }
		];
		checkOffService.bought = [];

		checkOffService.setItemBought = function(itemIndex){
			checkOffService.bought = checkOffService.bought.concat(checkOffService.toBuy.splice(itemIndex,1));
		}

	}

})();
