'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:EvezplaceEvezplacepromotionctrlCtrl
 * @description
 * # EvezplaceEvezplacepromotionctrlCtrl
 * Controller of the appApp
 */
evezownApp
    .controller('evezplacePromotionCtrl', function ($scope, EvezplaceHomeService, PATHS, $rootScope, $http, $cookieStore) {

        $scope.currentSelectedSectionIndex = 0;

        $scope.loggedInUser = $cookieStore.get('userId');

        $rootScope.$on('selectedEvezplaceSectionIndex', function (event, args) {
            $scope.currentSelectedSectionIndex = args.index;

            console.log('current selected section index ' + $scope.currentSelectedSectionIndex);

            getEvezplacePromotion();
        });

        function getEvezplacePromotion() {

            var sectionId;

            if($scope.currentSelectedSectionIndex == 0) {
                sectionId = 3;
            }

            if($scope.currentSelectedSectionIndex == 1) {
                sectionId = 4;
            }

            if($scope.currentSelectedSectionIndex == 2) {
                sectionId = 6;
            }

            if($scope.currentSelectedSectionIndex == 3) {
                sectionId = 5;
            }

            EvezplaceHomeService.getPromotion(sectionId).
            then(function (data) {
                $scope.promotion = data;

                if ($scope.promotion.left_image == null) {
                    $scope.promotion.left_image = {
                        large_image_url: 'http://placehold.it/780x440/692668/ffffff'
                    }
                }
                else {
                    $scope.promotion.left_image.large_image_url = PATHS.api_url + 'image/show/' +
                        $scope.promotion.left_image.large_image_url + '/780/440';
                }
                if ($scope.promotion.right_top_image == null) {

                    $scope.promotion.right_top_image = {
                        large_image_url: 'http://placehold.it/390x220/692668/ffffff'
                    }
                }
                else {
                    $scope.promotion.right_top_image.large_image_url = PATHS.api_url + 'image/show/' +
                        $scope.promotion.right_top_image.large_image_url + '/390/220';
                }
                if ($scope.promotion.right_bottom_image == null) {
                    $scope.promotion.right_bottom_image = {
                        large_image_url: 'http://placehold.it/390x220/692668/ffffff'
                    }
                }
                else {
                    $scope.promotion.right_bottom_image.large_image_url = PATHS.api_url + 'image/show/' +
                        $scope.promotion.right_bottom_image.large_image_url + '/390/220';
                }

            }, function (error) {
                if(error.error.status_code == 404) {
                    $scope.promotion = {};

                    $scope.promotion = {

                        left_small_caption: 'Everything you need to know',
                        left_large_caption: 'Best place to buy accessories',
                        left_button_text: 'Shop Now',
                        left_link: '#/store/64',
                        right_top_small_caption : 'Best Place to Buy',
                        right_top_link: '#/store/64',
                        right_bottom_small_caption: 'Best Bottom Place to Buy',
                        right_bottom_link: '#/store/64',
                        left_image : {
                            large_image_url: 'http://placehold.it/780x440/692668/ffffff'
                        },
                        right_top_image: {
                            large_image_url: 'http://placehold.it/390x220/692668/ffffff'
                        },
                        right_bottom_image: {
                            large_image_url: 'http://placehold.it/390x220/692668/ffffff'
                        }
                    };
                }
            });
        }

        $scope.getRole = function ($userId) {
        $http.get(PATHS.api_url +  'users/' + $userId)
            .success(function(data){
                $scope.CheckRole = data.data.role;
            })
            .error(function(err){
                console.log('Error retrieving user');
            });
        }
        $scope.getRole($scope.loggedInUser);

        getEvezplacePromotion();
    });
