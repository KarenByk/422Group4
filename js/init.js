var inside = new fabric.Canvas('inside-door');
var outside = new fabric.Canvas('outside-door');

const DOOR_WIDTH = inside.width;
const DOOR_HEIGHT = inside.height;
const ICON_SIZE = Math.round(DOOR_WIDTH / 9);
const ICON_MARGIN = Math.round(DOOR_WIDTH / 30);

var doorClosed = true;
var doorLocked = true;

function render(canvas) {
    canvas.renderAll.bind(canvas);
}

function clearSelections() {
    inside.deactivateAll();
    outside.deactivateAll();
}


// Notification(name)
//   str name is the image filename without extension
var Notification = fabric.util.createClass(fabric.Image, {
    type: 'notification',
    initialize: function(name) {
        this.callSuper('initialize', 
            document.getElementById(name), {
                selectable: false,
                originY: 'center',
                shadow: 'rgba(0,0,0,1) 0px 0px 5px'
                //id: name
            });
    }
});


// Button(name, x, y)
//   str name is the image filename without extension
//   ints x and y are the position (origin at object's center)
var Button = fabric.util.createClass(fabric.Image, {
    type: 'button',
    initialize: function(name, x, y, options) {
        this.callSuper('initialize', document.getElementById(name), options);
        this.set({
            lockMovementX: true, lockMovementY: true,
            width: ICON_SIZE, height: ICON_SIZE,
            left: x || 0, top: y || 0,
            originX: 'center', originY: 'center',
            shadow: 'rgba(0,0,0,1) 0px 0px 7px'
            //id: name
        });
    }
});


// MenuButton(name, x, y)
//   str name is the image filename without extension
//   ints x and y are the position (origin at object's left top corner)
var MenuButton = fabric.util.createClass(Button, {
    type: 'menuButton',
    initialize: function(name, x, y, options) {
        this.callSuper('initialize', name, x, y, options);
        this.set({
            left: x || 0, top: y || 0, 
            originX: 'left', originY: 'top'
        });
    }
});


// Text(str, options)
//   str is the text to be displayed
//   options are provided by the user if desired
//   This subclass standardizes the text font family, shadow, and color
var Text = fabric.util.createClass(fabric.Text, {
    type: 'text',
    initialize: function(str, options) {
        this.callSuper('initialize', str, options);
        this.set({
            originX: 'center',
            fill: 'white',
            fontFamily: 'droid-sans-bold',
            shadow: 'rgba(0,0,0,1) 0px 0px 5px'
       });
    }
});


// Doorknobs

var knobIn = new fabric.Circle({
    radius: DOOR_WIDTH / 20, 
    fill: 'black', stroke: 'white',
    originX: 'center', originY: 'center', 
    lockMovementX: true, lockMovementY: true,
    lockScalingX: true, lockScalingY: true,
    left: DOOR_WIDTH - 40, top: DOOR_HEIGHT / 2
});

var knobOut = new fabric.Circle({
    radius: DOOR_WIDTH / 20, 
    fill: 'black', stroke: 'white',
    originX: 'center', originY: 'center', 
    lockMovementX: true, lockMovementY: true,
    lockScalingX: true, lockScalingY: true,
    left: 40, top: DOOR_HEIGHT / 2
});

inside.add(knobIn);
outside.add(knobOut);

knobIn.on('selected', function() {
    clearSelections();
});

knobOut.on('selected', function() {
    clearSelections();
});


// Outside address
 
var outsideAddress = new Text('123', {
    left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 70,
    fontSize: DOOR_HEIGHT / 10
});

outside.add(outsideAddress);