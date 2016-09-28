'use strict';

/**
 * @ngdoc function
 * @name evezownApp.controller:manageRequestInfoCtrl
 * @description
 * # manageRequestInfoCtrl
 * Controller of the evezownApp
 */
evezownApp
  .controller('manageRfiCtrl', function ($scope, $routeParams, StoreService, $cookieStore) {

    var storeId = $routeParams.id;
    $scope.pagesrc = $routeParams.pagesrc;
    $scope.loggedInUserId = $cookieStore.get('userId');

    function getAllProductsRfi(page) {
      StoreService.getProductRfi(storeId, page).
      then(function (data) {
        $scope.productsRfiCollection = data.data;
        $scope.productsRfiMeta = data.meta;
      });
    }

    getAllProductsRfi();

    $scope.loadMoreProductsRfi = function (page) {
      console.log(page);
      getAllProductsRfi(page)
    };

  });
