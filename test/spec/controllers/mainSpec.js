'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('colorMeBaddApp'));

    var MainCtrl;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      MainCtrl = $controller('MainCtrl', {
        $scope: scope
      });
    }));

    it('should set the active tool to the selected tool', function() {
        scope.setTool("crayon");
        expect(scope.tool).toEqual("crayon");

        scope.setTool("eraser");
        expect(scope.tool).toEqual("eraser");
    });

    it('should set the active color to white, if the selected tool is an eraser', function() {
        scope.setTool("crayon");
        expect(scope.color).not.toEqual("#ffffff");

        scope.setTool("eraser");
        expect(scope.color).toEqual("#ffffff");
    });

    it('should reset the active color to default, when the active tool switches from an eraser to any other tool', function() {
        expect(scope.color).toEqual("#cb3594");

        scope.setTool("eraser");
        expect(scope.color).toEqual("#ffffff");
        scope.setTool("marker");
        expect(scope.color).toEqual("#cb3594");
    });

    it('should reset the active line width to default, when the active tool switches from an eraser to any other tool', function() {
        expect(scope.lineWidth).toEqual(1);

        scope.setTool("eraser");
        scope.setLineWidth({value: 50});
        scope.setTool("marker");
        expect(scope.lineWidth).toEqual(1);
    });
});
