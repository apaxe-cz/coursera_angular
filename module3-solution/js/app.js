(function(){
	'use strict';
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItems);


	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {
		var myCtrl = this;
		myCtrl.found = [];
		myCtrl.foundStatus = true;
		myCtrl.searchTerm = "";

		myCtrl.getMatchedMenuItems = function(){
			console.log(myCtrl.searchTerm);
			if(myCtrl.searchTerm.length > 0){
				MenuSearchService.getMatchedMenuItems(myCtrl.searchTerm)
				.then(function(result){
					myCtrl.found = result;
					myCtrl.foundStatus = myCtrl.found.length != 0;
				});
			}else{
				myCtrl.foundStatus = false;
			}
		};

		myCtrl.removeItem = function(index){
			myCtrl.found.splice(index,1);
		}
	}

	MenuSearchService.$inject=['$http'];
	function MenuSearchService($http){
		var searchService = this;
		searchService.getMatchedMenuItems = function(searchTerm){
			return $http({
				url:"https://davids-restaurant.herokuapp.com/menu_items.json"
			}).then(function (result) {
				var foundItems = result.data.menu_items.filter(function(item){
					return (item.description.toLowerCase().indexOf(searchTerm.toLowerCase())>-1);
				});
				console.log(foundItems);
		    return foundItems;
			},
			function(response){
		    // error response
				console.log(response);
		  }
		);
		}
	}

	function FoundItems(){
		var ddo = {
	    restrict: 'E',
	    scope: {
	      foundItems: '<',
				onRemove: '&'
	    },
	    controller: NarrowItDownController,
	    bindToController: true,
	    controllerAs: 'myCtrl',
	    templateUrl: 'menuItemsTemplate.html'
	  }
	  return ddo;
	}

})();
