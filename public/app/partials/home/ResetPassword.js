'use strict';

evezownApp
    .controller('ResetPassword', function ($scope, $http, PATHS,$location,usSpinnerService, $routeParams, inviteService)
    {
        $scope.title = "Evezown Password Assistance";

        $scope.Code = $routeParams.Code;

        $scope.reset = function (Newcredentials)
        {
          $scope.NewPass = Newcredentials.password;
          $scope.Retype = Newcredentials.retypepassword;
         
          var Check1 = /^(?=.*\d)[A-Za-z0-9\W_]{7,20}$/; /*Atleast one digit*/
          var Check2 = /^(?=.*[A-Z])[A-Za-z0-9\W_]{7,20}$/; /*Atleast one Uppercase*/
          var Check3 = /^(?=.*[\W_])[A-Za-z0-9\W_]{7,20}$/; /*Atleast one Special character*/
          var Check4 = /^(?=.*\d)[0-9]{7,20}$/; /*Only Numbers*/
          var Check5 = /^(?=.*[\W_])[\W_]{7,20}$/; /*Only Special Characters*/

          if ($scope.NewPass == undefined || $scope.Retype == undefined)
          {
            toastr.error('All fields are mandatory');
          }
          else if((Check1.test($scope.NewPass) || Check2.test($scope.NewPass) || Check3.test($scope.NewPass)) && (!Check4.test($scope.NewPass) && !Check5.test($scope.NewPass)))
          {
            if($scope.NewPass == $scope.Retype)
            {
              $http.post(PATHS.api_url + 'resetPassword/user'
                  , {
                      data: {
                          Newpassword: $scope.NewPass,
                          Code: $scope.Code
                      },
                      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                  }).success(function(data){
                      //toastr.success(data);
                      $location.path('/reset_confirmation');
                  }).error(function (data) {
                      toastr.error(data);
                  });
            }
            else
            {
              toastr.error('Password change failed. New passwords do not match');
            }
          }
          else
          {
            toastr.error('New password too weak');   
          }
          
        }
    }

);
