/**
 * @module test.evezownapp
 * @name applicationCtrl
 * @description
 * Tests for applicationCtrl under evezownapp
 * _Enter the test description._
 * */


describe('Controller: evezownapp.applicationCtrl', function () {

    // load the controller's module
    beforeEach(module('evezownapp'));

    var ctrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('applicationCtrl', {
            $scope: scope
        });
    }));

    it('should be defined', function () {
        expect(ctrl).toBeDefined();
    });
});
