(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig ($stateProvider, $urlRouterProvider) {
      // Redirect to tab 1 if no other URL matches
      $urlRouterProvider.otherwise('/');

      // Set up UI states
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'src/templates/home.html',

        })

        .state('categories', {
          url: '/categories',
          templateUrl: 'src/templates/categories.html',
          controller: 'CategoriesCtrl as categoriesCtrl',
          resolve: {
            myData:['MenuDataService', function(MenuDataService) {
              return MenuDataService.getAllCategories();
            }]
          }
        })

        .state('items', {
          url: '/items/{categoryShortName}',
          templateUrl: 'src/templates/items.html',
          controller: 'ItemsCtrl as itemsCtrl',
          resolve: {
            myData:['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }]
          }
        });
    }

  })();
