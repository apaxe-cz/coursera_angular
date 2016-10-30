(function () {
"use strict";

angular.module('user')
.service('UserService', UserService);

UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;
  service.userInfo;

  service.getUserInfo = function(){
    return service.userInfo
  }

  service.getFavoriteDish = function(short_name){
    return $http.get(ApiPath + '/menu_items/'+short_name+'.json');
  }
}

})();
