'use strict';

/**
 * @ngdoc function
 * @name evezownApp.controller:manageRecommendationsCtrl
 * @description
 * # manageRecommendationsCtrl
 * Controller of the evezownApp
 */
evezownApp
    .controller('manageRecommendationsCtrl', function ($scope, $cookieStore, EvezplaceHomeService,
                                                       ngDialog, $controller, usSpinnerService, PATHS) {

        $scope.userId = $cookieStore.get('userId');

        $scope.imageUrl = PATHS.api_url;

        $scope.selectedSectionId = 3;

        $scope.isAddRecommendation = false;

        function chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }

        // Reset all add new recommendation fields.
        function resetRecommendation() {
            $scope.newRecommendation = {
                update_image: {
                    large_image_url: 'http://placehold.it/480x480/692668/ffffff'
                }
            };
        };

        $scope.toggleRecommendation = function () {
            $scope.newRecommendation = {
                update_image: {
                    large_image_url: 'http://placehold.it/480x480/692668/ffffff'
                }
            };

            $scope.isAddRecommendation = !$scope.isAddRecommendation
        };

        $scope.toggleRecommendationUpdate = function (recommendation, recommendations4) {

            $scope.newRecommendation = recommendation;

            recommendation.update_image = {};

            if (recommendation.image == null) {
                $scope.newRecommendation.update_image = {
                    large_image_url: 'http://placehold.it/480x480/692668/ffffff'
                }
            }
            else {
                $scope.newRecommendation.update_image = {
                    large_image_url: PATHS.api_url + 'image/show/' +
                    recommendation.image.large_image_url + '/480/480'
                }
            }

            recommendations4.isEditRecommendation = !recommendations4.isEditRecommendation;

            recommendation.isEditActive = recommendations4.isEditRecommendation;
        };

        function getEvezplaceSection(userId) {
            EvezplaceHomeService.getSections(userId).
            then(function (data) {
                $scope.sections = data;
                $scope.selectedSectionId = $scope.sections[0].id;
            }, function (error) {
                toastr.error(error.error.message, 'MarketPlace Sections');
            });
        }

        getEvezplaceSection($scope.userId);

        $scope.recommendations = [];

        function getEvezplaceRecommendations(sectionId, page) {
            EvezplaceHomeService.getRecommendations(sectionId, page).
            then(function (data) {
                $scope.recommendations = chunk(data.data, 4);
                $scope.recommendationMeta = data.meta;
            }, function (error) {
                if (error.error.status_code == 404) {

                    toastr.error(error.error.message, 'MarketPlace Recommendations');
                }
            });
        }

        // This will load the newly created recommendation when image is
        //  uploaded or data is saved.
        function getEvezplaceRecommendation(recommendationId) {
            EvezplaceHomeService.getRecommendation(recommendationId).
            then(function (data) {
                console.log(data);
                $scope.newRecommendation = data;

                if ($scope.newRecommendation.image == null) {
                    $scope.newRecommendation.update_image = {
                        large_image_url: 'http://placehold.it/480x480/692668/ffffff'
                    }
                }
                else {
                    $scope.newRecommendation.update_image = {
                        large_image_url: PATHS.api_url + 'image/show/' +
                        $scope.newRecommendation.image.large_image_url + '/480/480'
                    }
                }

            }, function (error) {
                if (error.error.status_code == 404) {
                    toastr.error(error.error.message, 'MarketPlace Recommendations');
                }
            });
        }

        getEvezplaceRecommendations($scope.selectedSectionId);

        $scope.chooseSectionRecommendations = function (sectionId, page) {
            $scope.selectedSectionId = sectionId;
            getEvezplaceRecommendations(sectionId, page);
        };

        $scope.getEvezplaceRecommendationsForPage = function(page){
            getEvezplaceRecommendations($scope.selectedSectionId, page);
        };

        /*
         / Save recommendation details
         */
        $scope.saveRecommendationDetails = function (recommendation) {
            usSpinnerService.spin('spinner-1');
            EvezplaceHomeService.saveRecommendationDetails($scope.userId, recommendation, $scope.selectedSectionId)
                .then(function (data) {
                    usSpinnerService.stop('spinner-1');
                    if (data.status) {
                        console.log('Recommendation id: ' + data.id);
                        toastr.success(data.message, 'Save Recommendation');
                        getEvezplaceRecommendation(data.id);
                    }

                }, function (error) {
                    usSpinnerService.stop('spinner-1');
                    toastr.error(error.message, 'Save Recommendation');
                });
        };

        /*
         / Delete recommendation
         */
        $scope.DeleteRecomondation = function (recommendation) {
            
            usSpinnerService.spin('spinner-1');
            EvezplaceHomeService.DeleteRecommendationDetails($scope.userId, recommendation)
                .then(function (data) {
                    usSpinnerService.stop('spinner-1');
                    if (data.status) {
                        console.log(data);
                        toastr.success(data.message, 'Recommendation Deleted');
                        getEvezplaceRecommendations($scope.selectedSectionId);
                    }

                }, function (error) {
                    usSpinnerService.stop('spinner-1');
                    toastr.error(error.message, 'Please try later');
                });
        };


        /*
         / Close recommendation details
         */
        $scope.doneRecommendationDetails = function (recommendation) {

            $scope.saveRecommendationDetails(recommendation);

            resetRecommendation();

            $scope.isAddRecommendation = !$scope.isAddRecommendation;

            getEvezplaceRecommendations($scope.selectedSectionId);
        };

        /*
         / Close trending update details
         */
        $scope.doneUpdateRecommendationDetails = function (recommendation, recommendations4) {

            $scope.saveRecommendationDetails(recommendation);

            resetRecommendation($scope.newTrendingItem);

            recommendations4.isEditRecommendation = !recommendations4.isEditRecommendation;

            recommendation.isEditActive = recommendations4.isEditRecommendation;

            getEvezplaceRecommendations($scope.selectedSectionId);
        };

        /*
         / Discard recommendation details
         */
        $scope.discardRecommendationDetails = function () {
            resetRecommendation();
            $scope.isAddRecommendation = !$scope.isAddRecommendation;
        };

        $scope.showRecommendationImageDialog = function () {
            var recommendationImageDialog = ngDialog.open(
                {
                    template: 'recommendationImageDialogId',
                    scope: $scope,
                    className: 'ngdialog-theme-plain',
                    controller: $controller('recommendationImageCtrl', {
                        $scope: $scope
                    })
                });

            recommendationImageDialog.closePromise.then(function (data) {
                if (data.value.status) {
                    console.log(data.value.imageName);

                    EvezplaceHomeService.saveRecommendationImage($scope.userId, data.value.imageName,
                        $scope.newRecommendation.id, $scope.selectedSectionId).then(function (data) {
                        usSpinnerService.stop('spinner-1');
                        if (data.status) {
                            toastr.success(data.message, 'Save Promotion Image');
                            getEvezplaceRecommendation(data.id);
                        }
                    }, function (error) {
                        usSpinnerService.stop('spinner-1');
                        toastr.error(error.error.message, 'Save Promotion Image');
                    });
                }

            });
        };
    });

evezownApp.controller('recommendationImageCtrl', function ($scope, usSpinnerService, ngDialog,
                                                           ImageUploadService) {

    $scope.recommendationImage = {};
    // Must be [x, y, x2, y2, w, h]
    $scope.recommendationImage.coords = [100, 100, 200, 200, 100, 100];

    $scope.recommendationImage.selected = function (coords) {
        console.log("selected", coords);
        $scope.recommendationImage.coords = coords;
    };

    // You can add a thumbnail if you want
    $scope.recommendationImage.thumbnail = false;

    $scope.recommendationImage.aspectRatio = 1;

    $scope.recommendationImage.boxWidth = 550;

    $scope.recommendationImage.cropConfig = {};

    $scope.recommendationImage.cropConfig.aspectRatio = 1;

    $scope.uploadRecommendationImage = function () {

        usSpinnerService.spin('spinner-1');

        ImageUploadService.cropImage(
            getBase64Image($scope.recommendationImage.src),
            $scope.recommendationImage.coords)
            .then(function (data) {
                ngDialog.close("", data);
            }, function (error) {
                usSpinnerService.stop('spinner-1');
                toastr.error(error.message, 'Upload Recommendation Image');
            });
    }

    function getBase64Image(dataURL) {
        // imgElem must be on the same server otherwise a cross-origin error will be
        //  thrown "SECURITY_ERR: DOM Exception 18"
        return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    }

});
