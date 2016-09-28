'use strict';

/**
 * @ngdoc filter
 * @name evezownApp.filter:addLimitEllipsis
 * @function
 * @description
 * # addLimitEllipsis
 * Filter in the appApp.
 */

evezownApp.filter('addLimitEllipsis', function () {
    return function (input, limit) {
        if (input.length > limit) {

            return input.substring(0, limit) + '...';
        }
        else {
            return input;
        }
    }
});