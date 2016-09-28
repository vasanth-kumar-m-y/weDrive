/**
 * Created by devcert on 12/01/15.
 */
'use strict';

evezownApp
    .controller('AdminListUsers',
    function AdminUsers($scope, $http,$routeParams, PATHS, usSpinnerService, ngTableParams,$location,$rootScope,$cookieStore)
    {
        
        $scope.title = "Driver Registration";
        $scope.service_url = PATHS.api_url;
        usSpinnerService.spin('spinner-1');
        $scope.getUser = [];
        $scope.userPagination = {};

        $scope.updateDriverInfo = function(user)
        { 
            $location.path('updateDriverDetails/'+user.id);
        }
        
        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentUserPage);
            $scope.GetUserPagination();
        };

        $scope.maxSize = 10;
        $scope.currentUserPage = 1;

        $scope.GetUserPagination = function () {
        	$http.get(PATHS.api_url + 'admin/getAllDrivers?page='+$scope.currentUserPage).
            success(function(data) {
                    console.log(data);
                    $scope.getUser = data.data;
                    usSpinnerService.stop('spinner-1');
                    $scope.userPagination = data.meta.pagination;
                }).then(function () {

                });
        }
       $scope.GetUserPagination();
        
     /*  <uib-pagination ng-show="getUser.length > 0" total-items="userPagination.total"
           ng-model="currentUserPage"
           max-size="maxSize"
           class="pagination-custom pagination-sm pull-right"
           boundary-links="true"
           rotate="false"
           num-pages="numPages"
           ng-change="pageChanged()">
</uib-pagination>*/
       
       
       
        /**
         * This method is used to block, unblock,activate or delete a user.
         */
        $scope.userAction = function (userId) {
        	var actionConfirn = true;
        	
        	actionConfirn = confirm("Are you sure you want to delete the driver?");
        	
        	
        	if(actionConfirn){
        				usSpinnerService.spin('spinner-1');
        				$http.post(PATHS.api_url + 'admin/deleteDriver'
                         , {
                             data: {
                                 user_id: userId
                             },
                             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                         }).success(function (data, status, headers, config) {
                             toastr.success(data.message);
                             usSpinnerService.stop('spinner-1');
                             //$location.path('');
                         }).error(function (data) {
                             usSpinnerService.stop('spinner-1');
                             toastr.error(data.error.message);
                         }).then(function(data){
                        	 $scope.GetUserPagination();
                         });
        	}
        }

});

evezownApp
    .controller('AdminAddUser',
        function ($scope, $http,$routeParams, PATHS, usSpinnerService,$location,$cookieStore)
        {

            $scope.title = "Driver Registration";
            usSpinnerService.spin('spinner-1');
            $scope.master = {};
            

            $scope.saveUserInfo= function (user) {
                $scope.master = angular.copy(user);

                if (!$scope.master.firstname) {
                    toastr.error("Please enter the first name", 'Registration');
                }
                else if (!$scope.master.phonenumber) {
                    toastr.error("Please enter the phone number", 'Registration');
                }
                else if (!$scope.master.licenceno) {
                    toastr.error("Please enter the licence number", 'Registration');
                }
                else if (!$scope.master.cartype) {
                    toastr.error("Please enter the car type", 'Registration');
                }
                else if (!$scope.master.address1) {
                    toastr.error("Please enter the address 1", 'Registration');
                }
                else if (!$scope.master.city) {
                    toastr.error("Please enter the city", 'Registration');
                }
                else if (!$scope.master.pincode) {
                    toastr.error("Please enter the pincode", 'Registration');
                }
                else if (!$scope.master.state) {
                    toastr.error("Please enter the state", 'Registration');
                }
                else if (!$scope.master.country) {
                    toastr.error("Please enter the country", 'Registration');
                }
                else {
                    usSpinnerService.spin('spinner-1');
                   $http.post(PATHS.api_url + 'admin/addNewDriver'
                        , {
                            data: {
                                firstname: $scope.master.firstname,
                                lastname: $scope.master.lastname,
                                email: $scope.master.emailId,
                                phonenumber: $scope.master.phonenumber,
                                licenceno: $scope.master.licenceno,
                                cartype: $scope.master.cartype,
                                address1: $scope.master.address1,
                                address2: $scope.master.address2,
                                city: $scope.master.city,
                                pincode: $scope.master.pincode,
                                state: $scope.master.state,
                                country: $scope.master.country
                            },
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).success(function (data, status, headers, config) {
                        	toastr.success("Driver registered successfully!", "Registration");
                            usSpinnerService.stop('spinner-1');
                            $location.path('driverlist');

                        }).error(function (data) {
                            usSpinnerService.stop('spinner-1');
                            toastr.error(data.error.message);
                        });
                }
            }
            
            $scope.cancelRegistration = function()
            { 
                $location.path('driverlist');
            }


 });

evezownApp
.controller('UpdateDriverDetails',
    function ($scope, $http,$routeParams, PATHS, usSpinnerService,$location,$cookieStore)
    {
	$scope.master = {};
	var userId = $routeParams.userId;
	fetchPersonalInfo(userId);
	
	function fetchPersonalInfo(userId) {
		 usSpinnerService.spin('spinner-1');
		 $http.get(PATHS.api_url +  'admin/' + userId + '/getDriverDetails')
         .success(function(data){
        	 $scope.master.firstname = data.first_name;
             $scope.master.lastname = data.last_name;
             $scope.master.phonenumber = data.phone_number;
             $scope.master.email = data.email_id;
             $scope.master.licenceno = data.licence_no;
             $scope.master.cartype = data.car_type;
             $scope.master.address1 = data.address.address1;
             $scope.master.address2 = data.address.address2;
             $scope.master.city = data.address.city;
             $scope.master.pincode = data.address.pincode;
             $scope.master.state = data.address.state;
             $scope.master.country = data.address.country;
             $scope.master.driverId = data.id;
             
             usSpinnerService.stop('spinner-1');
         }).error(function(err){
             console.log('Error retrieving the driver derails.');
         });
     }
	 
	 $scope.updateDriverInfo = function ($master) {
         usSpinnerService.spin('spinner-1');
         
         if (!$scope.master.firstname) {
             toastr.error("Please enter the first name", 'Registration');
         }
         else if (!$scope.master.phonenumber) {
             toastr.error("Please enter the phone number", 'Registration');
         }
         else if (!$scope.master.licenceno) {
             toastr.error("Please enter the licence number", 'Registration');
         }
         else if (!$scope.master.cartype) {
             toastr.error("Please select the car type", 'Registration');
         }
         else if (!$scope.master.address1) {
             toastr.error("Please enter the address1", 'Registration');
         }
         else if (!$scope.master.city) {
             toastr.error("Please enter the city", 'Registration');
         }
         else if (!$scope.master.pincode) {
             toastr.error("Please enter the pincode", 'Registration');
         }
         else if (!$scope.master.state) {
             toastr.error("Please enter the state", 'Registration');
         }
         else if (!$scope.master.country) {
             toastr.error("Please enter the country", 'Registration');
         }
         else {
             usSpinnerService.spin('spinner-1');
             $http.post(PATHS.api_url +  'admin/updateDriverInfo'
              , {
                            data: {
                                firstname: $scope.master.firstname,
                                lastname: $scope.master.lastname,
                                email: $scope.master.email,
                                phonenumber: $scope.master.phonenumber,
                                licenceno: $scope.master.licenceno,
                                cartype: $scope.master.cartype,
                                address1: $scope.master.address1,
                                address2: $scope.master.address2,
                                city: $scope.master.city,
                                pincode: $scope.master.pincode,
                                state: $scope.master.state,
                                country: $scope.master.country,
                                driverId: $scope.master.driverId
                            },
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        })
             	.success(function (data, status, headers, config) {
                 	 toastr.success("Driver Details updated successfully!","Registration");
                     usSpinnerService.stop('spinner-1');
                     $location.path('driverlist');

                 }).error(function (data) {
                     usSpinnerService.stop('spinner-1');
                     toastr.error(data.error.message);
                 });
         }
   }
	 $scope.cancelRegistration = function()
     { 
         $location.path('driverlist');
     }
	 
});

evezownApp
.controller('BookingList',
function AdminUsers($scope, $http,$routeParams, PATHS, usSpinnerService, ngTableParams,$location,$rootScope,$cookieStore)
{
    $scope.title = "Drive Request";
    $scope.service_url = PATHS.api_url;
    usSpinnerService.spin('spinner-1');
    $scope.getBookingRequest = [];


    $scope.assignDriver = function(bookingId)
    { 
        $location.path('assignDriver/'+bookingId);
    }

    $scope.getAllDriveRequest = function () {
    	$http.get(PATHS.api_url + 'admin/getAllDriveRequest').
        success(function(data) {
                console.log(data);
                $scope.getBookingRequest = data;
                usSpinnerService.stop('spinner-1');
               /* $scope.userPagination = data.meta.pagination;*/
            }).then(function () {

            });
    }
   $scope.getAllDriveRequest();
 });

evezownApp
.controller('AssignDriver',
function AdminUsers($scope, $http,$routeParams, PATHS, usSpinnerService, ngTableParams,$location,$rootScope,$cookieStore)
{
    $scope.title = "Assign Driver";
    $scope.service_url = PATHS.api_url;
    usSpinnerService.spin('spinner-1');
    $scope.bookingId = $routeParams.bookingId;
    
    $scope.getActiveDriverList = [];

    $scope.assignDriverForDrive = function(driverId)
    { 
    	$http.post(PATHS.api_url +  'customer/assignDriverForRide'
        , {
              data: {
                  driveId: $scope.bookingId,
                  driverId: driverId
              },
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).
         success(function (data, status, headers, config) {
                usSpinnerService.stop('spinner-1');
                toastr.success("Driver Assigned Successfully","Drive Request");
                $location.path('bookingrequest');	
	     }).error(function (data) {
	        usSpinnerService.stop('spinner-1');
	        toastr.error("Error occured while assigning the Driver.");
	     }).then(function () {

        });
    }

    $scope.getActiveDrivers = function () {
    	$http.get(PATHS.api_url + 'driver/getAllActiveDrivers').
        success(function(data) {
                console.log(data);
                $scope.getActiveDriverList = data;
                usSpinnerService.stop('spinner-1');
               /* $scope.userPagination = data.meta.pagination;*/
            }).then(function () {

            });
    }
   $scope.getActiveDrivers();
 
 });
