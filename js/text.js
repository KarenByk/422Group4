/* 
    Class: Text
    
        Defines a text object.

    Parameters:
    
        str (String) - The text to display.
        options (Object) - Set members inherited from <fabric.Text at http://fabricjs.com/docs/fabric.Text.html>.
*/
var Text = fabric.util.createClass(fabric.Text, {
    type: 'text',
    initialize: function(str, options) {
        this.callSuper('initialize', str);
        this.set({
            selectable: false,
            originX: 'center',
            fill: 'white',
            fontFamily: 'droid-sans-bold',
            shadow: 'rgba(0,0,0,1) 0px 0px 5px'
        });
        this.set(options);
    }
});