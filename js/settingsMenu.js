/*
    Class: SettingsMenu
    
        This class handles drawing and removing the settings menu elements.
*/
function SettingsMenu() {
    
    // Define the menu area...
    var background = new fabric.Rect({
        selectable: false,
        width: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        height: 4 * ICON_MARGIN + 3 * ICON_SIZE,
        fill: '#000', opacity: 0.55,
        rx: DOOR_HEIGHT / 70, ry: DOOR_HEIGHT / 70
    });

    // ...and all app buttons
    var close_btn = new Button('cancel', 0, 0, {id: 'closeMainMenu', hasBorders: false});
    var wallpaper_btn = new MenuButton('settings');
    var doorbellTone_btn = new MenuButton('doorbell');
    var profiles_btn = new MenuButton('user');
    var setPassword_btn = new MenuButton('keypad');
    var childLock_btn = new MenuButton('childLock');
    var language_btn = new MenuButton('settings');
    var dateTimeFormat_btn = new MenuButton('settings');
    var tempFormat_btn = new MenuButton('settings');
    
    
    
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
            wallpaper_btn.set({
                left: background.left + ICON_MARGIN, 
                top: background.top + ICON_MARGIN
            });
            doorbellTone_btn.set({
                left: wallpaper_btn.left + ICON_MARGIN + ICON_SIZE, 
                top: wallpaper_btn.top
            });
            profiles_btn.set({
                left: doorbellTone_btn.left + ICON_MARGIN + ICON_SIZE, 
                top: wallpaper_btn.top
            });
            setPassword_btn.set({
                left: wallpaper_btn.left,
                top: wallpaper_btn.top + ICON_MARGIN + ICON_SIZE
            });
            childLock_btn.set({
                left: doorbellTone_btn.left,
                top: setPassword_btn.top
            });
            language_btn.set({
                left: profiles_btn.left,
                top: childLock_btn.top
            });
            dateTimeFormat_btn.set({
                left: setPassword_btn.left,
                top: setPassword_btn.top + ICON_MARGIN + ICON_SIZE
            });
            tempFormat.set({
                left: childLock_btn.left,
                top: dateTimeFormat_btn.top
            });
            
            // Then add all to inside screen
            inside.add(background, 
                       wallpaper_btn, 
                       doorbellTone_btn, 
                       profiles_btn, 
                       setPassword_btn, 
                       childLock_btn, 
                       language_btn, 
                       timeDateFormat_btn, 
                       tempFormat_btn, 
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
                       wallpaper_btn, 
                       doorbellTone_btn, 
                       profiles_btn, 
                       setPassword_btn, 
                       childLock_btn, 
                       language_btn, 
                       timeDateFormat_btn, 
                       tempFormat_btn, 
                       close_btn);
                  
            // The menu is now invisible
            this.isVisible = false;
        }
        
    };
    
}