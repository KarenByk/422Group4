function Profile()
{
	  var _this = this;
    
    
    this.isInsideVisible = false;
    
    // Define the writing areas...
    var back = new fabric.Rect({
        selectable: false,
        originX: 'center',
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: DOOR_HEIGHT/4,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 3 ,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'displayProfile'
    });
    var title = new Text('Donald Trump', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/2,
        top: DOOR_HEIGHT/2.1
    });

    var userPerson = new Button('user', 
        DOOR_WIDTH / 2, 
        DOOR_HEIGHT / 2.4,
        {width: back.width /3, height: back.width / 3});

    
    // cancel buttons
        
    var cancelInside_btn = new Button('cancel', 
        back.left + back.width / 2, 
        back.top,
        {width: back.width / 8, height: back.width / 8});
        
    
    /*
        Function: showInside
        
            Draws the messaging area inside if it's not on screen.
    */
    this.show = function() {
        if (!this.isInsideVisible) {
            inside.add(back, cancelInside_btn, title, 
                        userPerson);
            this.isInsideVisible = true;
        }
    };
    
    
    /*
        Function: hideInside
        
            Clears inside messaging area.
    */
    this.hideInside = function() {
        if (this.isInsideVisible) {
            inside.remove(back, cancelInside_btn, title, userPerson);
            
            this.isInsideVisible = false;
            mainMenu.canBeShown = true;
        }
    };
    cancelInside_btn.on('selected', function() {
        _this.hideInside();
        clearSelection();
    });
    // Unlock and open or close the door if inside knob is touched
    back.on('selected', function(){
        fourPanel.showPanel();
        this.hideInside();
        clearSelection();
    });
    
}
