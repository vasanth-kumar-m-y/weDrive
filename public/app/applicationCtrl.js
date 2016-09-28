/**
 * @ngdoc controller
 * @name evezownapp.controller:applicationCtrl
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */


evezownApp
    .controller('ApplicationCtrl', function ($rootScope, $scope, $location,
                                             USER_ROLES,
                                             AuthService, Session, $cookieStore, profileService, PATHS, $http, localStorageService, $controller) {
        $scope.userRoles = USER_ROLES;
        $rootScope.profileImage = null;
        $scope.Role = $cookieStore.get('userRole');
        //$scope.$on('profileImage', function(event, msg) {
        //    $scope.profileImage = PATHS.api_url +'image/show/'+msg;
        //});

        function fetchProfile(userID) {
            //profileService.getProfile(userID).then(function(data){
            //$scope.firstname = data.firstname;
            //$scope.lastname = data.lastname;
            //$scope.userId = data.id;
            //$scope.loggedInUserId = $cookieStore.get('userId');

            var myDataPromise = AuthService.setProfile(PATHS.api_url + 'users/' + $cookieStore.get('userId'));
            myDataPromise.then(function (result) {  // this is only run after $http completes
                var profileData = AuthService.getProfile();
                $rootScope.firstname = profileData.data.firstname;
                $rootScope.lastname = profileData.data.lastname;
                $rootScope.userId = profileData.data.id;
                $rootScope.roleId = profileData.data.role_id;
                $rootScope.loggedInUserId = $cookieStore.get('userId');
                $rootScope.loggedIn = true;
            });


            //fetchProfileImage($scope.userId);


            //});
        }

        function fetchProfileImage(userId) {
            var myDataPromise = AuthService.setImage(PATHS.api_url + 'users/' + $cookieStore.get('userId') + '/profile_image/current');
            myDataPromise.then(function (result) {  // this is only run after $http completes
                $rootScope.profileImage = null;
                $rootScope.profileImage = AuthService.getImage();
            });
        }


        if ($cookieStore.get('userId')) {
            $rootScope.userId = $cookieStore.get('userId');
            fetchProfile($cookieStore.get('userId'));
            fetchProfileImage($cookieStore.get('userId'));

        }

        $scope.$watch('userId', function (newvalue, oldvalue) {
            if (oldvalue) {
                if (oldvalue != newvalue) {
                    $rootScope.userId = newvalue;
                }
            }
        });

        $scope.$watch('profileImage', function (newvalue, oldvalue) {
            if (oldvalue) {
                if (oldvalue != newvalue) {
                    $rootScope.profileImage = newvalue;
                }
            }
        });


        $scope.GetCaptions = function(id)
        {
           
            $http.get(PATHS.api_url + 'admin/'+ $cookieStore.get('userId')  +'/'+ id +'/getscreenfields').
            success(function (data, status, headers, config)
            {
                console.log(data);
                $scope.FooterCaptions = data.data;
            }).error(function (data)
            {
                console.log(data);
            });
        }
        $scope.GetCaptions(2);
        //AuthService.getProfileImage(PATHS.api_url + 'users/' + $cookieStore.get('userId') + '/profile_image/current').success(function(data) {
        //    $scope.profileImage = PATHS.api_url + 'image/show/' + data;
        //});


        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.getLoggedInStatus = function () {
            if ($cookieStore.get('userId') == null) {
                return $rootScope.loggedIn;
            }
            return true;

        }

        $scope.$watch('loggedIn', function (newvalue, oldvalue) {
            $rootScope.loggedIn = newvalue;
        });

        //clear cookies and sessions
        $scope.Logout = function () {

            $http.get(PATHS.api_url + 'users/' + $scope.loggedInUserId + '/logout')
            .success(function (data)
            {
                    console.log(data);
            })
            .error(function (err)
            {
                console.log(err);

            });

            $cookieStore.remove('api_key');
            $cookieStore.remove('userId');
            $cookieStore.remove('userRole');
            $cookieStore.remove('post');
            $cookieStore.remove('userToken');
            //userToken
            Session.destroy();
            $rootScope.loggedIn = false;
            $rootScope.firstname = null;
            $rootScope.lastname = null;
            $rootScope.userId = null;
            $rootScope.loggedInUserId = null;
            $rootScope.username = '';

            localStorageService.clearAll();
            var testCtrl1ViewModel = $scope.$new();
            $controller('TopMenuCtrl',{$scope : testCtrl1ViewModel });

            toastr.success('Logout', 'You have been logged out successfully');
            $location.path('\home');

            //swal({
            //    title: "Are you sure?",
            //    text: "This will log you off evezown",
            //    type: "warning",
            //    showCancelButton: true,
            //    confirmButtonColor: "#DD6B55",
            //    confirmButtonText: "Yes, Log out!",
            //    closeOnConfirm: true
            //}, function () {
            //    $cookieStore.remove('api_key');
            //    $cookieStore.remove('userId');
            //    $cookieStore.remove('post');
            //    Session.destroy();
            //    $rootScope.loggedIn = false;
            //    $rootScope.username = '';
            //    toastr.success('Logout', 'You have been logged successfully');
            //    $location.path('/home');
            //});
        }

        $scope.accessCtrl =  function()
        {
            toastr.info("You should have Business subscription to access this feature");
        }

    });

evezownApp.controller('TopMenuCtrl', function ($scope, $cookieStore, StoreService, PATHS, $http, localStorageService, $rootScope) {

    $scope.shoppingCartItems = StoreService.getShoppingCartItems();

    $scope.imageUrl = PATHS.api_url;
    console.log($scope.shoppingCartItems);

    $rootScope.isShoppingCartEmpty = StoreService.isShoppingCartEmpty();

    console.log('Is shopping cart empty: ' + $rootScope.isShoppingCartEmpty);

    $scope.totalPrice = 0;
    $scope.totalShipping = 0;
    $rootScope.shoppingCartCount = 0;

    angular.forEach($scope.shoppingCartItems, function(value) {
        angular.forEach(value.products, function(product) {
            $scope.totalPrice =  +$scope.totalPrice +  (+product.price * +product.quantity);
            $scope.totalShipping = +$scope.totalShipping + +product.shippingCharge;
        });

        $rootScope.shoppingCartCount = +$rootScope.shoppingCartCount + +value.products.length;
    });

    $scope.shoppingCartPopover = {
        templateUrl: 'partials/shoppingcart.tpl.html'
    };

    // $scope.removeFromCart = function($product) {

    //     $scope.shoppingCartItems.splice($scope.shoppingCartItems.indexOf($product), 1);

    //     localStorageService.set('shoppingCartItems', $scope.shoppingCartItems);

    //     onQuantityChange();

    // };

    // function onQuantityChange () {
    //     $scope.totalPrice = 0;
    //     $scope.totalShipping = 0;
    //     $rootScope.shoppingCartCount = 0;

    //     angular.forEach($scope.shoppingCartItems, function(value) {
    //         angular.forEach(value.products, function(product) {
    //             $scope.totalPrice =  +$scope.totalPrice +  (+product.price * +product.quantity);
    //             //$scope.totalShipping = +$scope.totalShipping + +product.shippingCharge;
    //         });
    //         $rootScope.shoppingCartCount = +$rootScope.shoppingCartCount + +value.products.length;
    //     });

    // }

    // $scope.$watch('shoppingCartItems', function() {
    //     onQuantityChange();
    // }, true);

    $scope.$on('shoppingCartItems', function (event, args) {

        var shoppingCartItems = args.message;

        console.log(shoppingCartItems);

        $scope.totalPrice = 0;
        $scope.totalShipping = 0;

        $scope.shoppingCartItems = shoppingCartItems;
        $rootScope.shoppingCartCount = 0;

        angular.forEach($scope.shoppingCartItems, function(value) {
            angular.forEach(value.products, function(product) {
                $scope.totalPrice =  +$scope.totalPrice +  (+product.price * +product.quantity);
                //$scope.totalShipping = +$scope.totalShipping + +product.shippingCharge;
            });//alert(value.products.length);
            $rootScope.shoppingCartCount = +$rootScope.shoppingCartCount + +value.products.length;
        });

        $rootScope.isShoppingCartEmpty = !($scope.shoppingCartItems != null && $scope.shoppingCartItems.length > 0);
    });

    $scope.GetCaptions = function(id)
        {
           
            $http.get(PATHS.api_url + 'admin/'+ $cookieStore.get('userId')  +'/'+ id +'/getscreenfields').
            success(function (data, status, headers, config)
            {
                console.log(data);
                $scope.TopMenuCaptions = data.data;
            }).error(function (data)
            {
                console.log(data);
            });
        }
    $scope.GetCaptions(1);

    $scope.getCartProducts = function(){
           var cart_data = { user_id : $cookieStore.get('userId') };
           $http.post(PATHS.api_url + 'cart/getcart', cart_data)
            .success(function(response){
                console.log(response);
                localStorageService.clearAll();
                localStorageService.set('shoppingCartItems', response);
                $rootScope.$broadcast('shoppingCartItems', {message: response});
            }).error(function (response) {
                console.log(response);
            });
        }
        
    if($cookieStore.get('userId'))
    {   
        $scope.getCartProducts();
    }

});
