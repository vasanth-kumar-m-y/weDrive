'use strict';

describe('Controller: ProductrfqCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var ProductrfqCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductrfqCtrl = $controller('ProductrfqCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductrfqCtrl.awesomeThings.length).toBe(3);
  });
});
