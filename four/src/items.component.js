(function () {
  'use strict';

  angular.module('MenuApp')
    .component('itemsComponent', itemsComponent);

  function itemsComponent() {
      var component = {
        templateURL: 'src/templates/items.html',
        bindings: {
          items: '<'
        },
        controller: ItemsCtrl,
    		controllerAs: 'itemsCtrl',
    		bindToController: true
        };

      return component;
    };

})();
