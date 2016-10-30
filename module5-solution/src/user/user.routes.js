(function() {
'use strict';

angular.module('user')
.config(routeConfig);

routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('user', {
      absract: true,
      templateUrl: 'src/user/user.html'
    })
    .state('user.signup', {
      url: '/signup',
      templateUrl: 'src/user/signup/signup.html',
      controller: 'SignupController',
      controllerAs: 'signupCtrl'
    })
    .state('user.myinfo', {
      url: '/myinfo',
      templateUrl: 'src/user/myinfo/myinfo.html',
      controller: 'MyinfoController',
      controllerAs: 'myinfoCtrl',
      resolve: {
        userInfo: ['UserService', function (UserService) {
          return UserService.getUserInfo();
        }]
      }

    });
}
})();
