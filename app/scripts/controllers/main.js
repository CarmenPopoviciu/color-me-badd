'use strict';

angular.module('colorMeBaddApp')
    .controller('MainCtrl', function ($scope) {
        // color constants
        var PURPLE = "#cb3594";
        var GREEN = "#659b41";
        var YELLOW = "#ffcf33";
        var BROWN = "#986928";
        var WHITE = "#ffffff";

        // line width constants
        var SMALL = 1;
        var MEDIUM = 3.5;
        var LARGE = 6;
        var HUGE = 10;
        var XXXL = 50;

        // tool constants
        var CRAYON = "crayon";
        var MARKER = "marker";
        var ERASER = "eraser";

        $scope.colors = [{
            name: 'purple',
            value: PURPLE
        },{
            name: 'green',
            value: GREEN
        },{
            name: 'yellow',
            value: YELLOW
        },{
            name: 'brown',
            value: BROWN
        }];

        $scope.sizes = [{
            name: 'small',
            value: SMALL
        },{
            name: 'medium',
            value: MEDIUM
        },{
            name: 'large',
            value: LARGE
        },{
            name: 'huge',
            value: HUGE
        },{
            name: 'xxxl',
            value: XXXL
        }];

        $scope.tools = [CRAYON, MARKER, ERASER];

        $scope.color = $scope.colors[0].value;
        $scope.lineWidth = $scope.sizes[0].value;
        $scope.tool = $scope.tools[0];
        $scope.eraser = ERASER;
        $scope.showClear = true;

        $scope.setColor = function(color) {
            $scope.color = color.value;
        };

        $scope.setLineWidth = function(size) {
            $scope.lineWidth = size.value;
        };

        $scope.setTool = function(tool) {
            if(tool === ERASER) {
                $scope.color = WHITE;
            }
            else {
                if($scope.color === WHITE) {
                    $scope.color = $scope.colors[0].value; // reset the color to default, if previous was WHITE
                }
                if($scope.lineWidth === XXXL) {
                    $scope.lineWidth = SMALL; // reset the line width to default, if previous was XXXL
                }
            }
            $scope.tool = tool;
        };

        $scope.isActiveColor = function(color) {
            if($scope.color === color.value) {
                return true;
            }
            return false;
        };

        $scope.isActiveSize = function(size) {
            if($scope.lineWidth === size.value) {
                return true;
            }
            return false;
        };

        $scope.isActiveTool = function(tool) {
            if($scope.tool === tool) {
                return true;
            }
            return false
        };

        $scope.disableSize = function(size) {
            // we only want to enable the XXXL line width if the ERASER tool is selected
            if((size.value === XXXL) && ($scope.tool !== ERASER)) {
                return true;
            }
            return false;
        };
  });
