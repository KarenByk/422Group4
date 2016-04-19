

function FourPanel()
{
	  var _this = this;
    
    
    // Define the writing areas...
    var backPanel = new fabric.Rect({
        selectable: true,
        originX: 'center',
        width: DOOR_WIDTH*(2/3),
        height: DOOR_HEIGHT/3.5,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 3 ,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'displayPanel'
    });
    var toDo = new Text('To do List', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/3.4,
        top: DOOR_HEIGHT/2.8
    });
    var lunch = new Text('-Take Lunch', {
        originX: 'center', originY: 'center',
        fontSize: 14,
        left: DOOR_WIDTH/3.4,
        top: DOOR_HEIGHT/2.6
    });
    var lunch2 = new Text('-Fill Up Gas', {
        originX: 'center', originY: 'center',
        fontSize: 14,
        left: DOOR_WIDTH/3.4,
        top: DOOR_HEIGHT/2.4
    });
    var TrafficTitle = new Text('Traffic', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/1.5,
        top: DOOR_HEIGHT/2.8
    });
    var trafficTime = new Text('23 min', {
        originX: 'center', originY: 'center',
        fontSize: 14,
        left: DOOR_WIDTH/1.5,
        top: DOOR_HEIGHT/2.6
    });

    /*var toDo = new Button('', 
        DOOR_WIDTH , 
        DOOR_HEIGHT / 2.4,
        {width: backPanel.width /3, height: backPanel.width / 3});*/

    
    // cancel buttons
        
    var cancelInside_btn = new Button('cancel', 
        backPanel.left + backPanel.width / 2, 
        backPanel.top,
        {width: backPanel.width / 8, height: backPanel.width / 8});
        
    
    /*
        Function: showInside
        
            Draws the messaging area inside if it's not on screen.
    */
    this.showPanel = function(index) {
        if (!this.isInsideVisible) {
            inside.add(backPanel, cancelInside_btn, lunch, 
                        toDo, TrafficTitle, trafficTime);
            this.isInsideVisible = true;
            if(index  === "1" )
            {
                inside.add(lunch2);
                trafficTime.setText("44 min");

            }
        }
        if(languageMenu.getLang() === 2) {
            toDo.setText("Para Hacer La Lista");
            lunch.setText("-Tomar El Almuerzo");
            lunch2.setText("-llenar de gasolina");
            TrafficTitle.setText("Tráfico");
        }
        else {
            toDo.setText("To Do List");
            lunch.setText("-Take Lunch");
            lunch2.setText("-Fill up Gas");
            TrafficTitle.setText("Traffic");
        }
    };
    
    
    /*
        Function: hideInside
        
            Clears inside messaging area.
    */
    this.hideInside = function() {
        if (this.isInsideVisible) {
            inside.remove(backPanel, cancelInside_btn, lunch, lunch2, toDo, TrafficTitle, trafficTime);
            
            this.isInsideVisible = false;
            mainMenu.canBeShown = true;
        }
    };
    cancelInside_btn.on('selected', function() {
        _this.hideInside();
        clearSelection();
    });

}
