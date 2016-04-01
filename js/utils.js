// Fabric subclasses

// Notification(name)
//   str name is the image filename without extension
var Notification = fabric.util.createClass(fabric.Image, {
    type: 'notification',
    initialize: function(name, options) {
        this.callSuper('initialize', document.getElementById(name), options);
        this.set({
            selectable: false,
            originY: 'center',
            shadow: 'rgba(0,0,0,1) 0px 0px 5px'
        });
    }
});

// Button(name, x, y, options)
//   str name is the image filename without extension
//   ints x and y are the position (origin at object's center)
//   options can be set as usual fabric objects
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
        });
    }
});

// MenuButton(name, x, y, options)
//   str name is the image filename without extension
//   ints x and y are the position (origin at object's left top corner)
//   options can be set as usual fabric objects
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
//   str is the text to display
//   options can be set as usual fabric objects
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


// Red and green image filters
 
var redFilter = new fabric.Image.filters.Tint({
    color: '#FF1900',
    opacity: 0.4
});

var greenFilter = new fabric.Image.filters.Tint({
    color: '#00FF73',
    opacity: 0.3
});

function colorRed(img) {
    img.filters.push(redFilter);
    img.applyFilters(inside.renderAll.bind(inside));
}

function colorGreen(img) {
    img.filters.push(greenFilter);
    img.applyFilters(inside.renderAll.bind(inside));
}


// Useful functions

function exchangeObjects(canvas, toAdd, toRemove) {
    canvas.add(toAdd);
    canvas.remove(toRemove);
}

function clearSelection() {
    inside.deactivateAll();
    outside.deactivateAll();
}