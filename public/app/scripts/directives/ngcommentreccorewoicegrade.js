'use strict';

/**
 * @ngdoc directive
 * @name appApp.directive:ngCommentReccoRewoiceGrade
 * @description
 * # ngCommentReccoRewoiceGrade
 */
evezownApp
    .directive('ngCommentReccoRewoiceGrade', function (PATHS) {

        return {
            templateUrl: 'scripts/directives/comment-recco-rewoice-grade.tpl.html',
            restrict: 'E',
            scope: {
                ngComments: '=',
                ngCommentsMetadata: '=',
                isComments: '=',
                totalGrade: '=',
                avgGrade: '=',
                userGrade: '=',
                isGrades: '=',
                isRestream: '=',
                restreams: '=',
                addComment: '&',
                loadComments: '&',
                updateComment: '&',
                deleteComment: '&',
                addGrade: '&',
                addRestream: '&',
            },
            link: function ($scope, $elem, $attr) {

                $scope.$watch('ngComments', function () {
                    var newCommentElement = document.getElementById('new-comment');

                    if (newCommentElement != null) {
                        newCommentElement.value = "";
                    }
                });


            },
            controller: function ($scope, $log, $cookieStore) {

                $scope.loggedInUserId = $cookieStore.get('userId');

                $scope.editing = false;

                // configuration for pagination control

                $scope.pageChanged = function () {
                    $log.log('Page changed to: ' + $scope.ngCommentsMetadata.pagination.current_page);
                };

                $scope.imageUrl = PATHS.api_url + 'image/show/';
                $scope.isComments = true;
                $scope.isGrades = true;
                $scope.isRestream = true;


                $scope.toggleComments = function () {
                    $scope.isHideComments = !$scope.isHideComments;
                };
            }
        };
    });
