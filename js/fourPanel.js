document.getElementById("deviceDetect").onchange = function() {
	if (this.selectedIndex !== 0) {
           // window.location.href = this.value;
            fourPanel.showPanel();
        }
   
};

function FourPanel()
{
	  var _this = this;
    
    
    // Define the writing areas...
    var backPanel = new fabric.Rect({
        selectable: true,
        originX: 'center',
        width: DOOR_WIDTH*(2/3),
        height: DOOR_HEIGHT/2,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 3 ,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'displayPanel'
    });
    var title = new Text('', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/2,
        top: DOOR_HEIGHT/2.1
    });

    var toDo = new Button('log', 
        DOOR_WIDTH , 
        DOOR_HEIGHT / 2.4,
        {width: backPanel.width /3, height: backPanel.width / 3});

    
    // cancel buttons
        
    var cancelInside_btn = new Button('cancel', 
        backPanel.left + backPanel.width / 2, 
        backPanel.top,
        {width: backPanel.width / 8, height: backPanel.width / 8});
        
    
    /*
        Function: showInside
        
            Draws the messaging area inside if it's not on screen.
    */
    this.showPanel = function() {
        if (!this.isInsideVisible) {
            inside.add(backPanel, cancelInside_btn, title, 
                        toDo);
            this.isInsideVisible = true;
        }
    };
    
    
    /*
        Function: hideInside
        
            Clears inside messaging area.
    */
    this.hideInside = function() {
        if (this.isInsideVisible) {
            inside.remove(backPanel, cancelInside_btn, title, toDo);
            
            this.isInsideVisible = false;
            mainMenu.canBeShown = true;
        }
    };
    cancelInside_btn.on('selected', function() {
        _this.hideInside();
        clearSelection();
    });
}
