'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

evezownApp
  .directive('sidebar',['$location',function() {
    return {
      templateUrl:'directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
        categories : '=',
        selectSubCategory : '&'
      },
      controller:function($scope){
        $scope.selectedCategoryIndex = 0;
        $scope.selectedSubcategoryIndex = -1;
        $scope.collapseVar = 0;

        $scope.selectCategory = function(index){
          $scope.selectedCategoryIndex = index - 1;
          $scope.selectedSubcategoryIndex = -1;
          if(index==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = index;
        };

        $scope.selectItem = function(index) {
          $scope.selectedSubcategoryIndex = index;
        }
      }
    }
  }]);
