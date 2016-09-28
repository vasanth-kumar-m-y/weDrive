'use strict';

/**
 * @ngdoc service
 * @name evezownApp.orderService
 * @description
 * # orderService
 * Service in the evezownApp.
 */
evezownApp
    .factory('OrderService', ['$http', '$q', 'PATHS', function ($http, $q, PATHS) {
        var OrderService = {};

        OrderService.getOrderStatuses = function ()
        {
            var deferred = $q.defer();
            $http.get(PATHS.api_url + 'order/statuses')
                .success(function (data) {
                    deferred.resolve(data.data);
                })
                .error(function (err) {
                    console.log('Error retrieving order statuses');
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        OrderService.getBuyerOrder = function (input,userId)
        {
            var deferred = $q.defer();
            $http.get(PATHS.api_url + 'orders/'+input+'/'+userId+'/buyer', {
                })
                .success(function (data) {
                    if(data.data.length > 0){
                       deferred.resolve(data.data);
                    }else{
                        deferred.resolve(data.data);
                        toastr.error("No Orders Found");
                    }
                    
                })
                .error(function (err) {
                    console.log('Error retrieving order');
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        OrderService.updateOrderStatus = function (orderItemId, statusId, comment,deliveryWithin,shippedWithIn,orderId, token) {

            var statusData = {order_item_id : orderItemId, status_id : statusId, comment: comment,deliveryDays: deliveryWithin,shippingDays: shippedWithIn, order_id: orderId};

            var deferred = $q.defer();
            $http.post(PATHS.api_url + 'order/item/status/update', statusData, {
                    headers: {'Authorization' :'Bearer ' + token }
                })
                .success(function (data) {
                    deferred.resolve(data.data);
                })
                .error(function (err) {
                    console.log('Error retrieving order statuses');
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        OrderService.updateOrder = function (orderId, statusId, comment, token) {

            var statusData = {order_id : orderItemId, status_id : statusId, comment: comment};

            var deferred = $q.defer();
            $http.post(PATHS.api_url + 'order/status/update', statusData, {
                    headers: {'Authorization' :'Bearer ' + token }
                })
                .success(function (data) {
                    deferred.resolve(data.data);
                })
                .error(function (err) {
                    console.log('Error retrieving order statuses');
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        return OrderService;
    }]);
