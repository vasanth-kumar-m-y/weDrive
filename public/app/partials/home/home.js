/**
 * Created by creativethoughtssystechindiaprivatelimited on 27/12/14.
 */
'use strict';

evezownApp
    .controller('LoginController', function ($scope, $rootScope, $cookieStore, $location, $http, PATHS,
                                             AUTH_EVENTS, AuthService, ngDialog, usSpinnerService, $auth, 
                                             localStorageService, $routeParams, $filter, $controller, StoreService) {
                                                     
      
        $scope.title = "Login to Evezown";


        $scope.credentials =
        {
            username: '',
            password: '',
            remember: ''
        };

        if ($cookieStore.get('remember')) {
            $scope.credentials.email = $cookieStore.get('user');
            $scope.credentials.password = $cookieStore.get('pass');
            $scope.credentials.remember = $cookieStore.get('remember');
        }

        $scope.forgot = function () {
            ngDialog.open({template: 'templateId'});
        }

        //forgot-password - autopopulate the email from the login email field if entered by user
        $scope.email = "";
        $scope.email = document.getElementById('LoginEmail').value;

        $scope.ResetPassword = function()
        {
            if($scope.email)
            {
                $http.post(PATHS.api_url + 'forgotPassword/email'
                , {
                    data: {
                        emailid: $scope.email,
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data){
                    ngDialog.close();
                    ngDialog.open({ template: 'EmailConfirmation' });
                    //toastr.success(data);
                }).error(function (data) {
                    ngDialog.close();
                    toastr.error(data.error.message);
                });
            }
            else
            {
                toastr.error('Please enter your email id.', 'Login');
            }
        }

        $scope.authenticate = function(provider) {
            
          $auth.authenticate(provider)
            .then(function(data) {
                console.log(data);
                AuthService.setUserDetails(data);

                if($cookieStore.get('userId') && localStorageService.length() > 0)
                { 
                    $scope.checkCartProducts();

                }else if($cookieStore.get('userId')){
                    
                    $scope.getCartProducts();   
                    
                } 

            })
            .catch(function(error) {
                console.log(error);
              if (error.error) {
                // Popup error - invalid redirect_uri, pressed cancel button, etc.
                toastr.error(error.error);
              } else if (error.data) {
                // HTTP response error from server
                toastr.error(error.data.message, error.status);
              } else {
                toastr.error(error);
              }
            });
        };


        $scope.login = function (credentials) {
            usSpinnerService.spin('spinner-1');
            if (credentials.remember) {
                $cookieStore.put('user', credentials.email);
                $cookieStore.put('pass', credentials.password);
                $cookieStore.put('remember', credentials.remember);
            }
            else {
                $cookieStore.remove('user');
                $cookieStore.remove('pass');
                $cookieStore.remove('remember');
            }
            AuthService.login(credentials).then(function (user)
            {
                if(user.deleted == 1)
                {
                    toastr.error("Invalid User");
                    usSpinnerService.stop('spinner-1');
                    Session.destroy();
                }
                else if(user.blocked == 1)
                {
                    toastr.error('Your account has been blocked, please contact the administrator');
                    usSpinnerService.stop('spinner-1');
                    Session.destroy();
                }
                else
                {   
                   
                    if($cookieStore.get('userId') && localStorageService.length() > 0)
                    { 
                        $scope.checkCartProducts();

                    }else if($cookieStore.get('userId')){
                        
                        $scope.getCartProducts();   
                        
                    }   
                    
                }
            }, function (res)
            {
                usSpinnerService.stop('spinner-1');
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                toastr.error(res.data.error.message, 'Login');
                $location.path('/login');
            });
        };

        $scope.checkCartProducts = function(){

          var shoppingCartItems = localStorageService.get('shoppingCartItems');
            var cart_data = {
                                cart_contents : shoppingCartItems,
                                user_id       : $cookieStore.get('userId')
                            };
                   
                $http.post(PATHS.api_url + 'cart/checkcart', cart_data)
                .success(function(response){
                    
                    if(response){

                        angular.forEach(response, function (value, key) {
                            
                            var selectedStore = $filter('filter')(shoppingCartItems, {storeId: value.storeId}, true);
                            
                            if (selectedStore.length > 0) {
                                var totalPrice    = 0; 
                                var product_price = 0; 
                                
                                angular.forEach(value.products, function (v, k) {
                                  
                                     var selectedProduct = $filter('filter')(shoppingCartItems, {product_id: v.product_id}, true);
                                     
                                     if (selectedProduct.length == 0) {
                                       
                                        selectedStore[0].products.push(v);
                                        product_price += parseFloat(v.price);
                                        
                                     }
                                });
                                
                                totalPrice =  +selectedStore[0].total_price + (+product_price);
                                selectedStore[0].total_price = totalPrice;
                                
                            }else{
                                 
                                shoppingCartItems.push(value);
                            }

                        });
                  
                    }

                }).then(function (response) {
                    var cart_data = {
                                        cart_contents : shoppingCartItems,
                                        user_id       : $cookieStore.get('userId')
                                    };
                        
                        $http.post(PATHS.api_url + 'cart/addcart', cart_data)
                        .then(function (response) {
                            localStorageService.remove('shoppingCartItems');
                            localStorageService.set('shoppingCartItems', shoppingCartItems);
                            $rootScope.$broadcast('shoppingCartItems', {message: shoppingCartItems});
                            $cookieStore.put('api_key', Session.api_key);
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            toastr.success('Login', 'You have logged in successfully');

                            //Geting profile image of user
                            AuthService.getProfileImage(PATHS.api_url + 'users/' + $cookieStore.get('userId') + '/profile_image/current')
                            .success(function(data) {
                                $rootScope.profileImage = PATHS.api_url + 'image/show/' + data +'/250/250';
                                $rootScope.userId = $cookieStore.get('userId');
                                $rootScope.roleId = $cookieStore.get('userRole');

                                //If user came from create store
                                if($cookieStore.get('FromSource') == "FromCreateStore")
                                {
                                    $location.path("/store/create/step1");
                                    $cookieStore.remove('FromSource');   
                                }
                                //If user come from create campaign
                                else if($cookieStore.get('FromSource') == "FromCreateCampaign")
                                {
                                    if($rootScope.roleId == 1)
                                    {
                                        $location.path("/classifieds/create/step1");
                                        $cookieStore.remove('FromSource');
                                    }
                                    else
                                    {
                                        $location.path('/mystores/'+ $cookieStore.get('userId'));
                                        $cookieStore.remove('FromSource');
                                    }
                                    
                                }
                                //If user come through login
                                else
                                {
                                    $location.path('/mystores/'+ $cookieStore.get('userId'));
                                }      
                            });  
                        });
                
                });
             
        } 

        $scope.getCartProducts = function(){
           var cart_data = { user_id : $cookieStore.get('userId') };
           $http.post(PATHS.api_url + 'cart/getcart', cart_data)
            .success(function(response){
                console.log(response);
                    localStorageService.remove('shoppingCartItems');
                    localStorageService.set('shoppingCartItems', response);
                    $rootScope.$broadcast('shoppingCartItems', {message: response});
            }).then(function (response) {
                $cookieStore.put('api_key', Session.api_key);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                toastr.success('Login', 'You have logged in successfully');

                //Geting profile image of user
                AuthService.getProfileImage(PATHS.api_url + 'users/' + $cookieStore.get('userId') + '/profile_image/current')
                .success(function(data) {
                    $rootScope.profileImage = PATHS.api_url + 'image/show/' + data +'/250/250';
                    $rootScope.userId = $cookieStore.get('userId');
                    $rootScope.roleId = $cookieStore.get('userRole');

                    //If user came from create store
                    if($cookieStore.get('FromSource') == "FromCreateStore")
                    {
                        $location.path("/store/create/step1");
                        $cookieStore.remove('FromSource');   
                    }
                    //If user come from create campaign
                    else if($cookieStore.get('FromSource') == "FromCreateCampaign")
                    {
                        if($rootScope.roleId == 1)
                        {
                            $location.path("/classifieds/create/step1");
                            $cookieStore.remove('FromSource');
                        }
                        else
                        {
                            $location.path('/mystores/'+ $cookieStore.get('userId'));
                            $cookieStore.remove('FromSource');
                        }
                    }
                    //If user come through login
                    else
                    {
                        $location.path('/mystores/'+ $cookieStore.get('userId'));
                    }      
                });  
            });
        }

    });

evezownApp
    .controller('SignupController', function ($scope, $rootScope, $location, AUTH_EVENTS, AuthService, $routeParams) {
        $scope.model = {
            title: "Sign up with Evezown",
            inviteCode: $routeParams.code
        };

        $scope.signupDetails = {
            username: '',
            password: ''
        };

        // function to handle submitting the form
        // Request an invite
        $scope.signup = function (signupDetails) {

            // save the comment. pass in comment data from the form
            // use the function we created in our service
            AuthService.signup(signupDetails)
                .success(function (data) {
                    $scope.inviteResponse = data.error.status_code;
                    toastr.success(data.error.message, 'Signup');
                    console.log(data);
                    $location.path('/home');
                })
                .error(function (data) {
                    toastr.error(data.error.message, 'Signup');
                    console.log(data);
                });
        };
    });

evezownApp
    .controller('HomeController', function ($rootScope, $scope, AuthService, $cookieStore, ArticleService, $http, PATHS, $location) {
        $scope.caption = true;
        $scope.carouselTitle = "Evezown";
        $scope.Role = $cookieStore.get('userRole');
        //  $rootScope.isLoggedIn = AuthService.isLoggedIn();
        $scope.CompletedEvent = function (scope) {
            console.log("Completed Event called");
        };

        $scope.ExitEvent = function (scope) {
            console.log("Exit Event called");
        };

        $scope.ChangeEvent = function (targetElement, scope) {
            console.log("Change Event called");
            console.log(targetElement);  //The target element
            console.log(this);  //The IntroJS object
        };

        $scope.BeforeChangeEvent = function (targetElement, scope) {
            console.log("Before Change Event called");
            console.log(targetElement);
        };

        $scope.AfterChangeEvent = function (targetElement, scope) {
            console.log("After Change Event called");
            console.log(targetElement);
        };

        $scope.IntroOptions = {
            steps: [
                {
                    element: '#step1',
                    intro: "Welcome to Evezown, If you don't have an account please request for an invite to sign up"
                },
                {
                    element: '#step2',
                    intro: 'This is an Ecommerce marketplace for showcasing products and business services on our ' +
                    'five key categories. If you are already in business or intend to start one, you can create your ' +
                    'store, Ads & Campaigns.',
                    position: 'bottom'
                },
                {
                    element: '#step3',
                    intro: "This is resourcing platform. If you are in business, you can use it for hiring talent.",
                    position: 'bottom'
                },
                {
                    element: '#step4',
                    intro: "Create store under available subscription types: Free, Premium and Customized",
                    position: 'bottom'
                },
                {
                    element: '#step5',
                    intro: "Create your own advert to promote your bisuness and services through ads & campaigns",
                    position: 'bottom'
                },
                {
                    element: '#step6',
                    intro: "<div class='tour-step'><b><h3>Thankyou</h3></b>" +
                    "</div>"
                    
                }
            ],
            showStepNumbers: false,
            exitOnOverlayClick: true,
            exitOnEsc: true,
            nextLabel: '<strong>NEXT!</strong>',
            prevLabel: '<span style="color:green">Previous</span>',
            skipLabel: 'Exit',
            doneLabel: 'Exit'
        };

        $scope.ShouldAutoStart = false;


        $scope.GetCaptions = function(id)
        {
           
            $http.get(PATHS.api_url + 'admin/'+ $cookieStore.get('userId')  +'/'+ id +'/getscreenfields').
            success(function (data, status, headers, config)
            {
                console.log(data);
                $rootScope.LandingCaptions = data.data;
                $rootScope.VideoPartialCaptions = data.data;
            }).error(function (data)
            {
                console.log(data);
            });
        }
        $scope.GetCaptions(3);

        $scope.accessCtrl =  function()
        {
            toastr.info("You should have Business subscription to access this feature");
        }

        $scope.Create_Campaign = function()
        {
            
            $scope.loggedInUserId = $cookieStore.get('userId');

            if($scope.loggedInUserId)
            {
                $location.path("/classifieds/create/step1");
            }
            else
            {
                $cookieStore.put('FromSource', "FromCreateCampaign");
                $location.path("/login");
            }
        }

    });

evezownApp.controller('HomeProductMenuController', function ($rootScope, $scope, $location, EvezplaceHomeService, $routeParams) {

    $scope.initialLoadIndex = 0;
    $scope.currentIndex = 0;
    $rootScope.categories = [];
    $scope.productNavLinks = [{
        Title: 'Product',
        LinkText: 'Stores'
    }, {
        Title: 'Services',
        LinkText: 'Business'
    }, {
        Title: 'Product + Services',
        LinkText: 'Store/Business'
    }, {
        Title: 'Ads & Campaigns',
        LinkText: 'Ads & Campaigns'
    }];

    $scope.navClass = function (page) {

        var currentRoute = $scope.productNavLinks[$scope.currentIndex].Title;
        return page === currentRoute ? 'active' : '';
    };

    $scope.GetIndex = function (index) {
        if (index === 0) {
            $scope.currentSection = 3;
        }
        if (index === 1) {
            $scope.currentSection = 4;
        }
        if (index === 2) {
            $scope.currentSection = 6;
        }
        if (index === 3) {
            $scope.currentSection = 5;
        }
        $scope.currentIndex = index;
        EvezplaceHomeService.getCategories($scope.currentSection)
            .then(function (data) {
                $rootScope.categories = data;
            });
    }
    $scope.GetIndex($scope.initialLoadIndex);
});


evezownApp
    .controller('BlogsEventsDiscussionsCtrl', function ($scope, ArticleService, BlogService, EventService, ForumService, $http, $cookieStore, PATHS) {


        $scope.imagePath = PATHS.api_url + 'image/show/';

        // Fetch all blogs items
        function fetchRelatedBlogs() {//alert('vas');
            BlogService.getTrendingBlogs(3).then(function (data) {

                $scope.relatedBlogs = data;
            });
        }

        // Fetch all news items
        function fetchRelatedEvents() {
            EventService.getTrendingEvents(3).then(function (data) {

                $scope.relatedEvents = data;
            });
        }

        // Fetch all news items
        function fetchRelatedForums() {
            ForumService.getTrendingForums(3).then(function (data) {

                $scope.relatedForums = data;
            });
        }

        
        fetchRelatedBlogs();

        fetchRelatedEvents();

        fetchRelatedForums();

    });



evezownApp
    .controller('ArticlesNewsInterviewsCtrl', function ($scope, ArticleService, BlogService, EventService, ForumService, $http, $cookieStore, PATHS) {

        $scope.isShowMoreVideos = false;


        // Fetch all news items
        function fetchHomeNews() {
            ArticleService.getHomeNews().then(function (data) {

                $scope.news = data;
            });
        }

        // Fetch all home articles
        function fetchHomeArticles() {
            ArticleService.getHomeArticles().then(function (data) {

                $scope.articles = data;
            });
        }

        function fetchHomeInterviews() {
            ArticleService.getHomeInterviews().then(function (data) {

                $scope.interviews = data;
            });
        }

        function fetchVideos() {

            if ($scope.isShowMoreVideos == false) {
                ArticleService.getTopVideos().then(function (data) {

                    $scope.videos = data;
                });
            }
            else {
                ArticleService.getMoreVideos().then(function (data) {

                    $scope.videos = data;
                });
            }
        }


        // Show more video click toggle
        $scope.showMoreVideos = function () {
            // Set the toggle value of bool on click. (if true, set to false and vice-versa)
            $scope.isShowMoreVideos = !$scope.isShowMoreVideos;

            fetchVideos();
        }

        fetchHomeNews();

        fetchHomeArticles();

        fetchHomeInterviews();

        fetchVideos();
    });






