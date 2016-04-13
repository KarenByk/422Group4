/*
    Class: Messaging
    
        This class handles handwritten messaging through the door.
        
    
*/
function Messaging() {
    
    // Define the writing area...
    var background = new fabric.Rect({
        selectable: false,
        originX: 'center',
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 2 * ICON_SIZE,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        left: DOOR_WIDTH / 2, top: DOOR_WIDTH / 3,
        id: 'writingArea'
    });
    
    // ...and accept/close buttons
    var accept_btn = new Button('accept', background.left - background.width / 2, background.top + background.height, {id: 'acceptMessage', hasControls: false});
    var cancel_btn = new Button('cancel', background.left + background.width / 2, background.top + background.height, {id: 'cancelMessage', hasControls: false});
    
    outside.add(background, accept_btn, cancel_btn);
    
    //var brush = new fabric.PencilBrush(outside);
    outside.freeDrawingBrush.color = '#fff';
    
    /* outside.on('mouse:down', function(event){
        if (typeof event.target !== 'undefined') {
            if (event.target.id === 'writingArea') {
                outside.isDrawingMode = true;
            }
        }
    });
    
    outside.on('mouse:up', function(event){
        if (typeof event.target !== 'undefined') {
            if (event.target.id === 'writingArea') {
                outside.isDrawingMode = true;
            } else {
                outside.isDrawingMode = false;
            }
        }
    }); */
    
}