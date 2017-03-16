(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('baseUrl', 'https://davids-restaurant.herokuapp.com/')
  .directive('foundItems', FoundItems);

  function FoundItems() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'found-items.html',
      scope: {
        emptyResult: '@',
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItemsDC',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
  }

  MenuSearchService.$inject = ['$http', 'baseUrl']
  function MenuSearchService($http, baseUrl) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({url: baseUrl + 'menu_items.json'})
      .then(function (result) {
        var found = [];

        console.log('Searching for :' + searchTerm);
        var res = result.data.menu_items;

        var lowerSearchTerm = searchTerm.toLowerCase();

        for (var i = 0; i < res.length; i++) {
          if (res[i].description.toLowerCase().indexOf(lowerSearchTerm) !== -1) {
            found.push(res[i]);
          }
        }

        return found;
      })
    }

  }

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
  function NarrowItDownController($scope, MenuSearchService) {
    var list = this;

    list.found = [];
    list.emptyResult = false;

    list.narrowItDown = function () {
      if ($scope.searchTerm === '' || $scope.searchTerm === undefined) {
        list.emptyResult = true;
        list.found = [];
        return;
      }

      var promise = MenuSearchService.getMatchedMenuItems($scope.searchTerm);

      promise.then(function(result) {
        list.emptyResult = (result.length === 0);
        list.found = result;
      });

    }

    list.removeItem = function(index) {
      console.log('Removing item', index);
      list.found.splice(index, 1);
    }

  }

})();
