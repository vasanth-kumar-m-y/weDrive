'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:managePromotionCtrl
 * @description
 * # managePromotionCtrl
 * Controller of the evezownApp
 */
evezownApp
    .controller('managePromotionCtrl', function ($scope, EvezplaceHomeService, $cookieStore,
                                                 usSpinnerService, ngDialog, $controller, PATHS) {

        $scope.userId = $cookieStore.get('userId');

        $scope.selectedSectionId = 3;

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

        function getEvezplacePromotion(sectionId) {
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
                        $scope.promotion.right_top_image.large_image_url + '/780/440';
                }
                if ($scope.promotion.right_bottom_image == null) {
                    $scope.promotion.right_bottom_image = {
                        large_image_url: 'http://placehold.it/390x220/692668/ffffff'
                    }
                }
                else {
                    $scope.promotion.right_bottom_image.large_image_url = PATHS.api_url + 'image/show/' +
                        $scope.promotion.right_bottom_image.large_image_url + '/780/440';
                }
            }, function (error) {
                if (error.error.status_code == 404) {

                    toastr.error(error.error.message, 'MarketPlace Sections');

                    $scope.promotion = {};

                    $scope.promotion = {
                        left_small_caption: 'Everything you need to know',
                        left_large_caption: 'Best place to buy accessories',
                        left_button_text: 'Shop Now',
                        left_link: '#/store/64',
                        right_top_small_caption: 'Best Place to Buy',
                        right_top_link: '#/store/64',
                        right_bottom_small_caption: 'Best Place to Buy',
                        right_bottom_link: '#/store/64',
                        left_image: {
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

        getEvezplacePromotion($scope.selectedSectionId);

        $scope.chooseSectionPromotion = function(sectionId) {
            $scope.selectedSectionId = sectionId;
            getEvezplacePromotion(sectionId);
        };

        /*
         / Save Promotion details
         */
        $scope.savePromotionDetails = function () {
            usSpinnerService.spin('spinner-1');
            EvezplaceHomeService.savePromotion($scope.userId, $scope.promotion, $scope.selectedSectionId)
                .then(function (data) {
                usSpinnerService.stop('spinner-1');
                toastr.success(data.message, 'Save Promotion');
            }, function (error) {
                usSpinnerService.stop('spinner-1');
                toastr.error(error.message, 'Save Promotion');
            });
        };

        $scope.uploadLeftPromotionPic = function () {
            var leftPromotionImageDialog = ngDialog.open(
                {
                    template: 'leftPromotionImageDialogId',
                    scope: $scope,
                    className: 'ngdialog-theme-plain',
                    controller: $controller('leftPromotionImageCtrl', {
                        $scope: $scope
                    })
                });

            leftPromotionImageDialog.closePromise.then(function (data) {
                if (data.value.status) {
                    console.log(data.value.imageName);

                    EvezplaceHomeService.savePromotionImage($scope.userId, data.value.imageName, 1,
                        $scope.selectedSectionId).then(function (data) {
                        usSpinnerService.stop('spinner-1');
                        toastr.success(data.message, 'Save Promotion Image');
                        getEvezplacePromotion($scope.selectedSectionId);
                    }, function (error) {
                        usSpinnerService.stop('spinner-1');
                        toastr.error(error.error.message, 'Save Promotion Image');
                    });
                }

            });
        };

        $scope.uploadRightTopPromotionPic = function () {
            var rightTopPromotionImageDialog = ngDialog.open(
                {
                    template: 'rightTopPromotionImageDialogId',
                    scope: $scope,
                    className: 'ngdialog-theme-plain',
                    controller: $controller('rightTopPromotionImageCtrl', {
                        $scope: $scope
                    })
                });

            rightTopPromotionImageDialog.closePromise.then(function (data) {
                if (data.value.status) {
                    console.log(data.value.imageName);

                    EvezplaceHomeService.savePromotionImage($scope.userId, data.value.imageName, 2,
                        $scope.selectedSectionId).then(function (data) {
                        usSpinnerService.stop('spinner-1');
                        toastr.success(data.message, 'Save Promotion Image');
                        getEvezplacePromotion($scope.selectedSectionId);
                    }, function (error) {
                        usSpinnerService.stop('spinner-1');
                        toastr.error(error.error.message, 'Save Promotion Image');
                    });
                }

            });
        };

        $scope.uploadRightBottomPromotionPic = function () {
            var rightBottomPromotionImageDialog = ngDialog.open(
                {
                    template: 'rightBottomPromotionImageDialogId',
                    scope: $scope,
                    className: 'ngdialog-theme-plain',
                    controller: $controller('rightBottomPromotionImageCtrl', {
                        $scope: $scope
                    })
                });

            rightBottomPromotionImageDialog.closePromise.then(function (data) {
                if (data.value.status) {
                    console.log(data.value.imageName);

                    EvezplaceHomeService.savePromotionImage($scope.userId, data.value.imageName, 3,
                        $scope.selectedSectionId).then(function (data) {
                        usSpinnerService.stop('spinner-1');
                        toastr.success(data.message, 'Save Promotion Image');
                        getEvezplacePromotion($scope.selectedSectionId);
                    }, function (error) {
                        usSpinnerService.stop('spinner-1');
                        toastr.error(error.message, 'Save Promotion Image');
                    });
                }

            });
        };
    });

evezownApp.controller('leftPromotionImageCtrl', function ($scope, usSpinnerService, ngDialog,
                                                        ImageUploadService) {

    $scope.leftPromotionImage = {};
    // Must be [x, y, x2, y2, w, h]
    $scope.leftPromotionImage.coords = [100, 100, 200, 200, 100, 100];

    $scope.leftPromotionImage.selected = function (coords) {
        console.log("selected", coords);
        $scope.leftPromotionImage.coords = coords;
    };

    // You can add a thumbnail if you want
    $scope.leftPromotionImage.thumbnail = false;

    $scope.leftPromotionImage.aspectRatio = 16 / 9;

    $scope.leftPromotionImage.boxWidth = 550;

    $scope.leftPromotionImage.cropConfig = {};

    $scope.leftPromotionImage.cropConfig.aspectRatio = 1.78;

    $scope.uploadLeftPromotionImage = function () {
        if(!$scope.leftPromotionImage.src)
        {
            toastr.error('Please select an image');
        }
        else
        {
            usSpinnerService.spin('spinner-1');
            ImageUploadService.cropImage(
            getBase64Image($scope.leftPromotionImage.src),
            $scope.leftPromotionImage.coords)
            .then(function (data) {
                ngDialog.close("", data);
            }, function (error) {
                usSpinnerService.stop('spinner-1');
                toastr.error(error.message, 'Please crop the image before upload');
            });
        }
    }

    function getBase64Image(dataURL) {
        // imgElem must be on the same server otherwise a cross-origin error will be
        //  thrown "SECURITY_ERR: DOM Exception 18"
        return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    }

});

evezownApp.controller('rightTopPromotionImageCtrl', function ($scope, usSpinnerService, ngDialog,
                                                        ImageUploadService) {

    $scope.rightTopPromotionImage = {};
    // Must be [x, y, x2, y2, w, h]
    $scope.rightTopPromotionImage.coords = [100, 100, 200, 200, 100, 100];

    $scope.rightTopPromotionImage.selected = function (coords) {
        console.log("selected", coords);
        $scope.rightTopPromotionImage.coords = coords;
    };

    // You can add a thumbnail if you want
    $scope.rightTopPromotionImage.thumbnail = false;

    $scope.rightTopPromotionImage.aspectRatio = 16 / 9;

    $scope.rightTopPromotionImage.boxWidth = 550;

    $scope.rightTopPromotionImage.cropConfig = {};

    $scope.rightTopPromotionImage.cropConfig.aspectRatio = 1.78;

    // Crop Title image
    $scope.uploadRightTopPromotionImage = function () {
        if(!$scope.rightTopPromotionImage.src)
        {
            toastr.error('Please select an image');
        }
        else
        {
            usSpinnerService.spin('spinner-1');
            ImageUploadService.cropImage(
            getBase64Image($scope.rightTopPromotionImage.src),
            $scope.rightTopPromotionImage.coords)
            .then(function (data) {
                ngDialog.close("", data);
            }, function (error) {
                usSpinnerService.stop('spinner-1');
                toastr.error(error.message, 'Please crop the image before upload');
            });
        }
    }

    function getBase64Image(dataURL) {
        // imgElem must be on the same server otherwise a cross-origin error will be
        //  thrown "SECURITY_ERR: DOM Exception 18"
        return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    }

});

evezownApp.controller('rightBottomPromotionImageCtrl', function ($scope, usSpinnerService, ngDialog,
                                                        ImageUploadService) {

    $scope.rightBottomPromotionImage = {};
    // Must be [x, y, x2, y2, w, h]
    $scope.rightBottomPromotionImage.coords = [100, 100, 200, 200, 100, 100];

    $scope.rightBottomPromotionImage.selected = function (coords) {
        console.log("selected", coords);
        $scope.rightBottomPromotionImage.coords = coords;
    };

    // You can add a thumbnail if you want
    $scope.rightBottomPromotionImage.thumbnail = false;

    $scope.rightBottomPromotionImage.aspectRatio = 16 / 9;

    $scope.rightBottomPromotionImage.boxWidth = 550;

    $scope.rightBottomPromotionImage.cropConfig = {};

    $scope.rightBottomPromotionImage.cropConfig.aspectRatio = 1.78;

    // Crop Title image
    $scope.uploadRightBottomPromotionImage = function () {
        if(!$scope.rightBottomPromotionImage.src)
        {
            toastr.error('Please select an image');
        }
        else
        {
            usSpinnerService.spin('spinner-1');
            ImageUploadService.cropImage(
            getBase64Image($scope.rightBottomPromotionImage.src),
            $scope.rightBottomPromotionImage.coords)
            .then(function (data) {
                ngDialog.close("", data);
            }, function (error) {
                usSpinnerService.stop('spinner-1');
                toastr.error(error.message, 'Please crop the image before upload');
            });
        }
    }

    function getBase64Image(dataURL) {
        // imgElem must be on the same server otherwise a cross-origin error will be
        //  thrown "SECURITY_ERR: DOM Exception 18"
        return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    }

});
