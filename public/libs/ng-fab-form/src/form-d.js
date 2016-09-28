angular.module('ngFabForm')
    .directive('form', ['ngFabFormDirective', function (ngFabFormDirective)
    {
        'use strict';

        return ngFabFormDirective;
    }]);
