require(
    ['init', 'utils', 'gui', 'notification-bar', 'menu', 'wallpaper', 'time-date'], 
    function(init, utils, gui, notificationBar, menu, wallpaper, timeDate){
    
    // Instantiate classes
    var notificationBar = new NotificationBar();
    var gui = new GUI(notificationBar);
    var mainMenu = new MainMenu();
    var wallpaper = new Wallpaper();
    var clock = new TimeDate();
    
    // Initialize interface buttons and alerts
    gui.drawKnobs();
    gui.drawAddress();
    gui.drawButtons();
    notificationBar.update();
    
    //inside.add(date);
    clock.show();
    
    // Initialize inside and outside wallpapers
    wallpaper.setInside('grass');
    wallpaper.setOutside('wood4');
    
    // Listen for a click somewhere on the inside canvas
    inside.on('mouse:down', function(event) {
        
        // If the user hasn't clicked on any object
        if (typeof event.target === 'undefined') {
            var clickY = inside.getPointer(event.e).y;
            
            // x is calculated to keep menu in the middle of the door
            var x = (DOOR_WIDTH - mainMenu.width) / 2;
            
            // y is set to where the user clicks, unless it would force
            //   the menu off the bottom of the screen. In that case
            //   it is brought back to a reasonable position.
            var y = 0;
            if (clickY > DOOR_HEIGHT - mainMenu.height) {
                y = DOOR_HEIGHT - mainMenu.height;
            } else {
                y = clickY;
            }
            
            mainMenu.open_(x, y);
        } 
        // Close the main menu if user has clicked on the close button 
        else if (event.target.id === 'closeMainMenu') {
            mainMenu.close_();
        }
        // Unlock and open or close the door if inside knob is touched
        else if (event.target.id === 'knobIn') {
            if (gui.isClosed) { 
                if (gui.isLocked) {
                    gui.unlock();
                }
                gui.open_();
            } else {
                gui.close_();
            }
        }
        // Lock the door when 'unlocked' icon is touched
        else if (event.target.id === 'lock') {
            gui.lock();
        }
        // Unlock the door when 'locked' icon is touched
        else if (event.target.id === 'unlock') {
            gui.unlock();
        }
        // Close the door when 'open' icon is touched
        else if (event.target.id === 'close') {
            gui.close_();
        }
        // Unlock and open the door when 'closed' icon is touched
        else if (event.target.id === 'open') {
            if (gui.isClosed) { 
                if (gui.isLocked) {
                    gui.unlock();
                }
                gui.open_();
            }
        }
        
        clearSelection();
        
    });
});