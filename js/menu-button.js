/*
    Class: MenuButton

        Defines a menu button object.
        
    Parameters: 
    
        img (String) - Filename of SVG image, without extension.
        x (Number) | 0 - Horizontal position of the button's center, in pixels
        y (Number) | 0 - Vertical position of the button's center, in pixels
        options (Object) | null - Set members inherited from <Button>.
*/
var MenuButton = fabric.util.createClass(Button, {
    type: 'menuButton',
    initialize: function(img, x, y, options) {
        this.callSuper('initialize', img, x, y);
        this.set({
            left: x || 0, top: y || 0, 
            originX: 'left', originY: 'top'
        });
        this.set(options);
    }
});