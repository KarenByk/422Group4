/*
    Class: Notification
    
        Defines a notification object.
        
    Parameters:
        
        img (String) - Filename of SVG image, without extension.
        options (Object) | null - Set members inherited from <fabric.Image at http://fabricjs.com/docs/fabric.Image.html>.
*/ 
var Notification = fabric.util.createClass(fabric.Image, {
    type: 'notification',
    initialize: function(img, options) {
        this.callSuper('initialize', document.getElementById(img));
        this.set({
            selectable: false,
            originY: 'center',
            shadow: 'rgba(0,0,0,1) 0px 0px 5px'
        });
        this.set(options);
    }
});