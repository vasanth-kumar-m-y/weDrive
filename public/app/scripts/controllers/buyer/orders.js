'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:BuyerOrdersCtrl
 * @description
 * # BuyerOrdersCtrl
 * Controller of the appApp
 */
evezownApp
  .controller('BuyerOrdersCtrl', function ($scope,$http,PATHS,$cookieStore,OrderService,$window,$crypthmac) {
      $scope.orders = [];
      $scope.statuses = [];
      
      //Test Server setting
     /* $scope.MERCHANT_KEY = "504L8L";
      $scope.Merchant_Id = "4932989";
      $scope.SALT = "mq3ogjpS";
      $scope.PAYU_BASE_URL = "https://test.payu.in/_payment";*/
      
      //Production Server setting
      $scope.MERCHANT_KEY = "MtAc0u";
      $scope.Merchant_Id = "5212138";
      $scope.SALT = "09BHBbap";
      $scope.PAYU_BASE_URL = "https://secure.payu.in/_payment";
      
      //$scope.surl = "http://evezown.com/success";
      //$scope.furl = "http://evezown.com/failure";
      $scope.surl = "http://evezown-api-dev.elasticbeanstalk.com/public/paymentstatus/paymentstatus";
      $scope.furl = "http://evezown-api-dev.elasticbeanstalk.com/public/paymentstatus/paymentstatus";
      $scope.loggedInUserId = $cookieStore.get('userId');
      $scope.service_url = PATHS.api_url;
      $scope.usertoken = $cookieStore.get('userToken');
      $scope.encrypttext = "";

      if($scope.loggedInUserId){

       $scope.Tracktitle   = 'Enter order transaction id or email or phone';
       $scope.Trackheading = 'Transaction Id / Email /  Phone';
       $scope.Trackuser    =  $scope.loggedInUserId;

     }else{

       $scope.Tracktitle   = 'Enter order transaction id or buyer code';
       $scope.Trackheading = 'Transaction Id / Buyer code';
       $scope.Trackuser    =  0;

     }

      $scope.GetOrderByBuyer = function (input)
      {
          OrderService.getBuyerOrder(input, $scope.Trackuser).then(function (data)
          {
              $scope.orders = data;
              $scope.GetCurrentStatus();
          });
      }

      $scope.GetCurrentStatus = function()
      {
          $http.get(PATHS.api_url + 'order/status/enums',
              {
                  headers: {'Authorization': 'Bearer ' + $scope.usertoken}
              }).
          success(function (data)
          {
              $scope.statuses = data;
          });
      }

      $scope.CancelOrderItem = function(orderItem,comment,orderId,input)
      {
          OrderService.updateOrderStatus(orderItem.id, '6', comment,orderItem.expected_delivery_date,orderItem.expected_shipping_date,orderId, $scope.usertoken).then(function (data)
          {
              $scope.GetOrderByBuyer(input);
              toastr.success(data.message, 'Store');
          });
      }

      $scope.getHash = function(orderItem,order)
      {
    	  $scope.surl = "http://evezown-api-dev.elasticbeanstalk.com/public/paymentstatus/paymentstatus";
    	  //$scope.surl = "http://evezown-api-dev.elasticbeanstalk.com/public/v1/order/success/posturl"; // (laravel)
    	  $scope.furl = "http://evezown-api-dev.elasticbeanstalk.com/public/paymentstatus/paymentstatus";
          $scope.curl = "http://evezown-api-dev.elasticbeanstalk.com/public/paymentstatus/paymentstatus";
          $scope.udf1 = "";
          $scope.udf2 = "";
          $scope.udf3 = "";
          $scope.udf4 = "";
          $scope.udf5 = "";
          $scope.udf6 = "";
          $scope.udf7 = "";
          $scope.udf8 = "";
          $scope.udf9 = "";
          $scope.udf10 = "";
          $http.post(PATHS.api_url + 'orders/payu/hash'
              , {
                  data:
                  {
                      key:$scope.MERCHANT_KEY,
                      txnid:order.transaction_id,
                      amount:orderItem.price,
                      firstname:order.buyer.code,
                      email : order.buyer.email,
                      phone : order.buyer.phone,
                      productinfo : orderItem.productSku.product.title,
                      surl : $scope.surl,
                      furl :$scope.furl,
                      service_provider : "payu_paisa",
                      salt : $scope.SALT
                  },
                  headers: {'Content-Type': 'application/json'}
              }).
          success(function (data, status, headers, config)
          {
              $scope.encrypttext = data;

          }).error(function (data)
          {

          }).then(function()
          {

          });

      }

      $scope.getProductInfo = function(orderItem)
      {
    	  var productInfo=[{"name": orderItem.productSku.product.title,"value":orderItem.price,"isRequired":"true","settlementEvent": "EmailConfirmation"}];
    	  return angular.toJson(productInfo);
    	
    	  //orderItem.productSku.product;
     	 /* var Productinfo = {"paymentParts":[{
    		  "name":"abc",
    		  "description":"abcd",
    		  "value":"500",
    		  "isRequired":"true",
    		  "settlementEvent" : "EmailConfirmation"
    		  }]};*/
    	  //var payData = '{"id":19,"product_id":4,"quantity":1,"price":1,"expected_shipping_date":0,"expected_delivery_date":null,"order_item_status":[{"id":23,"order_item_id":19,"status_id":1,"status_comment":"order placed","created_at":"2016-03-09 13:53:44","updated_at":"2016-03-09 13:53:44"}],"productSku":{"id":4,"title":"Payment Test","description":"Testing the payment gateway","image":{"id":372,"small_image_url":null,"medium_image_url":null,"large_image_url":"2016-03-09-11_59_21-check_box.png","thumbnail_url":null,"name":null,"description":null,"created_at":"2016-03-09 12:00:41","updated_at":"2016-03-09 12:00:41"},"product":{"id":4,"product_line_id":1,"title":"Payment Test","description":"Testing the payment gateway","delivery_condition":null,"shipment_condition":null,"created_at":"2016-03-09 12:00:41","updated_at":"2016-03-09 12:00:41"}}}';
//    	  var payData = angular.toJson([{"name":"Test product", "description":"Desc", "value":"1"}]);
//    	  return payData;
//    	  
    	  
    	  //var payu = json_encode(json_decode('[{"name":"Test product", "description":"Desc", "value":"1"}]'));
    	  //return payu;
    	  
        // return angular.toJson(orderItem);
      }
  });

/**
 * @ngdoc function
 * @name appApp.controller:BuyerOrdersCtrl
 * @description
 * # BuyerOrdersCtrl
 * Controller of the appApp
 */
evezownApp
  .controller('OrdersSuccessCtrl', function ($scope,$http,PATHS,$cookieStore,$location) {
	  $scope.orders = [];
      
	  fetchSuccessInfo();
	  
	  function fetchSuccessInfo(){
		  $http.post(PATHS.api_url + 'order/success/posturl'
	              , {
	                  data:
	                  {
	                      order_status : "success",
	                  },
	                  headers: {'Content-Type': 'application/json'}
	              }).
	          success(function (data, status, headers, config)
	          {
	        	  $location.path(data.url);
	              
	          }).error(function (data)
	          {

	          }).then(function()
	          {

	          });
		  
		  
	  }
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
  });
