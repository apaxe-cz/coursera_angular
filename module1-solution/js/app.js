(function(){
	'use strict';
	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController ($scope) {
		$scope.lunchInput = "";
		$scope.message = "";
		$scope.checkLunchInput = function(){
			if($scope.lunchInput.length == 0){
				$scope.message = "Please enter data first";
			}else{
				var dishes = $scope.lunchInput.split(",").filter(function(item){
					return item.replace(/\s/g,'').length > 0;
				});
				if(dishes.length <= 3){
					$scope.message = "Enjoy!";
				} else {
					$scope.message = "Too much!";
				}
			}
		}
	};
})();
