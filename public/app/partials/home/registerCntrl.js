'use strict';

evezownApp
    .controller('registerCtrl',
    function registerUser($scope, $http, PATHS,$location,usSpinnerService, $routeParams, inviteService)
    {
        $scope.title = "Register";
        $scope.master = {};

        $scope.inviteCode = $routeParams.code;

        function fetchInvite(code) {
            inviteService.getInvite(code).then(function(data){
                $scope.master.firstname = data.name;
                $scope.master.lastname = data.surname;
                $scope.master.emailId = data.email;
                $scope.master.code = data.code;
                $scope.master.referrer_email = data.referrer_email;
                $scope.apply();
            });
        }

        fetchInvite($routeParams.code);

        $scope.RegisterUser = function (user)
        {
            var Check1 = /^(?=.*\d)[A-Za-z0-9\W_]{7,20}$/; /*Atleast one digit*/
            var Check2 = /^(?=.*[A-Z])[A-Za-z0-9\W_]{7,20}$/; /*Atleast one Uppercase*/
            var Check3 = /^(?=.*[\W_])[A-Za-z0-9\W_]{7,20}$/; /*Atleast one Special character*/
            var Check4 = /^(?=.*\d)[0-9]{7,20}$/; /*Only Numbers*/
            var Check5 = /^(?=.*[\W_])[\W_]{7,20}$/; /*Only Special Characters*/

            $scope.master = angular.copy(user);
            if(!$scope.master.emailId)
            {
                toastr.error("Please enter a valid email id", 'Register');
            }
            else if(!$scope.master.firstname)
            {
                toastr.error("Please enter firstname", 'Register');
            }
            else if(!$scope.master.lastname)
            {
                toastr.error("Please enter a surname", 'Register');
            }
            else if(!$scope.role)
            {
                toastr.error("Please select a member type", 'Register');
            }
            else if(!$scope.master.password)
            {
                toastr.error("Password cannot be empty", 'Register');
            }
            else if(!$scope.master.cpassword)
            {
                toastr.error("Password cannot be empty", 'Register');
            }
            else if(!$scope.master.password.trim())
            {
                toastr.error("Password cannot be empty", 'Register');
            }
            else if(!$scope.master.cpassword.trim())
            {
                toastr.error("Password cannot be empty", 'Register');
            }
            else if($scope.master.password != $scope.master.cpassword)
            {
                toastr.error("Password mismatch", 'Register');
            }
            else if(!$scope.master.phone)
            {
                toastr.error("Please enter phone number", 'Register');
            }
            else if(!$scope.master.tandc)
            {
                toastr.error("Please accept the terms and conditions", 'Register');
            }
            else if(!$scope.master.code)
            {
                toastr.error("Please enter a registration code", 'Register');
            }
            else if((Check1.test($scope.master.password) || Check2.test($scope.master.password) || Check3.test($scope.master.password)) && (!Check4.test($scope.master.password) && !Check5.test($scope.master.password)))
            {
               usSpinnerService.spin('spinner-1');
                $http.post(PATHS.api_url + 'signup'
                    ,{
                        data :
                        {
                            firstname : $scope.master.firstname,
                            lastname : $scope.master.lastname,
                            email : $scope.master.emailId,
                            password : $scope.master.password,
                            code : $scope.master.code,
                            referrer : $scope.master.referrer_email,
                            phone : $scope.master.phone,
                            role : $scope.role
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
                    success(function (data, status, headers, config)
                    {
                        toastr.success(data.message, 'Register');
                        usSpinnerService.stop('spinner-1');

                        //Auto friend implementation
                        $http.post(PATHS.api_url + 'users/autofriend'
                        ,{
                        data :
                        {
                            UserID : data.UserID,
                            referrer : $scope.master.referrer_email
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
                        success(function (data, status, headers, config)
                        {
                            //toastr.success(data.message, 'AutoFriend');
                        });
                        $location.path("/login");

                    }).error(function (data)
                    {
                        usSpinnerService.stop('spinner-1');
                        toastr.error(data.error.message, 'Register');
                    });

                    
            }
            else
            {
               toastr.error("Password too weak", 'Register');
            }
        }
    }

);/**
 * Created by devcert on 14/01/15.
 */

evezownApp.factory('inviteService', ['$http', '$q', 'PATHS' ,function ($http, $q, PATHS){
    function getInvite (code) {
        var deferred = $q.defer();
        $http.get(PATHS.api_url +  'invite/' + code)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error retrieving invite');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    return {
        getInvite: getInvite
    };
}]);
