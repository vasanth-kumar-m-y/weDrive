'use strict';

describe('Controller: InviteSuccessCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var InviteSuccessCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InviteSuccessCtrl = $controller('InviteSuccessCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InviteSuccessCtrl.awesomeThings.length).toBe(3);
  });
});
