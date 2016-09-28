/**
 * Created by vishu on 07/09/15.
 */
evezownApp.directive("fileInput", ['$parse', function ($parse) {
    return {
        restrict : 'A',
        link: function (scope, element, attributes) {
            element.bind("change", function () {
                $parse(attributes.fileInput)
                    .assign(scope, element[0].files)
                scope.$apply()
            });
        }
    }
}]);