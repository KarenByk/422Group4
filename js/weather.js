/*
    Class: Weather
    
        This class handles the user on the inside checking how to 
        dress for the weather
*/
function Weather() {
    
    var _this = this;
    
    
    this.isInsideVisible = false;
    
    // Define the writing areas...
    var backgroundInsideClimate = new fabric.Rect({
        selectable: false,
        originX: 'center',
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: DOOR_HEIGHT/3,
        left: DOOR_WIDTH / 2, top: DOOR_HEIGHT / 3 ,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70,
        id: 'displayWeather'
    });
    var title = new Text('What to Wear ', {
        originX: 'center', originY: 'center',
        fontSize: 20,
        left: DOOR_WIDTH/2,
        top: DOOR_HEIGHT/2.8
    });

    var hoodieImg = new Button('hoodie', 
        DOOR_WIDTH / 2, 
        DOOR_HEIGHT / 2.4,
        {width: backgroundInsideClimate.width /3, height: backgroundInsideClimate.width / 3});
    var sunglassImg = new Button('sunglass', 
        DOOR_WIDTH / 2, 
        DOOR_HEIGHT / 1.9,
        {width: backgroundInsideClimate.width /3, height: backgroundInsideClimate.width / 3});
    var scarfImg = new Button('scarf', 
        DOOR_WIDTH / 2, 
        DOOR_HEIGHT / 1.6,
        {width: backgroundInsideClimate.width /3, height: backgroundInsideClimate.width / 3});

    
    // cancel buttons
        
    var cancelInside_btn = new Button('cancel', 
        backgroundInsideClimate.left + backgroundInsideClimate.width / 2, 
        backgroundInsideClimate.top,
        {width: backgroundInsideClimate.width / 8, height: backgroundInsideClimate.width / 8});
        
    
    /*
        Function: showInside
        
            Draws the messaging area inside if it's not on screen.
    */
    this.showWeather = function() {
        if (!this.isInsideVisible) {
            inside.add(backgroundInsideClimate, cancelInside_btn, title, 
                        hoodieImg, scarfImg, sunglassImg);
            this.isInsideVisible = true;
        }
        if(languageMenu.getLang() === 2) {
            title.setText("quoi porter");
        }
        else {
            title.setText("What to Wear");
        }
    };
    
    
    /*
        Function: hideInside
        
            Clears inside messaging area.
    */
    this.hideInside = function() {
        if (this.isInsideVisible) {
            inside.remove(backgroundInsideClimate, cancelInside_btn, title, hoodieImg, scarfImg, sunglassImg);
            
            this.isInsideVisible = false;
            mainMenu.canBeShown = true;
        }
    };
    cancelInside_btn.on('selected', function() {
        _this.hideInside();
        clearSelection();
    });
   
    
    
}