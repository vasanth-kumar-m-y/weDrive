'use strict';

/**
 * @ngdoc function
 * @name evezownApp:evezplaceRecommendationCtrl
 * @description
 * # evezplaceRecommendationCtrl
 * Controller of the evezownApp
 */
evezownApp
  .controller('evezplaceRecommendationCtrl', function ($scope, $cookieStore, EvezplaceHomeService,
                                                       PATHS, $rootScope, evezplaceSectionService) {

      var currentSectionIndex = 0;

      $scope.userId = $cookieStore.get('userId');

      $scope.imageUrl = PATHS.api_url;


      function chunk(arr, size) {
          var newArr = [];
          for (var i=0; i<arr.length; i+=size) {
              newArr.push(arr.slice(i, i+size));
          }
          return newArr;
      }

      $rootScope.$on('selectedEvezplaceSectionIndex', function (event, args) {
          currentSectionIndex = args.index;

          console.log('current selected section index ' + currentSectionIndex);

          getEvezplaceRecommendations(currentSectionIndex);

          getEvezplaceTrendingItems(currentSectionIndex);
      });

      function getEvezplaceRecommendations(index) {

          var sectionId = evezplaceSectionService.getSectionId(index);

          EvezplaceHomeService.getRecommendations(sectionId).
          then(function (data) {
              $scope.recommendations = chunk(data.data, 4);
          }, function (error) {
              if (error.error.status_code == 404) {

                  toastr.error(error.error.message, 'MarketPlace Recommendations');
              }
          });
      }

      getEvezplaceRecommendations(currentSectionIndex);

      function getEvezplaceTrendingItems(index) {

          var sectionId = evezplaceSectionService.getSectionId(index);

          EvezplaceHomeService.getTrendingItems(sectionId).
          then(function (data) {
              $scope.trendingItems = chunk(data.data, 4);
          }, function (error) {
              if (error.error.status_code == 404) {

                  toastr.error(error.error.message, 'MarketPlace Recommendations');
              }
          });
      }

      getEvezplaceTrendingItems(currentSectionIndex);
  });
