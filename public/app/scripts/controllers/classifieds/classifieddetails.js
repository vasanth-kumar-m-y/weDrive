'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:ClassifieddetailsctrlCtrl
 * @description
 * # ClassifieddetailsctrlCtrl
 * Controller of the appApp
 */
evezownApp
    .controller('ClassifiedDetailsCtrl', function ($scope, $routeParams, usSpinnerService,
                                                   ClassifiedsService, PATHS, $location, ngDialog,
                                                   $controller, $cookieStore) {
        var classifiedId = $routeParams.id;

        $scope.SelectedClassified = $routeParams.id;

        $scope.loggedInUserId = $cookieStore.get('userId');

        $scope.PageSource = $routeParams.pagesrc;
        
        $scope.shareUrl = function () {
            return $location.absUrl();
        };

        $scope.shareHost = function () {
            return $location.absUrl();
        };

        ClassifiedsService.getClassified(classifiedId).
        then(function (data) {
            console.log(data);

            var imageUrlPath = PATHS.api_url + 'image/show/';
            $scope.classifiedDetails = data;
            $scope.OwnerID = data.owner_id;

            $scope.classifiedDetails.classified_images = [];

            $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].title_image_name);
            $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].body_image1_name);
            $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].body_image2_name);
            $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].body_image3_name);
            $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].body_image4_name);
        });

        $scope.ClassifiedRfiDialog = function (classifiedId) {
            var classifiedRfiDialog = ngDialog.open(
                {
                    template: 'rfiClassifiedTemplateId',
                    className: 'ngdialog-theme-plain',
                    scope: $scope,
                    controller: $controller('classifiedRfiCtrl', {
                        $scope: $scope,
                        classifiedId: classifiedId
                    })
                });

            classifiedRfiDialog.closePromise.then(function (data) {

                if (data.value.status) {
                    toastr.success(data.message, 'Ads & Campaigns rfi submitted successfully.');
                }
            });
        }

        /* Comment, Grade and Restream section for classifieds */

        // The loaded comments for the store will be passed to the directive.

        function loadClassifiedComments(page) {
            ClassifiedsService.getClassifiedComments(classifiedId, page).
            then(function (data) {
                var comments = data.data;

                $scope.commentMetadata = data.meta;
                $scope.classifiedComments = comments;
            });
        }

        function loadClassifiedGrades() {
            ClassifiedsService.getClassifiedGrades(classifiedId, $scope.loggedInUserId).
            then(function (data) {
                var gradeData = data;

                $scope.totalGrade = gradeData.grades.length;

                $scope.userGrade = gradeData.user_grade;

                $scope.avgGrade = gradeData.avg_grade;
            });
        }

        function loadClassifiedRestreams() {
            ClassifiedsService.getClassifiedRestreams(classifiedId).
            then(function (data) {
                $scope.totalRestreams = data;
            });
        }

        loadClassifiedComments(1);

        loadClassifiedGrades();

        loadClassifiedRestreams();

        $scope.loadComments = function (page) {
            console.log(page);
            loadClassifiedComments(page)
        };

        // This method call is happening from the directive and the
        // new comment is received from there.
        $scope.addComment = function (comment) {
            console.log(comment);

            ClassifiedsService.addComment(classifiedId, $scope.loggedInUserId, comment).
            then(function (data) {
                var result = data;

                console.log(result);

                if (result.status) {
                    toastr.success(data.message, 'Ads & Campaigns Comment');
                    loadClassifiedComments();
                }
            });
        };

        $scope.updateComment = function (commentId, comment) {

            console.log(commentId + ' ' + comment);

            ClassifiedsService.updateComment(commentId, comment).
            then(function (data) {
                var result = data;

                console.log(result);

                if (result.status) {
                    toastr.success(data.message, 'Ads & Campaigns Comment');
                    loadClassifiedComments();
                }
            });
        };

        $scope.deleteComment = function (id) {

            console.log(id);

            ClassifiedsService.deleteComment(id).
            then(function (data) {
                var result = data;

                console.log(result);

                if (result.status) {
                    toastr.success(data.message, 'Ads & Campaigns Comment');
                    loadClassifiedComments();
                }
            });
        };

        $scope.addGrade = function (grade) {
            console.log(grade);

            ClassifiedsService.addGrade(classifiedId, $scope.loggedInUserId, grade).
            then(function (data) {
                var result = data;

                console.log(result);

                if (result.status) {
                    toastr.success(data.message, 'Ads & Campaigns Grade');
                    loadClassifiedGrades();
                }
            });
        };

        $scope.addRestream = function () {

            ClassifiedsService.restreamClassified(classifiedId, $scope.loggedInUserId).
            then(function (data) {
                var result = data;

                console.log(result);

                if (result.status) {
                    toastr.success(data.message, 'Ads & Campaigns Restream');

                    loadClassifiedRestreams();
                }
            });
        };

        $scope.publishClassified = function() {
        var finishClassifiedDialog = ngDialog.open(
            {
                template: 'finishClassifiedDialogId',
                scope: $scope,
                className: 'ngdialog-theme-default',
                controller: $controller('PublishClassifiedCtrl', {
                    $scope: $scope
                })
            });
        }
    });

evezownApp.controller('PublishClassifiedCtrl', function ($scope, ngDialog, $cookieStore, $routeParams,
                                                        usSpinnerService, ClassifiedsService) {
    $scope.classifiedId = $routeParams.id;

    console.log($scope.classifiedId);

    $scope.publishToRecco = false;
    $scope.activateClassified = false;

    $scope.finishClassified = function ($status) {

        usSpinnerService.spin('spinner-1');

        var statusData = {status: $status};

        ClassifiedsService.updateStatus(statusData, $scope.classifiedId)
            .then(function (data) {
                usSpinnerService.stop('spinner-1');
                toastr.success(data.message, 'Ads & Campaigns Updated');
                ngDialog.close("", data);
            });
    }
});