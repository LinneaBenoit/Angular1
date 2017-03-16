(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsCtrl', ItemsCtrl);

  ItemsCtrl.$inject = ['MenuDataService', 'myData'];
  function ItemsCtrl(MenuDataService, myData) {
    var itemsCtrl = this;

    itemsCtrl.items = myData;
  }

})();
