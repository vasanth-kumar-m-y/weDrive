'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:ManageStoreManagerequestquoteCtrl
 * @description
 * # ManageStoreManagerequestquoteCtrl
 * Controller of the appApp
 */
evezownApp
  .controller('manageRfqCtrl', function ($scope, $routeParams, StoreService, $cookieStore) {

    var storeId = $routeParams.id;
    $scope.pagesrc = $routeParams.pagesrc;
    $scope.loggedInUserId = $cookieStore.get('userId');

    function getAllStoreRfq(page) {
      StoreService.getStoreRfq(storeId, page).
      then(function (data) {
        $scope.storeRfqCollection = data.data;
        $scope.storeRfqMeta = data.meta;
      });
    }

    getAllStoreRfq();

    $scope.loadMoreStoreRfq = function (page) {
      console.log(page);
      getAllStoreRfq(page)
    };
  });
