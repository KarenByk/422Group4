/*
    Class: Keypad
    
        This class implements a pattern password interface.
*/
function Keypad() {
    
    const POINT_MARGIN = DOOR_HEIGHT / 100;

    var _this = this;
    
    this.canSwipe = true;
    this.isVisible = false;
    // Mode can be 'normal' or 'set' when setting pattern
    this.mode = 'normal';
    
    var functionsOnCorrect = [];
    
    var correctSeq = [1, 2, 3, 6, 9];
    var patternLength = correctSeq.length;
    var seq = [];
    var path = [];
    
    var Keypoint = fabric.util.createClass(fabric.Circle, {
        type: 'keypoint',
        initialize: function(number, options) {
            this.callSuper('initialize');
            this.set({
                hasControls: false,
                lockMovementX: true, lockMovementY: true,
                radius: 5,
                fill: '#fff',
                shadow: 'rgba(0,0,0,1) 0px 0px 7px',
                id: number
            });
            this.set(options);
        }
    });
    
    var p1 = new Keypoint(1);
    var p2 = new Keypoint(2);
    var p3 = new Keypoint(3);
    var p4 = new Keypoint(4);
    var p5 = new Keypoint(5);
    var p6 = new Keypoint(6);
    var p7 = new Keypoint(7);
    var p8 = new Keypoint(8);
    var p9 = new Keypoint(9);
    
    var pointsList = [p1, p2, p3, p4, p5, p6, p7, p8, p9];
    
    // Define the keypad area...
    var background = new fabric.Rect({
        selectable: false,
        width: 3 * (2 * p1.radius) + 4 * POINT_MARGIN,
        height: 3 * (2 * p1.radius) + 4 * POINT_MARGIN,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'keypad'
    });
    
    this.width = background.width;
    this.height = background.height;
    
    var close_btn = new Button('cancel');
    
    var positionElements = function(x, y) {
        
        background.set({left: x, top: y});
        close_btn.set({
                width: DOOR_HEIGHT / 40, height: DOOR_HEIGHT / 40,
                left: background.left + background.width, 
                top: background.top
            });
        p1.set({left: background.left + POINT_MARGIN, 
                top: background.top + POINT_MARGIN});
        p2.set({left: p1.left + 2 * p1.radius + POINT_MARGIN, 
                top: p1.top});
        p3.set({left: p2.left + 2 * p1.radius + POINT_MARGIN, 
                top: p1.top});
        p4.set({left: p1.left, 
                top: p1.top + 2 * p1.radius + POINT_MARGIN});
        p5.set({left: p2.left, 
                top: p4.top});
        p6.set({left: p3.left, 
                top: p5.top});
        p7.set({left: p1.left, 
                top: p4.top + 2 * p1.radius + POINT_MARGIN});
        p8.set({left: p2.left, 
                top: p7.top});
        p9.set({left: p3.left, 
                top: p7.top});
        
    };
    
    /*
        Function: showInside
        
            Draws the inside keypad.
            
        Parameters:
        
            x (Number) - Optional horizontal position of the keypad's top-left corner, in pixels
            y (Number) - Optional vertical position of the keypad's top-left corner, in pixels
    */
    this.showInside = function(functions, x, y) {
        
        if (!this.isVisible) {
            functionsOnCorrect = functions;
            this.isVisible = true;
            this.canSwipe = true;
            positionElements(
                x || gui.userBtnX - ICON_SIZE - background.width, 
                y || gui.userBtnY - background.height / 2);
            inside.add(background, p1, p2, p3, p4, p5, p6, p7, p8, p9, close_btn);
        }
        
    };
    
    /*
        Function: showOutside
        
            Draws the outside keypad.
            
        Parameters:
        
            x (Number) - Optional horizontal position of the keypad's top-left corner, in pixels
            y (Number) - Optional vertical position of the keypad's top-left corner, in pixels
    */
    this.showOutside = function(functions, x, y) {
        
        if (!this.isVisible) {
            functionsOnCorrect = functions;
            this.isVisible = true;
            this.canSwipe = true;
            positionElements(
                x || gui.noteBtnX + ICON_SIZE, 
                y || gui.noteBtnY - keypad.height / 2);
            outside.add(background, p1, p2, p3, p4, p5, p6, p7, p8, p9, close_btn);
        }
        
    };
    
    /*
        Function: hide
        
            Removes the keypad from the screen.
    */
    this.hide = function() {
        
        inside.remove(background, p1, p2, p3, p4, p5, p6, p7, p8, p9, close_btn);
        outside.remove(background, p1, p2, p3, p4, p5, p6, p7, p8, p9, close_btn);
        pointsList.forEach(function(point) {point.setFill('white')});
        seq = [];
        path = [];
        this.isVisible = false;
        
    };
    
    var checkIfCorrect = function(seq) {
        
        if (seq.toString() === correctSeq.toString()) {return true}
        else {return false}
        
    };
    
    
    ////
    //  Button behavior
    ////
    
    close_btn.on('selected', function() {
        _this.hide();
        clearSelection();
    });
    
    ////
    //  Swiping behavior
    ////
    
    inside.on('mouse:move', function(event) {
        
        if (_this.canSwipe) {
            
            if (seq.length < patternLength) {
                
                var p = inside.getPointer(event.e);

                pointsList.forEach(function(point) {
                    var distX = Math.abs(p.x - (point.left + point.radius));
                    var distY = Math.abs(p.y - (point.top + point.radius));
                    var dist = Math.round(Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)));
                    if (dist < point.radius && point.id != seq.slice(-1)[0]) {
                        seq.push(point.id);
                        path.push(point);
                        point.setFill('red');
                        inside.renderAll();
                    }
                });
                
            } else { // this stuff happens after the pattern is entered
                if (_this.mode === 'set') {
                    correctSeq = seq.slice();
                    _this.mode = 'normal';
                } else if (checkIfCorrect(seq)) {
                    path.forEach(function(point) {
                        point.setFill('green');
                        inside.renderAll();
                    });
                    if (functionsOnCorrect.indexOf('unlock') >= 0) {
                        gui.unlock();
                    }
                    if (functionsOnCorrect.indexOf('open') >= 0) {
                        gui.openDoor();
                    }
                    gui.needsPassword = false;
                }
                
                setTimeout(function() { _this.hide(); }, 2000);
                _this.canSwipe = false;
            }
            
        }
        
    });
    
    outside.on('mouse:move', function(event) {
        
        if (_this.canSwipe) {
            
            if (seq.length < patternLength) {
                
                var p = outside.getPointer(event.e);

                pointsList.forEach(function(point) {
                    var distX = Math.abs(p.x - (point.left + point.radius));
                    var distY = Math.abs(p.y - (point.top + point.radius));
                    var dist = Math.round(Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)));
                    if (dist < point.radius && point.id != seq.slice(-1)[0]) {
                        seq.push(point.id);
                        path.push(point);
                        point.setFill('red');
                        outside.renderAll();
                    }
                });
                
            } else {
                if (checkIfCorrect(seq)) {
                    path.forEach(function(point) {
                        point.setFill('green');
                        outside.renderAll();
                    });
                    if (functionsOnCorrect.indexOf('unlock') >= 0) {
                        gui.unlock();
                    }
                    if (functionsOnCorrect.indexOf('open') >= 0) {
                        gui.openDoor();
                    }
                    gui.needsPassword = false;
                }
                setTimeout(function() { _this.hide(); }, 2000);
                _this.canSwipe = false;
            }
            
        }
        
    });
    
}