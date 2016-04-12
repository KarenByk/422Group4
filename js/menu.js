/*
    Class: MainMenu
    
        This class handles drawing and removing the main menu elements.
*/
function MainMenu() {
    
    // Define the menu area...
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        fill: '#000', opacity: 0.5,
        //shadow: 'rgba(0,0,0,1) 0px 0px 5px',
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    });

    // ...and all app buttons
    var close_btn = new Button('cancel', 0, 0, {id: 'closeMainMenu', hasControls: false});
    var houseAlarm_btn = new MenuButton('houseAlarm');
    var noteFromInside_btn = new MenuButton('note');
    var mirror_btn = new MenuButton('mirror');
    var traffic_btn = new MenuButton('traffic');
    var weather_btn = new MenuButton('weather');
    var calendar_btn = new MenuButton('calendar');
    var outsideLight_btn = new MenuButton('outsideLight');
    var log_btn = new MenuButton('log');
    var settings_btn = new MenuButton('settings');
    
    
    // Menu dimensions are accessible from outside the class
    /* 
        Variable: width
        
            Width of the main menu, in pixels.
        
        Type: 
        
            Integer
    */
    this.width = background.width;
    /*
        Variable: height
        
            Height of the main menu, in pixels.
        
        Type:
        
            Integer
    */
    this.height = background.height;
    /*
        Variable: isVisible
        
            Tracks whether the menu is on screen.
        
        Type:
        
            Boolean
        
    */
    this.isVisible = false;
    
    /* 
        Function: show
        
            Draws the menu if it's not already on screen
        
        Parameters:
            x (Number) - Horizontal position of the menu's top-left corner, in pixels
            y (Number) - Vertical position of the menu's top-left corner, in pixels
    */
    this.show = function(x, y) {
        
        // If not already on screen
        if (!this.isVisible) {
            // Set all menu button positions relative to one another
            background.set({
                left: x, top: y
            });
            close_btn.set({
                width: background.width / 8, height: background.width / 8,
                left: background.left + background.width, 
                top: background.top
            });
            houseAlarm_btn.set({
                left: background.left + ICON_MARGIN, 
                top: background.top + ICON_MARGIN
            });
            noteFromInside_btn.set({
                left: houseAlarm_btn.left + ICON_MARGIN + ICON_SIZE, 
                top: houseAlarm_btn.top
            });
            mirror_btn.set({
                left: noteFromInside_btn.left + ICON_MARGIN + ICON_SIZE, 
                top: noteFromInside_btn.top
            });
            traffic_btn.set({
                left: houseAlarm_btn.left,
                top: houseAlarm_btn.top + ICON_MARGIN + ICON_SIZE
            });
            weather_btn.set({
                left: noteFromInside_btn.left,
                top: traffic_btn.top
            });
            calendar_btn.set({
                left: mirror_btn.left,
                top: weather_btn.top
            });
            outsideLight_btn.set({
                left: traffic_btn.left,
                top: traffic_btn.top + ICON_MARGIN + ICON_SIZE
            });
            log_btn.set({
                left: weather_btn.left,
                top: outsideLight_btn.top
            });
            settings_btn.set({
                left: calendar_btn.left,
                top: log_btn.top
            });
            
            // Then add all to inside screen
            inside.add(background, 
                       houseAlarm_btn, 
                       noteFromInside_btn, 
                       mirror_btn, 
                       traffic_btn, 
                       weather_btn, 
                       calendar_btn, 
                       outsideLight_btn, 
                       log_btn, 
                       settings_btn,
                       close_btn);
                    
            // The menu is now visible
            this.isVisible = true;
        }
        
    };

    /* 
        Function: hide
        
            Hides the menu if it's already on screen
    */
    this.hide = function() {
        
        // If already onscreen
        if (this.isVisible) {
            // Remove all menu buttons
            inside.remove(background, 
                       houseAlarm_btn, 
                       noteFromInside_btn, 
                       mirror_btn, 
                       traffic_btn, 
                       weather_btn, 
                       calendar_btn, 
                       outsideLight_btn, 
                       log_btn, 
                       settings_btn,
                       close_btn);
                  
            // The menu is now invisible
            this.isVisible = false;
        }
        
    };
    
}