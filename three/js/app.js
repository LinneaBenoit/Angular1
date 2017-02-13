(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
    .directive('foundItems', FoundItems);


    function FoundItems() {
      var ddo = {
        restrict: 'E',
        template: '<li>{{item}}<button class="btn btn-primary" ng-click="controller.removeItem($index);"> Dont want this one!</button></li>'
      };

      return ddo;
    };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrlr = this;

    ctrlr.userInput;
    ctrlr.emptyMessage = false;
    ctrlr.found = [];

    ctrlr.searchInput = function() {
      if (ctrlr.userInput) {
        ctrlr.emptyMessage = false;

        var promise = MenuSearchService.getMatchedMenuItems(ctrlr.userInput.toLowerCase());
        promise.then (function(result){
          ctrlr.found = result;
        })
        .catch (function(error) {
          console.log(error);

          ctrlr.emptyMessage = true;
        });
      }
      else {
        ctrlr.emptyMessage = true;
      };
    }


//var promise = $http(...)
//.then(function(resolution) {
  //var result;  ...
  //return result;  });

  //return promise;

//      var promise = MenuSearchService.getMatchedMenuItems(ctrlr.userInput.toLowerCase());
  //    promise.then(function (response) {
    //    ctrlr.matchedItems = response;
      //})
//      .catch(function (error) {
  //      console.log(error);
    //  })

    ctrlr.removeItem = function($index) {
      ctrlr.found.splice($index, 1);
    }

  };

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchItem) {
//      var foundItems = [];

      var promise = makeHTTPCall()
      .then(function(response) {
        var responseObj = response;
        var items = responseObj.menu_items;

        var matches = matchItems(items, searchItem);

        return matches;
      })
      .catch (function(response) {
        console.log(response);
      });

      return promise;
    };

    function makeHTTPCall() {
      var httpPromise = $http({
        method: "GET",
        url: ApiBasePath
      });

      return httpPromise.then(function(response){
        return response.data;
      });
    }

    function matchItems(items, searchItem) {
      var foundItems = [];

      for (var i=0; i < items.length; i++) {
        var menuName = items[i].name;
        if (menuName.toLowerCase().includes(searchItem)) {
            foundItems.push(menuName);
        }
      }

      return foundItems;
    }
  };


} () );
