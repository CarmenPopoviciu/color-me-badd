angular.module('colorMeBaddApp')
    /**
     * Drawing canvas
     *
     * @param {Number} height The height of the canvas
     * @param {Number} width The width of the canvas
     * @param {String} color The hexadecimal value of the color to draw with
     * @param {Number} lineWidth The line width
     * @param {String} tool The line texture (crayon, marker) or the eraser
     * @param {Boolean} clear Shows/hides the clear button
     *
     * @example <div color-me-badd height="{{height}}" width="{{width}}" color="{{color}}" line-width="{{lineWidth}}"
     *               tool="{{tool}}" clear="{{showClearBtn}}"></div>
     */
    .directive('colorMeBadd', function() {
        return {
            restrict: 'A',
            scope: {
                height: '@',
                width: '@',
                color: '@',
                lineWidth: '@',
                tool: '@',
                clear: '@'
            },
            template: '<div>' +
                        '<input type="button" ng-show="clear" ng-click="clearCanvas()" value="Clear" class="clear">' +
                        '<canvas id="myCanvas" height="{{height}}" width="{{width}}" class="canvas"></canvas>' +
                      '</div>',
            link: function(scope, elem, attrs) {
                var canvas = elem.find('canvas');
                var context = canvas[0].getContext("2d");

                // helpers
                var clickX = new Array();
                var clickY = new Array();
                var clickDrag = new Array();

                var clickedColors = new Array();
                var clickedSizes = new Array();
                var clickedTools = new Array();

                var paint;
                var previousTool;
                var crayonTextureImage = new Image();
                crayonTextureImage.src = "images/crayon-texture.png";

                // mousedown
                canvas.on('mousedown', function(event) {
                    var mouseX = event.pageX - this.offsetLeft;
                    var mouseY = event.pageY - this.offsetTop;

                    paint = true;
                    addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
                    redraw();
                });

                // mousemove
                canvas.on('mousemove', function(event) {
                    if(paint){
                        addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
                        redraw();
                    }
                });

                // mouseup
                canvas.on('mouseup', function(event) {
                    paint = false;
                });

                // mouseleave
                canvas.on('mouseleave', function(event) {
                    paint = false;
                });

                function addClick(x, y, dragging) {
                    clickX.push(x);
                    clickY.push(y);
                    clickDrag.push(dragging);
                    clickedColors.push(scope.color);
                    clickedSizes.push(Number(scope.lineWidth));
                    clickedTools.push(scope.tool);
                }

                function redraw() {
                    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                    context.lineJoin = "round";

                    for(var i=0; i < clickX.length; i++) {
                        context.beginPath();
                        if(clickDrag[i] && i){
                            context.moveTo(clickX[i-1], clickY[i-1]);
                        }
                        else{
                            context.moveTo(clickX[i]-1, clickY[i]);
                        }
                        context.lineTo(clickX[i], clickY[i]);
                        context.closePath();
                        context.strokeStyle = clickedColors[i];
                        context.lineWidth = clickedSizes[i];
                        context.stroke();
                    }

                    if(scope.tool === "crayon") {
                        context.globalAlpha = 0.4;
                        context.drawImage(crayonTextureImage, 0, 0, context.canvas.width, context.canvas.height);
                    }
                    else if(scope.tool === "eraser") {
                        // keep the context background when we erase
                        if(previousTool === "crayon") {
                            context.globalAlpha = 0.4;
                            context.drawImage(crayonTextureImage, 0, 0, context.canvas.width, context.canvas.height);
                        }
                    }
                    context.globalAlpha = 1;
                }

                scope.$watch('tool', function(newValue, oldValue) {
                    previousTool = oldValue;
                });

                attrs.$observe('clear', function(value) {
                    scope.clear = (value === 'true');
                });

                scope.clearCanvas = function() {
                    clickX = new Array();
                    clickY = new Array();
                    clickDrag = new Array();

                    clickedColors = new Array();
                    clickedSizes = new Array();
                    clickedTools = new Array();

                    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                };
            }
        };
    });
