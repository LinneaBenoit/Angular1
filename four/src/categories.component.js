(function () {
  'use strict';

  angular.module('MenuApp')
    .component('categoriesComponent', categoriesComponent);

  function categoriesComponent() {
      var component = {
        templateURL: 'src/templates/categories.html',
        bindings: {
          categories: '<'
        },
        controller: CategoriesCtrl,
    		controllerAs: 'categoriesCtrl',
    		bindToController: true
        };

      return component;
    };

})();
