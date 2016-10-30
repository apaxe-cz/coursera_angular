(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['UserService','$scope'];
function SignupController(UserService,$scope) {
  var signupCtrl = this;
  signupCtrl.userInfo = {};
  signupCtrl.userSaved = false;
  signupCtrl.existingDish = false;

  // signupCtrl.submitForm = function(){
  //   UserService.getFavoriteDish(signupCtrl.userInfo.favoriteDish.short_name)
  //   .then(function(response){
  //       signupCtrl.userInfo.favoriteDish = response.data;
  //       signupCtrl.existingDish=true;
  //       UserService.userInfo = signupCtrl.userInfo;
  //       signupCtrl.userSaved = true;
  //   })
  //   .catch(function(error){
  //     signupCtrl.existingDish=false;
  //   });
  // }

  signupCtrl.submitForm = function(){
    UserService.userInfo = signupCtrl.userInfo;
    signupCtrl.userSaved = true;
  }

  $scope.$watch('signupCtrl.userInfo.favoriteDish.short_name',function(newValue,oldValue){
    if(newValue != oldValue)
      signupCtrl.setFavoriteDish(newValue);
  });

  signupCtrl.setFavoriteDish = function(short_name){
    UserService.getFavoriteDish(short_name)
    .then(function(response){
        signupCtrl.userInfo.favoriteDish = response.data;
        signupCtrl.existingDish=true;
    })
    .catch(function(error){
      signupCtrl.existingDish=false;
    });
  }

}
})();
