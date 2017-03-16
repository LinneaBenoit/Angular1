(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoriesCtrl', CategoriesCtrl);

  CategoriesCtrl.$inject = ['$scope', '$q', 'MenuDataService', 'myData'];
  function CategoriesCtrl($scope, $q, MenuDataService, myData) {
    var categoriesCtrl = this;

    categoriesCtrl.categories = myData;

  }

})();
