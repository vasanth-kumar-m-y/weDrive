'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:StoreProductlineCtrl
 * @description
 * # StoreProductlineCtrl
 * Controller of the appApp
 */
evezownApp
    .controller('storeProductlineCtrl', function ($scope, StoreService, $cookieStore, PATHS, $routeParams) {

        $scope.storefront = $scope.storefront || {};

        $scope.productline = {};

        $scope.storefront.collageImages = [];

        $scope.loggedInUserId = $cookieStore.get('userId');

        $scope.storeOwnerId = -1;

        $scope.imageUrl = PATHS.api_url + 'image/show/';

        var productlineId = $routeParams.id;

        $scope.PageSource = $routeParams.pagesrc;

        function getProductLineDetails(productlineId) {
            StoreService.getProductLine(productlineId).
            then(function (data) {

                var productLineData = data;

                $scope.productline = productLineData;

                var storeFrontDetails = productLineData.store;

                $scope.storefront.owner_id = storeFrontDetails.owner_id;
                $scope.storefront.id = storeFrontDetails.id;

                $scope.isStoreOwner = ($scope.storefront.owner_id == $scope.loggedInUserId);

                $scope.storefront.title = storeFrontDetails.title;
                $scope.storefront.description = storeFrontDetails.description;
                $scope.storefront.aboutus = storeFrontDetails.store_about_us || '';
                if (storeFrontDetails.profile_images != null &&
                    storeFrontDetails.profile_images.large_image_url != '') {
                    $scope.storefront.profile_image = $scope.imageUrl+storeFrontDetails.profile_images.large_image_url + '/288/288';
                }
                else {
                    $scope.storefront.profile_image = 'http://placehold.it/288x288/e50880/ffffff';
                }

                if (storeFrontDetails.store_front_info.target_audience != '') {
                    $scope.storefront.target_audience =
                        storeFrontDetails.store_front_info.target_audience;
                }

                if (storeFrontDetails.store_front_info.offerings != '') {
                    $scope.storefront.offerings =
                        storeFrontDetails.store_front_info.offerings;
                }

                if (storeFrontDetails.store_front_info.motto != '') {
                    $scope.storefront.motto =
                        storeFrontDetails.store_front_info.motto;
                }

                if (storeFrontDetails.store_front_info.vision != '') {
                    $scope.storefront.vision =
                        storeFrontDetails.store_front_info.vision;
                }

                if (storeFrontDetails.store_front_info.purpose != '') {
                    $scope.storefront.purpose =
                        storeFrontDetails.store_front_info.purpose;
                }

                $scope.storefront.contactDetails = [];

                $scope.storefront.contactDetails = {
                    address: storeFrontDetails.street_address,
                    city: storeFrontDetails.city,
                    state: storeFrontDetails.state,
                    country: storeFrontDetails.country,
                    pincode: storeFrontDetails.zip,
                    primary_phone: storeFrontDetails.store_front_info.store_contact_phone1,
                    secondary_phone: storeFrontDetails.store_front_info.store_contact_phone2,
                    email: storeFrontDetails.store_front_info.email_address
                };

                $scope.storefront.privacy = storeFrontDetails.store_terms_conditions;

                $scope.storefront.shippingReturn = storeFrontDetails.store_sales_exchange_policy;


            });
        }

        getProductLineDetails(productlineId);
    });
