/**
 * Created by vishu on 22/09/15.
 */
evezownApp.directive('socialShare', function () {
    return {
        restrict: 'EA',
        scope: {
            whatsapp: '=',
            title: '=',
            facebook: '=',
            linkedin: '=',
            gmail: '=',
            googleplus: '=',
            twitter: '=',
            email: '=',
            sharelink: '=',
            sharemedia: '='
        },
        templateUrl: "partials/socialShare.html",
        controller: function($scope) {
            console.log($scope.title);

            $scope.sendEmail = function() {
                var link = "mailto:"
                    + "?subject=" + escape($scope.title)
                    + "&body=" + escape($scope.sharelink);

                window.location.href = link;
            };
        }

    };
});