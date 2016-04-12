/*
    Class: Button
    
        Defines a button object.
        
    Parameters:
    
        img (String) - Filename of SVG image, without extension.
        x (Number) | 0 - Horizontal position of the button's center, in pixels
        y (Number) | 0 - Vertical position of the button's center, in pixels
        options (Object) | null - Set members inherited from <fabric.Image at http://fabricjs.com/docs/fabric.Image.html>.
*/
var Button = fabric.util.createClass(fabric.Image, {
    type: 'button',
    initialize: function(img, x, y, options) {
        this.callSuper('initialize', document.getElementById(img));
        this.set({
            hasControls: false, hasBorders: false,
            lockMovementX: true, lockMovementY: true,
            width: ICON_SIZE, height: ICON_SIZE,
            left: x || 0, top: y || 0,
            originX: 'center', originY: 'center',
            shadow: 'rgba(0,0,0,1) 0px 0px 7px'
        });
        this.set(options);
    }
});