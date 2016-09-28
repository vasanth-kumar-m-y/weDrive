'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AdminEvezplaceManagetrendingitemsCtrl
 * @description
 * # AdminEvezplaceManagetrendingitemsCtrl
 * Controller of the appApp
 */
evezownApp
    .controller('manageTrendingItemsCtrl', function ($scope, $cookieStore, EvezplaceHomeService,
                                                     ngDialog, $controller, usSpinnerService, PATHS) {
        $scope.userId = $cookieStore.get('userId');

        $scope.imageUrl = PATHS.api_url;

        $scope.selectedSectionId = 3;

        $scope.isAddTrendingItem = false;

        function chunk(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }

        // Reset all add new recommendation fields.
        function resetTrendingItem() {
            $scope.newTrendingItem = {
                update_image: {
                    large_image_url: 'http://placehold.it/480x480/692668/ffffff'
                }
            };
        };

        $scope.toggleTrendingItem = function () {
            $scope.newTrendingItem = {
                update_image: {
                    large_image_url: 'http://placehold.it/480x480/692668/ffffff'
                }
            };

            $scope.isAddTrendingItem = !$scope.isAddTrendingItem
        };

        $scope.toggleTrendingItemUpdate = function (trendingItem, trendingItems4) {

            $scope.newTrendingItem = trendingItem;

            trendingItem.update_image = {};

            if (trendingItem.image == null) {
                $scope.newTrendingItem.update_image = {
                    large_image_url: 'http://placehold.it/480x480/692668/ffffff'
                }
            }
            else {
                $scope.newTrendingItem.update_image.large_image_url = PATHS.api_url + 'image/show/' +
                    trendingItem.image.large_image_url + '/480/480';
            }

            trendingItems4.isEditTrendingItem = !trendingItems4.isEditTrendingItem;

            trendingItem.isEditActive = trendingItems4.isEditTrendingItem;
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

        $scope.trendingItems = [];

        function getEvezplaceTrendingItems(sectionId, page) {
            EvezplaceHomeService.getTrendingItems(sectionId, page).
            then(function (data) {
                $scope.trendingItems = chunk(data.data, 4);
                $scope.trendingMeta = data.meta;
            }, function (error) {
                if (error.error.status_code == 404) {

                    toastr.error(error.error.message, 'MarketPlace Recommendations');
                }
            });
        }

        // This will load the newly created recommendation when image is
        //  uploaded or data is saved.
        function getEvezplaceTrendingItem(trendingItemId) {
            EvezplaceHomeService.getTrendingItem(trendingItemId).
            then(function (data) {
                console.log(data);
                $scope.newTrendingItem = data;

                if ($scope.newTrendingItem.image == null) {
                    $scope.newTrendingItem.update_image = {
                        large_image_url: 'http://placehold.it/480x480/692668/ffffff'
                    }
                }
                else {
                    $scope.newTrendingItem.update_image = {
                        large_image_url : PATHS.api_url + 'image/show/' +
                        $scope.newTrendingItem.image.large_image_url + '/480/480'
                    };
                }

            }, function (error) {
                if (error.error.status_code == 404) {
                    toastr.error(error.error.message, 'MarketPlace Recommendations');
                }
            });
        }

        getEvezplaceTrendingItems($scope.selectedSectionId);

        $scope.chooseSectionTrendingItems = function (sectionId) {
            $scope.selectedSectionId = sectionId;
            getEvezplaceTrendingItems(sectionId);
        };

        $scope.getEvezplaceTrendingItemsForPage = function(page) {
            getEvezplaceTrendingItems($scope.selectedSectionId, page);
        };
        /*
         / Save recommendation details
         */
        $scope.saveTrendingItemDetails = function (trendingItem) {
            usSpinnerService.spin('spinner-1');
            EvezplaceHomeService.saveTrendingItemDetails($scope.userId, trendingItem, $scope.selectedSectionId)
                .then(function (data) {
                    usSpinnerService.stop('spinner-1');
                    if (data.status) {
                        console.log('Trending Item id: ' + data.id);
                        toastr.success(data.message, 'Save Trending Item');
                        getEvezplaceTrendingItem(data.id, $scope.newTrendingItem);
                    }

                }, function (error) {
                    usSpinnerService.stop('spinner-1');
                    toastr.error(error.message, 'Save Recommendation');
                });
        };


         /*
         / Delete Trending Items
         */
        $scope.DeleteTrendingItem = function (trendingItem) {

            usSpinnerService.spin('spinner-1');
            EvezplaceHomeService.DeleteTrendingItemDetails($scope.userId, trendingItem)
                .then(function (data) {
                    usSpinnerService.stop('spinner-1');
                    if (data.status) {
                        console.log(data);
                        toastr.success(data.message, 'TrendingItem deleted successfully');
                        getEvezplaceTrendingItems($scope.selectedSectionId);
                    }

                }, function (error) {
                    usSpinnerService.stop('spinner-1');
                    toastr.error(error.message, 'Delete trending item');
                });
        };

        /*
         / Close recommendation details
         */
        $scope.doneTrendingItemDetails = function (trendingItem) {

            $scope.saveTrendingItemDetails(trendingItem);

            resetTrendingItem($scope.newTrendingItem);

            $scope.isAddTrendingItem = !$scope.isAddTrendingItem;

            getEvezplaceTrendingItems($scope.selectedSectionId);
        };

        /*
         / Close trending update details
         */
        $scope.doneUpdateTrendingItemDetails = function (trendingItem, trendingItem4) {

            $scope.saveTrendingItemDetails(trendingItem);

            resetTrendingItem($scope.newTrendingItem);

            trendingItem4.isEditTrendingItem = !trendingItem4.isEditTrendingItem;

            trendingItem.isEditActive = trendingItem4.isEditTrendingItem;

            getEvezplaceTrendingItems($scope.selectedSectionId);
        };

        /*
         / Discard recommendation details
         */
        $scope.discardTrendingItemDetails = function (trendingItem) {
            resetTrendingItem($scope.newTrendingItem);

            $scope.isEditTrendingItem = !$scope.isEditTrendingItem;

            trendingItem.isAddTrendingItem = $scope.isAddTrendingItem;
        };

        $scope.showTrendingItemImageDialog = function () {
            var trendingItemImageDialog = ngDialog.open(
                {
                    template: 'trendingItemImageDialogId',
                    scope: $scope,
                    className: 'ngdialog-theme-plain',
                    controller: $controller('trendingItemImageCtrl', {
                        $scope: $scope
                    })
                });

            trendingItemImageDialog.closePromise.then(function (data) {
                if (data.value.status) {
                    console.log(data.value.imageName);

                    EvezplaceHomeService.saveTrendingItemImage($scope.userId, data.value.imageName,
                        $scope.newTrendingItem.id, $scope.selectedSectionId).then(function (data) {
                        usSpinnerService.stop('spinner-1');
                        if (data.status) {
                            toastr.success(data.message, 'Save Promotion Image');
                            getEvezplaceTrendingItem(data.id, $scope.newTrendingItem);
                        }
                    }, function (error) {
                        usSpinnerService.stop('spinner-1');
                        toastr.error(error.error.message, 'Save Promotion Image');
                    });
                }

            });
        };
    });

evezownApp.controller('trendingItemImageCtrl', function ($scope, usSpinnerService, ngDialog,
                                                         ImageUploadService) {

    $scope.trendingItemImage = {};
    // Must be [x, y, x2, y2, w, h]
    $scope.trendingItemImage.coords = [100, 100, 200, 200, 100, 100];

    $scope.trendingItemImage.selected = function (coords) {
        console.log("selected", coords);
        $scope.trendingItemImage.coords = coords;
    };

    // You can add a thumbnail if you want
    $scope.trendingItemImage.thumbnail = false;

    $scope.trendingItemImage.aspectRatio = 1;

    $scope.trendingItemImage.boxWidth = 550;

    $scope.trendingItemImage.cropConfig = {};

    $scope.trendingItemImage.cropConfig.aspectRatio = 1;

    $scope.uploadTrendingItemImage = function () {

        usSpinnerService.spin('spinner-1');

        ImageUploadService.cropImage(
            getBase64Image($scope.trendingItemImage.src),
            $scope.trendingItemImage.coords)
            .then(function (data) {
                ngDialog.close("", data);
            }, function (error) {
                usSpinnerService.stop('spinner-1');
                toastr.error(error.message, 'Upload Trending Item Image');
            });
    }

    function getBase64Image(dataURL) {
        // imgElem must be on the same server otherwise a cross-origin error will be
        //  thrown "SECURITY_ERR: DOM Exception 18"
        return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    }

});
