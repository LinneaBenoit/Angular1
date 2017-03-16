(function () {
  'use strict';

  angular.module('DataModule')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', '$q'];
  function MenuDataService($http, $q) {
    var service = this;

    service.getAllCategories = function() {
      var myCategories = [];

      var promise = getResponseObjects()
      .then(function(response) {
        for (var i = 0; i < response.length; i++) {
          myCategories.push({
            name: response[i].name,
            short_name: response[i].short_name
          });
        };

        return myCategories;
      })
      .catch(function(response) {
        console.log("something wrong!");

        return myCategories;
      });

      return promise;
    }

    service.getItemsForCategory = function(categoryShortName) {
      var items = [];

      var promise = getItemsResponseObjects(categoryShortName)
      .then(function(response) {
        var menuItemsArray = response.menu_items;
        for (var i = 0; i < menuItemsArray.length; i++) {

          items.push(menuItemsArray[i].name);
        };

        return items;
      })
      .catch(function(response) {
        console.log("something wrong!");

        return items;
      });

      return promise;
    }

    function getResponseObjects() {
      var httpPromise = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json"
      });

      return httpPromise.then(function(response) {
        return response.data;
      }, function(errorResponse) {
        return response.data;
      });
    }

    function getItemsResponseObjects(categoryShortName) {
      var uRL = "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName;
      var httpPromise = $http({
        method: "GET",
        url: uRL
      });

      return httpPromise.then(function(response) {
        return response.data;
      }, function(errorResponse) {
        return response.data;
      });
    }

  }
})();
