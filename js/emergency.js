function Emergency()
{
	var _this = this;

    this.isInsideVisibleEmer = false;
    this.isOutsideVisibleEmer = false;

    var insideBackground = new fabric.Rect({
        selectable: false,
        originX: 'center',
        width: DOOR_WIDTH*2,
        height: DOOR_HEIGHT,
        left: 0, top: 0,
        fill: '#ff3333', opacity: 0.9,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'insideEmergency'
    });
    var outsideBackground = new fabric.Rect({
        selectable: false,
        originX: 'center',
        width: DOOR_WIDTH*2,
        height: (DOOR_HEIGHT*9/10),
        left: 0, top: (DOOR_HEIGHT/10) + 10,
        fill: '#ff3333', opacity: 0.9,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'outsideEmergency'
    });
	 var emerText = new Text('Emergency', {
        selectable: false,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT /4,
        fontSize: DOOR_HEIGHT / 12,
        id: 'address',
        shadow: 'rgba(0,0,0,0.9) 5px 5px 5px'
    });
	 var emerText2 = new Text('Emergency', {
        selectable: false,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT*(3/4),
        fontSize: DOOR_HEIGHT / 12,
        id: 'address',
        shadow: 'rgba(0,0,0,0.9) 5px 5px 5px'
    });
    // buttons
    
        
    var cancelInside_btn = new Button('cancel', 
       DOOR_WIDTH/2, 
        DOOR_HEIGHT*(1/2),
        {width: DOOR_WIDTH/6, height: DOOR_WIDTH/6});
        
    
    /*
        Function: showInside
        
            Draws the messaging area inside if it's not on screen.
    */
    this.showInside = function() {
        if (!this.isInsideVisibleEmer) {
            inside.add(insideBackground,
                        cancelInside_btn, 
                        emerText, emerText2);
            this.isInsideVisibleEmer= true;
        }
    };
    
    /*
        Function: showOutside
        
            Draws the messaging area outside if it's not on screen.
    */
    this.showOutside = function() {
        if (!this.isOutsideVisibleEmer) {
            outside.add(outsideBackground, emerText, emerText2);
            this.isOutsideVisibleEmer = true;
        }
    };
    
    /*
        Function: hideInside
        
            Clears inside messaging area.
    */
    this.hideInside = function() {
        if (this.isInsideVisibleEmer) {
            inside.remove(insideBackground,
                           cancelInside_btn, 
                           emerText, emerText2);    
            this.isInsideVisibleEmer = false;
            mainMenu.canBeShown = true;
        }
    };
    
    /*
        Function: hideOutside
        
            Clears outside messaging area.
    */
    this.hideOutside = function() {
        if (this.isOutsideVisibleEmer) {
            outside.remove(outsideBackground, emerText, emerText2);
           
            this.isOutsideVisibleEmer = false;
            mainMenu.canBeShown = true;
        }
    };
    
    
    ////
    //  Button behavior
    ////
    
    cancelInside_btn.on('selected', function() {
        _this.hideInside();
        _this.hideOutside();
        clearSelection();
    });
    
    
}