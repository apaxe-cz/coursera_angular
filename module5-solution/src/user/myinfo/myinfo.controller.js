(function () {
"use strict";

angular.module('user')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['userInfo','ApiPath'];
function MyinfoController(userInfo, ApiPath) {
  var $myinfoCtrl = this;
  $myinfoCtrl.basePath = ApiPath;
  $myinfoCtrl.userInfo = userInfo;
}

})();
