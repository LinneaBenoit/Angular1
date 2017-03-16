(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoriesCtrl', CategoriesCtrl);

  CategoriesCtrl.$inject = ['MenuDataService', 'myData'];
  function CategoriesCtrl(MenuDataService, myData) {
    var categoriesCtrl = this;

    categoriesCtrl.categories = myData;
  }
})();
