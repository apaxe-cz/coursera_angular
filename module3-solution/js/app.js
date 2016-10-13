(function(){
	'use strict';
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItems)
	.directive('itemsLoaderIndicator',ItemsLoaderIndicator);


	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {
		var myCtrl = this;
		myCtrl.found = [];
		myCtrl.foundStatus = true;	//not shows "Nothing found!" message on load
		myCtrl.loadingStatus = false;
		myCtrl.searchTerm = "";

		myCtrl.getMatchedMenuItems = function(){
			myCtrl.found = [];
			myCtrl.foundStatus = true;
			myCtrl.loadingStatus = true;

			if(myCtrl.searchTerm.length > 0){
				MenuSearchService.getMatchedMenuItems(myCtrl.searchTerm)
				.then(function(result){
					myCtrl.found = result;
					myCtrl.foundStatus = (myCtrl.found.length != 0);
					myCtrl.loadingStatus = false;
				});
			}else{
				myCtrl.foundStatus = false;
				myCtrl.loadingStatus = false;
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
				return result.data.menu_items.filter(function(item){
					return (item.description.toLowerCase().indexOf(searchTerm.toLowerCase())>-1);
				});
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
	    templateUrl: 'founditems.template.html'
	  }
	  return ddo;
	}

	function ItemsLoaderIndicator(){
		var ddo = {
	    scope: {
				loadingStatus: '<'
	    },
	    controller: NarrowItDownController,
	    bindToController: true,
	    controllerAs: 'myCtrl',
	    templateUrl: 'itemsloaderindicator.template.html',
			link: LoaderIndicatorLink
	  }
	  return ddo;
	}

	function LoaderIndicatorLink(scope, elem, attribs, ctrl){
		scope.$watch('myCtrl.loadingStatus',function(newVal, oldVal){
				elem.css('display',(newVal?'block':'none'));
		});
	}

})();
