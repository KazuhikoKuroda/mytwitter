'use strict';

describe('Controller: TweetCtrl', function () {

  // load the controller's module
  beforeEach(module('mytwitterApp'));

  var TweetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TweetCtrl = $controller('TweetCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TweetCtrl.awesomeThings.length).toBe(3);
  });
});
