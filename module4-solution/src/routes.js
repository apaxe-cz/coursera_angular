(function(){
  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
    })
    .state('categories',{
      url: '/categories',
      controller: 'CategoriesController as categoryViewCtrl',
      template: '<categories categories-list="categoryViewCtrl.categoriesList"></categories>',
      resolve: {
        categoriesList: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('items',{
      url: '/items/{categoryShortName}',
      controller: 'ItemsController as itemsViewCtrl',
      template: '<items category-data="itemsViewCtrl.categoryData"></items>',
      resolve: {
        categoryData: ['$stateParams', 'MenuDataService',function($stateParams,MenuDataService){
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });
  }
})();
