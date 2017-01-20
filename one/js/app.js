(function () {
  'use strict';

  angular.module('LunchCounter', []).controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope) {
    $scope.message = "";
    $scope.errorMessage = "";
    $scope.lunchList = "";
    $scope.boxColor = "";

    $scope.countItems = function() {
      reset();
      if ($scope.lunchList == "") {
        $scope.errorMessage = "Please enter data first";
        $scope.boxColor = "boxRed";
      } else {
        $scope.errorMessage = "";
        var lunchArray = $scope.lunchList.split(',');
        lunchArray = lunchArray.filter(checkEmpty);
        var count = lunchArray.length;
        determineMessage(count);
        $scope.boxColor = "boxGreen";
      }
    };

    function determineMessage(count) {
      if (count <= 3) {
        $scope.message = "Enjoy";
      } else {
        $scope.message = "Too Much";
      }
    }

    function checkEmpty(string) {
      return (string != "" && string != " ") ;
    }

    function reset(){
      $scope.message = "";
      $scope.errorMessage = "";
      $scope.boxColor = "";
    }

  }

})();
