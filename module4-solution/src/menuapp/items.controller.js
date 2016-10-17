(function () {
'use strict';
  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['categoryData'];
  function ItemsController(categoryData) {
    var itemsView = this;
    itemsView.categoryData = categoryData;
  }
})();
