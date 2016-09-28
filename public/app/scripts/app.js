/**
 * Created by creativethoughtssystechindiaprivatelimited on 27/12/14.
 */
'use strict';

var evezownApp = angular.module('evezownapp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ui.router', 'ngCookies',
    'angularSpinner', 'angularFileUpload', 'timeRelative', 'bootstrapLightbox',
    'facebook', 'ngLinkedIn', 'ngDialog', 'satellizer', 'oitozero.ngSweetAlert',
    'textAngular', 'nsPopover', 'videosharing-embed', 'ui.bootstrap.datetimepicker',
    'google.places', 'ngTagsInput', 'angular-flexslider', 'daterangepicker', 'ngTable',
    'socialLinks', 'colorpicker.module', 'angular-intro', 'ngFabForm', 'ngMessages', 'ngSanitize',
    'ngFileUpload', '720kb.socialshare', 'Firestitch.angular-counter','angular-hmac-sha512','slick', 'readMore', 'LocalStorageModule']);
evezownApp.config(function ($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider,
                            USER_ROLES, LightboxProvider, $httpProvider, FacebookProvider,
                            $linkedInProvider, $authProvider, PATHS, ngDialogProvider, $crypthmacProvider, localStorageServiceProvider) {
        
	
		 <!-- Rit Starts here -->
			 $routeProvider
				       .when('/', {
			       templateUrl: 'partials/admin/home.html'
			   });
			 
		     $routeProvider
			       .when('/driverlist', {
		         templateUrl: 'partials/admin/driverList.html',
		         controller: 'AdminListUsers'
		     });
		     
	        $routeProvider
	        .when('/driverRegistration', {
	            templateUrl: 'partials/admin/driverRegistration.html',
	            controller: 'AdminAddUser'
	        });
	        
	        $routeProvider
            .when('/updateDriverDetails/:userId', {
                templateUrl: 'partials/admin/updateDriverDetails.html',
                controller: 'UpdateDriverDetails'
            });
	        
	        $routeProvider
            .when('/assignDriver/:bookingId', {
                templateUrl: 'partials/admin/assignDriver.html',
                controller: 'AssignDriver'
            });
	        
	        $routeProvider
            .when('/bookingrequest', {
                templateUrl: 'partials/admin/bookingRequest.html'
            });
	        
	        $routeProvider
            .when('/report', {
                templateUrl: 'partials/admin/reports.html'
            });
	        
	     <!-- Ends here -->
 
		/*$routeProvider

            .when('/admin', {
                templateUrl: 'partials/admin/home.html',
                controller: 'AdminInviteCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel):/);

        $routeProvider
            .when('/comments', {
                templateUrl: 'partials/Woice Comments/woicecomments.html',
                controller: 'woiceCommentsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });
        $routeProvider

            .when('/admin/users/:index', {
                templateUrl: 'partials/admin/users.html',
                controller: 'AdminListUsers',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/AdminInviteFrnds', {
                templateUrl: 'partials/admin/AdminInviteFrnds.html',
                controller: 'AdminInviteFrndsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/admin/blog', {
                templateUrl: 'partials/admin/blog.html',
                controller: 'bloglists',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/editblogs/:blog_id', {
                templateUrl: 'partials/admin/EditBlogs.html',
                controller: 'EditBlogsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });


        $routeProvider

            .when('/admin/groups', {
                templateUrl: 'partials/admin/groups.html',
                controller: 'bloglists',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/events', {
                templateUrl: 'partials/admin/events.html',
                controller: 'eventlists',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/editevents/:event_id', {
                templateUrl: 'partials/admin/edit-event-details.html',
                controller: 'eventlists',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        



        $routeProvider

            .when('/admin/forums', {
                templateUrl: 'partials/admin/forums.html',
                controller: 'forumlists',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/album', {
                templateUrl: 'partials/admin/album.html',
                controller: 'albums',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/albums', {
                templateUrl: 'partials/admin/albums.html',
                controller: 'albums',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/albums/details/:album_id', {
                templateUrl: 'partials/admin/album-details.html',
                controller: 'albums',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/album-image-comments', {
                templateUrl: 'partials/admin/album-image-comments.html',
                controller: 'albums',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });


        $routeProvider

            .when('/admin/store', {
                templateUrl: 'partials/admin/store.html',
                controller: 'storelist',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });
        
        $routeProvider

        .when('/admin/store_contract', {
            templateUrl: 'partials/admin/store_contract.html',
            controller: 'storelist',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
            }
        });

        $routeProvider

            .when('/admin/opportunities', {
                templateUrl: 'partials/admin/opportunities.html',
                controller: 'opportunitiesCntr',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/woice', {
                templateUrl: 'partials/admin/woice.html',
                controller: 'woiceinf',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/logs', {
                templateUrl: 'partials/admin/logs.html',
                controller: 'logsinf',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/woiceflag', {
                templateUrl: 'partials/admin/woiceflag.html',
                controller: 'woiceFlagCntr',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/addbrand', {
                templateUrl: 'partials/admin/addbrand.html',
                controller: 'addBrandCntr',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/newsletter', {
                templateUrl: 'partials/admin/newsletter.html',
                controller: 'AdminListUsers',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/evezplace/promotion', {
                templateUrl: 'views/admin/evezplace/manage_promotion.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/manage/screens', {
                templateUrl: 'partials/admin/Manage/screens.html',
                controller: 'adminScreenCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/manage/categories', {
                templateUrl: 'partials/admin/Manage/edit_categories.html',
                controller: 'editCategoriesCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/manage/configurations', {
                templateUrl: 'partials/admin/Manage/configurations.html',
                controller: 'adminConfigurationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/evezplace/recommendations', {
                templateUrl: 'views/admin/evezplace/manage_recommendations.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

    $routeProvider

            .when('/admin/evezplace/trending', {
                templateUrl: 'views/admin/evezplace/manage_trending_items.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/newsletterTemplate', {
                templateUrl: 'partials/admin/newsletterTemplate.html',
                controller: 'NewsletterCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/addbrand', {
                templateUrl: 'partials/admin/addbrand.html',
                controller: 'getAllBrandCntr',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider

            .when('/admin/articles', {
                templateUrl: 'partials/admin/articles/articles_news_interviews_tab.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider
            .when('/admin/store/:storeId/manage/admin_store_front', {
                templateUrl: 'partials/admin/Manage/store_front.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider
            .when('/admin/store/:storeId/manage/admin_store_promotion', {
                templateUrl: 'partials/admin/Manage/store_promotion.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider
            .when('/admin/store/:storeId/manage/admin_stock_management', {
                templateUrl: 'partials/admin/Manage/stock_management.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider
            .when('/admin/store/:storeId/manage/admin_commerce_engine', {
                templateUrl: 'partials/admin/Manage/commerce_engine.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider
            .when('/admin/store/:storeId/manage/admin_product_catalogue', {
                templateUrl: 'partials/admin/Manage/product_catalog.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });
        
        $routeProvider
            .when('/admin/store/:storeId/manage/admin_analytics', {
                templateUrl: 'partials/admin/Manage/admin_store_analytics.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider
            .when('/admin/store/:storeId/manage/admin_orders', {
                templateUrl: 'partials/admin/Manage/orders.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });


        $routeProvider
            .when('/admin/store/:storeId/manage/admin_store_selection', {
                templateUrl: 'partials/admin/Manage/store_selection_contract.html ',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });


        $routeProvider
            .when('/admin/store/:storeId/manage/admin_store_info', {
                templateUrl: 'partials/admin/Manage/store_info.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider
            .when('/admin/store/:storeId/manage/admin_store_front_footer', {
                templateUrl: 'partials/admin/Manage/store_front_footer.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });

        $routeProvider
            .when('/admin/store/:storeId/manage/admin_store_crm', {
                templateUrl: 'partials/admin/Manage/store_crm.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator]
                }
            });


        $routeProvider

            .when('/redirectHome', {
                templateUrl: 'partials/evezplace/home.html',
                controller: 'HomeController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/', {
                templateUrl: 'partials/evezplace/home.html',
                controller: 'HomeController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        
       
        $routeProvider

            .when('/home', {
                templateUrl: 'partials/evezplace/home.html',
                controller: 'HomeController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/login', {
                templateUrl: 'partials/home/login.html',
                controller: 'LoginController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/signup/:code', {
                templateUrl: 'partials/home/signup.html',
                controller: 'registerCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/reset_password/:Code', {
                templateUrl: 'partials/home/reset_password.html',
                controller: 'ResetPassword',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/reset_confirmation', {
                templateUrl: 'partials/home/reset_confirmation.html',
                controller: 'ResetPassword',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/profile/:id/change_password', {
                templateUrl: 'partials/profile/details/change_password.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/woice', {
                templateUrl: 'partials/Trending/trending.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/evezplace', {
                templateUrl: 'partials/evezplace/home.html',
                controller: 'EvezplaceController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/aboutus', {
                templateUrl: 'partials/staticpages/aboutus.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/careers', {
                templateUrl: 'partials/staticpages/careers.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/contactus', {
                templateUrl: 'partials/staticpages/contactus.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/contribute', {
                templateUrl: 'partials/staticpages/contribute.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/advertisement', {
                templateUrl: 'partials/staticpages/advertise.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/privacy', {
                templateUrl: 'partials/staticpages/privacy.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/terms', {
                templateUrl: 'partials/staticpages/terms.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/services', {
                templateUrl: 'partials/evezplace/services.html',
                controller: 'EvezplaceController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/evezownfaq', {
                templateUrl: 'partials/staticpages/evezownfaq.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/woicefaq', {
                templateUrl: 'partials/staticpages/woicefaq.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/productServices', {
                templateUrl: 'partials/evezplace/products_services.html',
                controller: 'EvezplaceController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/classifieds', {
                templateUrl: 'partials/evezplace/classifieds.html',
                controller: 'EvezplaceController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/wopportunity', {
                templateUrl: 'partials/wopportunity/home.html',
                controller: 'WopportunityController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/trending', {
                templateUrl: 'partials/Trending/trending.html',
                controller: 'trending',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/community', {
                templateUrl: 'partials/Community/community.html',
                controller: 'community',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/friends/invite', {
                templateUrl: 'partials/Community/invitefriends.html',
                controller: 'community',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/invitehistory', {
                templateUrl: 'partials/Community/invitehistory.html',
                controller: 'community',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/advertise', {
                templateUrl: 'partials/Community/advertise.html',
                controller: 'community',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/circles', {
                templateUrl: 'partials/Community/circles.html',
                controller: 'circles',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/manage/database', {
                templateUrl: 'partials/Community/managedatabase.html',
                controller: 'circles',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/albums', {
                templateUrl: 'partials/Community/albums.html',
                controller: 'albums',
                access: {allowAnonymous: false},
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/albumimagecomments/:album_id/:image_id', {
                templateUrl: 'partials/Community/album-image-comments.html',
                controller: 'albums',
                access: {allowAnonymous: false},
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/albumimagecomments/:album_id/:image_id/:id', {
                templateUrl: 'partials/Community/album-image-comments.html',
                controller: 'albums',
                access: {allowAnonymous: false},
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/myalbums/:id', {
                templateUrl: 'partials/profile/myAlbum.html',
                controller: 'albums',
                access: {allowAnonymous: false},
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/myalbumdetails/:album_id/:id', {
                templateUrl: 'partials/profile/myalbum-details.html',
                controller: 'albums',
                access: {allowAnonymous: false},
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/mydiscussion/:id', {
                templateUrl: 'partials/profile/mydiscussion.html',
                controller: 'forums',
                access: {allowAnonymous: false},
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/events', {
                templateUrl: 'partials/Community/events.html',
                controller: 'community',
                access: {allowAnonymous: true},
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/forums', {
                templateUrl: 'partials/Community/forums.html',
                controller: 'community',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/forums/:forumid', {
                templateUrl: 'partials/Community/forum-details.html',
                controller: 'forums',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/forums/:forumid/:id', {
                templateUrl: 'partials/Community/forum-details.html',
                controller: 'forums',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/groups', {
                templateUrl: 'partials/Community/groups.html',
                controller: 'community',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/articles/1', {
                templateUrl: 'partials/articles/article1.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/articles/2', {
                templateUrl: 'partials/articles/article2.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/articles/3', {
                templateUrl: 'partials/articles/article3.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/articles/4', {
                templateUrl: 'partials/articles/article4.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/articles/5', {
                templateUrl: 'partials/articles/article5.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/blogs', {
                templateUrl: 'partials/Community/blogs.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/myblogs/:id', {
                templateUrl: 'partials/profile/myBlog.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/editblog/:blog_id', {
                templateUrl: 'partials/Community/EditBlog.html',
                controller: 'EditBlogCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/editmyblog/:id', {
                templateUrl: 'partials/profile/editblog.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/blogs/details/:id', {
                templateUrl: 'partials/profile/myBlog-details.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/blogs/:blog_id', {
                templateUrl: 'partials/Community/blog-details.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/blogs/:blog_id/:id', {
                templateUrl: 'partials/Community/blog-details.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/groups/:group_id', {
                templateUrl: 'partials/Community/group-details.html',
                controller: 'groups',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/groups/:group_id/:id', {
                templateUrl: 'partials/Community/group-details.html',
                controller: 'groups',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/mygroups/:id', {
                templateUrl: 'partials/profile/mygroup.html',
                controller: 'groups',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/myevents/:id', {
                templateUrl: 'partials/profile/myevent.html',
                controller: 'eventCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/mylisting/:id', {
                templateUrl: 'partials/profile/mylisting.html',
                controller: 'profileCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/mystores/:id', {
                templateUrl: 'partials/profile/mystores.html',
                controller: 'profileCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/buyHistory/:id', {
                templateUrl: 'partials/profile/buyHistory.html',
                controller: 'orderCtrl',
            });

        $routeProvider

            .when('/profile/:id/personalinfo', {
                templateUrl: 'partials/profile/details/home.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/profile/:id/enhance', {
                templateUrl: 'partials/profile/details/enhance.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/profile/:id/other', {
                templateUrl: 'partials/profile/details/other.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/profile/partnering', {
                templateUrl: 'partials/profile/details/partnering.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/profile/favorites', {
                templateUrl: 'partials/profile/details/favorites.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/profile/feedback', {
                templateUrl: 'partials/profile/details/feedback.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/profile/:id/participation', {
                templateUrl: 'partials/profile/details/participation.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        //profile/participation
        $routeProvider

            .when('/profile/:id/reference', {
                templateUrl: 'partials/profile/details/reference.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        //#profile/myonline
        $routeProvider

            .when('/profile/:id/myonline', {
                templateUrl: 'partials/profile/details/online.html',
                controller: 'profileDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/groups/activities/:id/:actId/:isProfile', {
                templateUrl: 'partials/Community/activity-details.html',
                controller: 'activity',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/createblogs', {
                templateUrl: 'partials/Community/createblog.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/createmyblogs', {
                templateUrl: 'partials/profile/createblog.html',
                controller: 'blogCntrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/createevent', {
                templateUrl: 'partials/Community/create-event.html',
                controller: 'eventCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/editevent/:event_id', {
                templateUrl: 'partials/Community/edit-event-details.html',
                controller: 'eventCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/eventdetails/:event_id', {
                templateUrl: 'partials/Community/event-details.html',
                controller: 'eventCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/eventdetails/:event_id/:id', {
                templateUrl: 'partials/Community/event-details.html',
                controller: 'eventCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/circle/details/:circle_id', {
                templateUrl: 'partials/Community/circle-details.html',
                controller: 'circles',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/albums/details/:album_id', {
                templateUrl: 'partials/Community/album-details.html',
                controller: 'albums',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/streamit', {
                templateUrl: 'partials/Trending/trending.html',
                controller: 'trending',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/search/advanced', {
                templateUrl: 'partials/search/advancedSearch.html',
                controller: 'searchController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }

            });
        $routeProvider

            .when('/requestinvite', {
                templateUrl: 'partials/invite/requestinvite.html',
                controller: 'inviteController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/profile/:id', {
                templateUrl: 'partials/profile/home.html',
                controller: 'profileCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/profile/myprofile/:id', {
                templateUrl: 'partials/profile/profileSummary.html',
                controller: 'profileCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/whatdoiget', {
                templateUrl: 'partials/evezplace/whatdoiget.html',
                controller: 'StoreInfoController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user,USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/typeofstores', {
                templateUrl: 'partials/evezplace/typeofstores.html',
                controller: 'StoreInfoController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user,USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/faq', {
                templateUrl: 'partials/evezplace/faq.html',
                controller: 'StoreInfoController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/create/step1', {
                templateUrl: 'partials/evezplace/create_store_step1.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
        $routeProvider

            .when('/store/create/step2', {
                templateUrl: 'partials/evezplace/create_store_step2.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/create/step3', {
                templateUrl: 'partials/evezplace/create_store_step3.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/create/success', {
                templateUrl: 'partials/evezplace/store_creation_success.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/create/step4', {
                templateUrl: 'partials/evezplace/create_store_step4.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/create/step5', {
                templateUrl: 'partials/evezplace/create_store_step5.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/create/step6', {
                templateUrl: 'partials/evezplace/create_store_step6.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/browse', {
                templateUrl: 'partials/evezplace/browse/store/browse.html',
                controller: 'BrowseStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/store/browse/:subcatId', {
                templateUrl: 'partials/evezplace/browse/store/browse.html',
                controller: 'BrowseStoreCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/search/products/:searchKey', {
                templateUrl: 'partials/evezplace/productSearch.html',
                controller: 'SearchProductController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/store/:storeId/manage/store_info', {
                templateUrl: 'partials/evezplace/manage/store/store_info.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:storeId/manage/store_info/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/store_info.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/checkout/:storeId/:checkOutType', {
                templateUrl: 'partials/evezplace/browse/store/place-order.html',
                controller: 'ShoppingCartCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/store/shopping/:storeId/:checkOutType', {
                templateUrl: 'partials/evezplace/browse/store/shopping-cart.html',
                controller: 'ShoppingCartCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/payu/:status/:storeId/:checkOutType', {
                templateUrl: 'partials/evezplace/browse/store/payuPayment.html',
                controller: 'ShoppingCartCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/order-success', {
                templateUrl: 'partials/evezplace/browse/store/order-success.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/store/:id/manage/store_selection/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/store_selection_contract.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/store_front/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/store_front.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/store_crm/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/storecrm.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/store_front_footer/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/storefrontfooter.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/product_catalogue/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/product_catalogue.html',
                controller: 'ManageStoreCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/analytics/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/analytics.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/promotion/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/promotion.html',
                controller: 'CreateStoreController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/commerce_engine/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/commerce_engine.html',
                controller: 'ManageStoreCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });
//click here to know terms and conditions(manage store commerce engine)
            $routeProvider

            .when('/payment_terms_and_condition', {
                templateUrl: 'partials/staticpages/payment_terms_and_condition.html',
                controller: 'ApplicationCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });
        $routeProvider

            .when('/store/:id/manage/stock_management/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/stock_management.html',
                controller: 'ManageStoreCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/orders/:pagesrc', {
                templateUrl: 'partials/evezplace/manage/store/orders/orders.html',
                controller: 'ManageOrdersCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/rfi/:pagesrc', {
                templateUrl: 'views/manage/store/manage_rfi.html',
                controller: 'manageRfiCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id/manage/rfq/:pagesrc', {
                templateUrl: 'views/manage/store/manage_rfq.html',
                controller: 'manageRfqCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/store/:id', {
                templateUrl: 'partials/evezplace/browse/store/store_front.html',
                controller: 'StoreFrontController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/store/:id/:pagesrc', {
                templateUrl: 'partials/evezplace/browse/store/store_front.html',
                controller: 'StoreFrontController',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/store/products/:id', {
                templateUrl: 'partials/evezplace/browse/store/product_detail.html',
                controller: 'ProductDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/store/products/:id/:pagesrc', {
                templateUrl: 'partials/evezplace/browse/store/product_detail.html',
                controller: 'ProductDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });


        $routeProvider

            .when('/classifieds/browse', {
                templateUrl: 'partials/evezplace/browse/classifieds/browse.html',
                controller: 'BrowseClassifiedsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });


        $routeProvider

            .when('/classifieds/:id', {
                templateUrl: 'partials/evezplace/browse/classifieds/classified_details.html',
                controller: 'ClassifiedDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/classifieds/:id/:pagesrc/:view', {
                templateUrl: 'partials/evezplace/browse/classifieds/classified_details.html',
                controller: 'ClassifiedDetailsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
                }
            });

        $routeProvider

            .when('/classified/:id/manage/classified_type', {
                templateUrl: 'partials/evezplace/manage/Classifieds/classified_type.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/classified/:id/manage/classified_info', {
                templateUrl: 'partials/evezplace/manage/Classifieds/classified_info.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/classified/:id/manage/classified_promotion', {
                templateUrl: 'partials/evezplace/manage/Classifieds/classified_promotion.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/classified/:id/manage/classified/rfi', {
                templateUrl: 'partials/evezplace/manage/Classifieds/classified_rfi.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/classifieds/create/step1', {
                templateUrl: 'partials/evezplace/create_classifieds_step1.html',
                controller: 'CreateClassifiedsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });


        $routeProvider

            .when('/classifieds/create/step2', {
                templateUrl: 'partials/evezplace/create_classifieds_step2.html',
                controller: 'CreateClassifiedsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/classifieds/create/step3', {
                templateUrl: 'partials/evezplace/create_classifieds_step3.html',
                controller: 'CreateClassifiedsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider

            .when('/classifieds/create/success', {
                templateUrl: 'partials/evezplace/create_classified_success.html',
                controller: 'CreateClassifiedsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user]
                }
            });

        $routeProvider
            .when('/store/order/buy', {
                templateUrl: 'views/store/buy.html',
            });
        
        $routeProvider
	        .when('/order/success', { 
	           // templateUrl: 'views/buyer/success.php',
	            templateUrl: 'views/buyer/success.html',
	            controller: 'OrdersSuccessCtrl',
	        });


        $routeProvider.when('/buyer/orders', {
            templateUrl: 'views/buyer/orders.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
            }
        });

        $routeProvider.when('/productline/:id/:pagesrc', {
            templateUrl: 'views/store/productline.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.moderator, USER_ROLES.user, USER_ROLES.guest]
            }
        });

        $routeProvider.otherwise({
            redirectTo: '/login'
        });

        localStorageServiceProvider.setPrefix('evezowncart');*/

        /*Stripe.setPublishableKey('pk_test_PkqvWTApkszG3EmDfxFcMHSj');*/

        LightboxProvider.getImageUrl = function (imageUrl) {
            return imageUrl;
        };

        LightboxProvider.getImageUrl = function (image) {
            return PATHS.api_url + 'image/show/' + image;
        };
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        ngDialogProvider.setDefaults({
            //className: 'ngdialog-theme-default',
            //plain: true,
            showClose: true,
            closeByDocument: false,
            closeByEscape: false
        });

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "100",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "500",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        base = PATHS.api_url;
        
        $authProvider.baseUrl = base;

       /* $authProvider.facebook({
          clientId: fbAppId
        });

        $authProvider.google({
          clientId: gmailAppId
        });

        $authProvider.linkedin({
          clientId: linkedinAppId
        });*/


        // Set your appId through the setAppId method or
        // use the shortcut in the initialize method directly.
        //FacebookProvider.init(fbAppId);

        // Set the linkedin api key
        /*$linkedInProvider
            .set('appKey', '78mct0q0l2nefx')
            .set('scope', 'r_basicprofile r_network rw_nus w_messages')
            .set('authorize', true);*/



//        $authProvider.yahoo({
//            clientId: 'dj0yJmk9TXF2b3kxd1oyZ0NXJmQ9WVdrOU4zRmpRa1Z3TjJzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD05Nw--'
//        });
//
//        $authProvider.live({
//            clientId: '000000004C1396AE'
//        });
//
//
//        // Windows Live
//        $authProvider.live({
//            url: '/auth/live',
//            authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
//            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
//            scope: ['wl.basic'],
//            scopeDelimiter: ' ',
//            requiredUrlParams: ['display', 'scope'],
//            display: 'popup',
//            type: '2.0',
//            popupOptions: {width: 500, height: 560}
//        });
//
//
//
//// Yahoo
//        $authProvider.yahoo({
//            url: '/auth/yahoo',
//            authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
//            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
//            scope: [],
//            scopeDelimiter: ',',
//            type: '2.0',
//            popupOptions: {width: 559, height: 519}
//        });
//
//        // OAuth 2.0
//        $authProvider.oauth2({
//            url: null,
//            name: null,
//            scope: null,
//            scopeDelimiter: null,
//            clientId: null,
//            redirectUri: null,
//            popupOptions: null,
//            authorizationEndpoint: null,
//            responseParams: null,
//            requiredUrlParams: null,
//            optionalUrlParams: null,
//            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
//            responseType: 'code'
//        });
//
//// OAuth 1.0
//        $authProvider.oauth1({
//            url: null,
//            name: null,
//            popupOptions: null
//        });

    }
);

evezownApp.config(function (ngFabFormProvider) {
    ngFabFormProvider.extendConfig({
        scrollToAndFocusFirstErrorOnSubmit: false,
        setNovalidate: false
    });
});

//evezownApp.config(function($crypthmacProvider){
//    $crypthmacProvider.setCryptoSecret('mq3ogjpS');
//});
evezownApp.run(function ($rootScope, $location, $anchorScroll) {
    $rootScope.scrollTo = function (id) {
        $location.hash(id);
        $anchorScroll();
    };
});

evezownApp.value('GoogleApp', {
    apiKey: 'AIzaSyBZC8yCNm9bl43LmS5gKgekaTA74VmpN-w',
    clientId: '62262746490-up1dmst6thearkvdqkeji1g6lhj8r7bm.apps.googleusercontent.com',
    scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.google.com/m8/feeds',
        'https://www.googleapis.com/auth/contacts.readonly'
    ]
});

evezownApp
    .run(function ($rootScope, $location, $cookieStore, AUTH_EVENTS, PATHS, $http) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            $http.defaults.useXDomain = true;
            delete $http.defaults.headers.common['X-Requested-With'];
           // var authorizedRoles = next.data.authorizedRoles;
            if ($cookieStore.get('api_key') != undefined) {
                $http.post(PATHS.api_url + 'users/get'
                    , {
                        data: {
                            api_key: $cookieStore.get('api_key')
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).
                success(function (data, status, headers, config) {
                    /*Session.api_key = data.data.api_key;
                    Session.userId = data.data.id;
                    Session.firstname = data.data.firstname;
                    Session.lastname = data.data.lastname;
                    Session.userRole = data.data.role;
                    if (typeof Session.userId != 'undefined') {
                        $rootScope.loggedIn = true;
                        $rootScope.username = data.data.firstname + ', ' + data.data.lastname;
                    }
                    else {
                        if (next.originalPath == '/woice') {
                            $rootScope.loggedIn = false;
                            $location.path("/login");
                        }
                    }*/
                }).error(function (data) {
                    if (next.originalPath == '/woice') {
                        $rootScope.loggedIn = false;
                        $location.path("/home");
                    }
                });
            }
            else {
                /*if (next.data.authorizedRoles.indexOf('Guest') == -1) {
                    $rootScope.loggedIn = false;
                    $location.path("/login");
                }*/
            }

            /*if (!AuthService.isAuthorized(authorizedRoles)) {
                //event.preventDefault();
                // $location.path("/login");
                if (AuthService.isAuthenticated()) {
                    if (AuthService.isLoggedIn) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    }
                }
            }*/


        });
    });


evezownApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

evezownApp.constant('PATHS', {
    api_url: 'http://localhost:8000/v1/'
   
	
});

evezownApp.constant('USER_ROLES', {
    all: '*',
    admin: 'Admin',
    moderator: 'Moderator',
    user: 'User',
    guest: 'Guest'
});

/*evezownApp.constant('GmailCredentials', {
   client_id: gmailAppId
});*/
// Filter



evezownApp.filter('addEllipsis', function () {
    return function (input, scope) {
        if (input.length > 30) {
            // Replace this with the real implementation
            return input.substring(0, 30) + '...';
        }
        else {
            return input;
        }
    }
});

/*evezownApp.module('myApp')
 .filter('to_trusted', ['$sce', function($sce){
 return function(text) {
 return $sce.trustAsHtml(text);
 };
 }]);*/


evezownApp.filter('slice', function () {
    return function (arr, start, end) {
        return (arr || []).slice(start, end);
    };
});

evezownApp.filter('encodeURIComponent', function () {
    return window.encodeURIComponent;
});

/* Directives */

evezownApp.directive('googlePlaces', function () {
    return {
        restrict: 'E',
        replace: true,
        // transclude:true,
        scope: {location: '='},
        template: '<input id="google_places_ac" name="google_places_ac" type="text" class="form-control input-block-level"/>',
        link: function ($scope, elm, attrs) {
            var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                $scope.location = place.address_components;
                $scope.$apply();
            });
        }
    }
});

evezownApp.directive('ngThumb', ['$window', function ($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function (scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({width: width, height: height});
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);

//default option(select) in select box
evezownApp.directive('select', function ($interpolate) {
    return {
        restrict: 'E',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var defaultOptionTemplate;
            scope.defaultOptionText = attrs.defaultOption || 'Select...';
            defaultOptionTemplate = '<option value="" disabled selected style="display: none;">{{defaultOptionText}}</option>';
            elem.prepend($interpolate(defaultOptionTemplate)(scope));
        }
    };
});

//Confrim before delete
evezownApp.directive('ngReallyClick', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    }
}]);

//Add http prefix before in the url input elements
evezownApp.directive('httpPrefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                if(value && !/^(https?):\/\//i.test(value)
                   && 'http://'.indexOf(value) !== 0 && 'https://'.indexOf(value) !== 0 ) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else
                    return value;
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.splice(0, 0, ensureHttpPrefix);
        }
    };
});

//focus to a div element
evezownApp.directive('autofocusWhen', function ($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.autofocusWhen, function(newValue){
                if ( newValue ) {
                    $timeout(function(){
                        element.focus();
                    });
                }
            });
        }
     };
});

//Back button (implemented in breadcrumb - search products)
evezownApp.directive( 'backButton', function() {
    return {
        restrict: 'A',
        link: function( scope, element, attrs ) {
            element.on( 'click', function () {
                history.back();
                scope.$apply();
            } );
        }
    };
});

//custom popovers(implemented in hints - create store)
evezownApp.directive('customPopover', function () {
    return {
        restrict: 'A',
        template: '<span>{{label}}</span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;
            $(el).popover({
                trigger: 'hover',
                html: true,
                content: attrs.popoverHtml,
                placement: attrs.popoverPlacement
            });
        }
    };
});

//Trigger a function on enter key press(implemented in search products - marketplace)
evezownApp.directive('ngEnter', function () {
        return {
           link: function (scope, elements, attrs) {
              elements.bind('keydown keypress', function (event) {
                  if (event.which === 13) {
                      scope.$apply(function () {
                          scope.$eval(attrs.ngEnter);
                      });
                      event.preventDefault();
                  }
              });
           }
        };
    });


evezownApp.directive('sampleCount', function () {
    'use strict';
    var count = 0;

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            return attrs.$observe("afklLazyImageLoaded", function (value) {
                if (window.console) {
                    window.console.log('IMAGE LOADED:', value);
                }
            });
        }
    };
});

evezownApp.directive('slick', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function () {
                $(element).slick(scope.$eval(attrs.slickSlider));
            });
        }
    }
});

//Password strength check
evezownApp.directive('checkStrength', function () {

    return {
        replace: false,
        restrict: 'EACM',
        scope: {model: '=checkStrength'},
        link: function (scope, element, attrs) {
            var strength = {
                colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
                mesureStrength: function (p) {
                    var _force = 0;
                        //var _regex = /[$-/:-?{-~!"^_`\[\]]/g; //" (Commentaire juste lÃ  pour pas pourrir la coloration sous Sublime...)
                        var _regex = /[$\W_]/g;     /* (User Defined regex, the \W allows all special characters)*/
                    var _lowerLetters = /[a-z]+/.test(p);
                    var _upperLetters = /[A-Z]+/.test(p);
                    var _numbers = /[0-9]+/.test(p);
                    var _symbols = _regex.test(p);

                    var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
                    var _passedMatches = $.grep(_flags, function (el) {
                        return el === true;
                    }).length;

                    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                    _force += _passedMatches * 10;

                    // penality (short password)
                    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

                    // penality (poor variety of characters)
                    _force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
                    _force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
                    _force = (_passedMatches == 3) ? Math.min(_force, 40) : _force;

                    return _force;
                },
                getColor: function (s) {
                    var idx = 0;
                    if (s <= 10) {
                        idx = 0;
                    }
                    else if (s <= 20) {
                        idx = 1;
                    }
                    else if (s <= 30) {
                        idx = 2;
                    }
                    else if (s <= 40) {
                        idx = 3;
                    }
                    else {
                        idx = 4;
                    }

                    return {idx: idx + 1, col: this.colors[idx]};
                }
            };

            scope.$watch('model', function (newValue, oldValue) {
                if (!newValue || newValue === '') {
                    element.css({"display": "none"});
                } else {
                    var c = strength.getColor(strength.mesureStrength(newValue));
                    element.css({"display": "inline"});
                    element.children('li')
                        .css({"background": "#DDD"})
                        .slice(0, c.idx)
                        .css({"background": c.col});
                }
            });

        },
        template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'
    };

});
