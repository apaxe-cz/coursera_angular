(function () {
'use strict';
  angular.module('MenuApp')
  .controller('CategoriesController',CategoriesController);

  CategoriesController.$inject = ['categoriesList'];
  function CategoriesController(categoriesList) {
    var categoryViewCtrl = this;
    categoryViewCtrl.categoriesList= categoriesList;
  }
})();
