(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsCtrl', ItemsCtrl);

  ItemsCtrl.$inject = ['$scope','MenuDataService', 'myData'];
  function ItemsCtrl($scope, MenuDataService, myData) {
    var itemsCtrl = this;

    itemsCtrl.items = myData;
  }

})();
